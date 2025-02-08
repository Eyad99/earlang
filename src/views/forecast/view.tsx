import { useFetchDataRQ } from '@/hooks/useFetchDataRQ';
import { useMutateData } from '@/hooks/useMutateData';
import { forecastApi } from '@/core/services/forecast';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import VViewForecastResult from '@/components/views/forecast/editor/v-view-forecast-result';
import TableSkeleton from '@/utils/skeletons/table-skeleton';
import * as yup from 'yup';

const ForecastViewer = () => {
	const { forecastId, forecastType } = useParams();
	// weeklyData:{'wednesday':[{date: '', total: 0, weight: 0 }]}

	const initialValues = {
		data: { daily_forecast: [], next_week_forecast: [] },
		weeklyData: {} as any,
		resultsAfterWeightChangeFlag: false,
	};

	const formSchema = yup.object().shape({
		weeklyData: yup
			.object()
			.shape({
				wednesday: yup
					.array()
					.of(
						yup.object().shape({
							weight: yup.number().min(0, 'Weight must be at least 0').max(100, 'Weight cannot exceed 100').required('Weight is required'),
						})
					)
					.test('total-weight', 'Total weight for Wednesday must equal 100%', (items) => {
						if (!items || items.length === 0) return true; // Skip validation if no items
						const totalWeight = items.reduce((sum, item) => sum + (+item.weight || 0), 0);
						return totalWeight === 100;
					}),
			})
			.required(),
	});

	const { values, errors, setFieldValue } = useFormik({
		validationSchema: formSchema,
		initialValues,
		onSubmit: () => {},
	});

	const { data, isLoading, isFetching, isSuccess } = useFetchDataRQ({
		queryKey: ['forecast-reslut-by', forecastType],
		queryFn: () => (forecastType == 'aht' ? forecastApi.getAhtForecast(forecastId!) : forecastApi.getVolumeForecast(forecastId!)),
	});

	const {
		data: resultsAfterWeightChange,
		isLoading: resultsAfterWeightChangeIsLoading,
		isFetching: resultsAfterWeightChangeIsFetching,
		isSuccess: resultsAfterWeightChangeIsSuccess,
	} = useFetchDataRQ({
		queryKey: ['forecast-reslut-after-change-by', forecastType],
		queryFn: () => (forecastType == 'aht' ? undefined : forecastApi.getResultVolumForecast(forecastId!)),
		enableCondition: values.resultsAfterWeightChangeFlag,
	});

	const changeWeightMutate = useMutateData({
		mutationFn: (data) =>
			forecastType == 'aht'
				? forecastApi.changeWeightByAhtForecast(forecastId!, data)
				: forecastApi.changeWeightByVolumeForecast(forecastId!, data),
		displaySuccess: true,
		onSuccessFn: ({}) => {
			if (forecastType == 'aht') {
				setFieldValue('data', data.data);
			} else {
				setFieldValue('resultsAfterWeightChangeFlag', true);
			}
		},
	});

	const handleSubmit = () => {
		changeWeightMutate.mutate({ weights: values.weeklyData?.['wednesday'].map((item: any) => item.weight) });
	};

	useEffect(() => {
		if (isSuccess) {
			setFieldValue('data', data.data);
		}
	}, [isLoading, isFetching]);

	useEffect(() => {
		if (resultsAfterWeightChangeIsSuccess) {
			setFieldValue('resultsAfterWeightChangeFlag', false);
			const newRes = resultsAfterWeightChange?.data.reduce((acc: any, item: any) => {
				// Extract date without time
				const date = item.work_date.split('T')[0];
				// // Find or create an entry for this date
				let dayEntry = acc.find((entry: any) => entry.Date_Day === date) as any;
				if (!dayEntry) {
					// Create a new day entry
					dayEntry = {
						Date_Day: date,
						Day_Name: `On ${new Date(date).toLocaleString('en-US', { weekday: 'long' })}`,
						next_forecast_Aht: 171,
						Intervals: [],
					};
					acc.push(dayEntry);
				}
				// Add interval data
				dayEntry.Intervals.push({
					From_Time: item.from_time,
					To_Time: item.to_time,
					Forecasted_Contacts: item.forecasted_result,
					New_Forecasted_Contacts: item.forecasted_result_wight,
				});
				return acc;
			}, []);

			const newNextWeekForecast = values.data?.next_week_forecast;
			for (let i = 0; i < newRes?.length; i++) {
				let obj = newNextWeekForecast.find((item: any) => item.Date_Day == newRes[i]?.Date_Day) as any;
				console.log('objobjobj 123123123', obj);
				obj.Intervals = newRes[i]?.Intervals;
			}

			setFieldValue('data.next_week_forecast', newNextWeekForecast);
		}
	}, [resultsAfterWeightChangeIsLoading, resultsAfterWeightChangeIsFetching]);

	if (isLoading || isFetching)
		return (
			<div className='flex flex-col gap-4'>
				<TableSkeleton />
				<TableSkeleton />
			</div>
		);
	return (
		<VViewForecastResult
			data={values.data}
			formProperities={{
				values: values,
				errors: errors,
				setFieldValue: setFieldValue,
				handleSubmit: handleSubmit,
				changeWeightLoading: changeWeightMutate.isPending || resultsAfterWeightChangeIsFetching,
			}}
		/>
	);
};

export default ForecastViewer;
