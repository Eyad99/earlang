import ForecastResults from './results';
import ForecastForm from './form';
import { useMutateData } from '@/hooks/useMutateData';
import { forecastApi } from '@/core/services/forecast';
import { useFormik } from 'formik';

const VForecast = () => {
	const initialValues = {
		type: 'Year',
		selectedType: '',
		data: [],
		forecast: [],
	};
	const { values, setFieldValue } = useFormik({ initialValues, onSubmit: () => {} });

	const forecastResultMutate = useMutateData({
		mutationFn: (data) =>
			values.type == 'Year'
				? forecastApi.yearForecast(data)
				: values.type == 'Three Month'
				? forecastApi.threeMonthForecast(data)
				: values.type == 'Month'
				? forecastApi.monthForecast(data)
				: values.type == 'Week'
				? forecastApi.weekForecast(data)
				: values.type == 'Day'
				? forecastApi.dayForecast(data)
				: values.type == 'Interval Of Days'
				? forecastApi.intervalOfDayForecast(data)
				: forecastApi.intervalOfDayForecast(data),

		invalidateKeys: [
			values.type == 'Year'
				? 'year-forecast'
				: values.type == 'Three Month'
				? 'three-month-forecast'
				: values.type == 'Month'
				? 'month-forecast'
				: values.type == 'Week'
				? 'week-forecast'
				: values.type == 'Day'
				? 'day-forecast'
				: values.type == 'Interval Of Days'
				? 'interval-of-day-forecast'
				: '',
		],
		displaySuccess: true,
		onSuccessFn: ({ data }) => {
			// NOTE: I changed the format of the forecast from the type of [Day] in order to correspond to the rest of the modules, I don't know why backend developer return this format
			setFieldValue(
				'data',
				values.type == 'Year'
					? data.data.forecast_results.concat([data.data.next_year_forecast])
					: values.type == 'Day'
					? data.data.forecast_results
							.map((item: any) => ({
								Day: item.Date_Day,
								Name: item.Day_Name,
								Contacts: item.Number_of_calls_or_contacts,
								'Growth Rate': item?.['Growth_Rate'],
							}))
							.concat(
								data.data.next_week_forecast.map((item: any) => ({
									Day: item.Date_Day,
									Name: item.Day_Name,
									Contacts: item.Number_of_calls_or_contacts,
									'Growth Rate': item?.['Growth_Rate'],
								}))
							)
					: values.type == 'Interval Of Days'
					? data.data.daily_forecast
							.map((item: any) => ({
								Day: item.Date_Day,
								Name: item.Day_Name,
								Contacts: item.Number_of_calls_or_contacts,
								'Growth Rate': item?.['Growth_Rate'],
								Intervals: item.Intervals,
							}))
							.concat(
								data.data.next_week_forecast.map((item: any) => ({
									Day: item.Date_Day,
									Name: item.Day_Name,
									Contacts: item.Number_of_calls_or_contacts,
									'Growth Rate': item?.['Growth_Rate'],
									Intervals: item.Intervals,
								}))
							)
					: data.data.forecast_results.concat(data.data.next_week_forecast)
			);
			setFieldValue(
				'forecast',
				values.type == 'Year'
					? [data.data.next_year_forecast]
					: values.type == 'Day'
					? data.data.next_week_forecast.map((item: any) => ({
							Day: item.Date_Day,
							Name: item.Day_Name,
							Contacts: item.Number_of_calls_or_contacts,
							'Growth Rate': item?.['Growth_Rate'],
					  }))
					: values.type == 'Interval Of Days'
					? data.data.next_week_forecast.map((item: any) => ({
							Day: item.Date_Day,
							Name: item.Day_Name,
							Contacts: item.Number_of_calls_or_contacts,
							'Growth Rate': item?.['Growth_Rate'],
							Intervals: item.Intervals,
					  }))
					: data.data.next_week_forecast
			);
			setFieldValue('selectedType', values.type);
		},
	});
	return (
		<div className='flex flex-col gap-6 '>
			<ForecastForm setFieldValue={setFieldValue} type={values.type} forecastResultMutate={forecastResultMutate} />
			{values.data?.length > 0 && (
				<ForecastResults
					data={values.data}
					forecast={values.forecast}
					type={values.selectedType}
					loading={forecastResultMutate.isPending}
				/>
			)}
		</div>
	);
};

export default VForecast;
