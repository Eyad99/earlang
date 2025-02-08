import { useMutateData } from '@/hooks/useMutateData';
import { calculatorApi, Earlang_Calculator_Max_Calls } from '@/core';
import FormBuilder from '@/components/formBuilder';
import withLoading from '@/hooks/withLoader';
import Card from '@/components/reusable/card';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Activity, BarChart, PhoneCall } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card as CardShadCn, CardContent } from '@/components/ui/card';

const BoxWithLoading = withLoading(Card);

const MaxCalls = () => {
	const initialMetricsValues = {
		metrics: [
			{
				id: 'Max_call',
				title: 'Max call',
				value: 2.96,
				icon: PhoneCall,
				color: 'text-red-500',
				progressColor: '#eee',
				tooltip: 'Average Speed of Answer (in seconds)',
			},
			{
				id: 'N_calls',
				title: 'Number calls',
				value: 2,
				icon: PhoneCall,
				color: 'text-green-500',
				progressColor: '#eee',
				tooltip: 'Number of active agents',
			},

			{
				id: 'SL',
				title: 'Archived service level',
				value: 86.73,
				icon: BarChart,
				color: 'text-pink-500',
				progressColor: '#FF0080',
				tooltip: 'Service Level',
			},

			{
				id: 'occ_Max_call',
				title: 'Occupancy max calls',
				value: 13.44,
				icon: Activity,
				color: 'text-purple-500',
				progressColor: '#A855F7',
				tooltip: 'Occupancy max calls',
			},
			{
				id: 'occ_N_call',
				title: 'Occupancy calls',
				value: 13.44,
				icon: Activity,
				color: 'text-indigo-500',
				progressColor: '#7073F2',
				tooltip: 'Occupancy calls',
			},
		],
	};

	const { values, setFieldValue } = useFormik({
		initialValues: initialMetricsValues,
		onSubmit: () => {},
	});
	const earlangMaxCallsMutate = useMutateData({
		mutationFn: (data) => calculatorApi.earlangMaxCalls(data),
		invalidateKeys: ['earlangMaxCalls'],
		displaySuccess: true,
		onSuccessFn: ({ data }) => {
			const updatedMetrics = values.metrics.map((metric) => {
				const matchedValue = data.data[metric.id];
				if (matchedValue !== undefined) {
					return {
						...metric,
						value: parseFloat(matchedValue),
					};
				}
				return metric;
			});

			setFieldValue('metrics', updatedMetrics);
		},
	});

	const initialValues = {
		Agents: '',
		Period: '',
		AHT: '',
		SLA: '',
		Time: '',
	};

	const validationSchema = yup.object().shape({
		Agents: yup
			.number()
			.required('Agents is required')
			.positive('Agents must be a positive number')
			.integer('Agents must be an integer')
			.min(1, 'Agents must be greater than 0'),

		Period: yup
			.number()
			.required('Period is required')
			.positive('Period must be a positive number')
			.integer('Period must be an integer')
			.min(1, 'Period must be greater than 0'),

		AHT: yup
			.number()
			.required('Average is required')
			.positive('Average must be a positive number')
			.integer('Average must be an integer')
			.min(1, 'Average must be greater than 0'),

		SLA: yup
			.number()
			.required('Service Level is required')
			.positive('Service Level must be a positive number')
			.integer('Service Level must be an integer')
			.min(1, 'Service Level must be greater than 0'),

		Time: yup
			.number()
			.required('Time is required')
			.positive('Time must be a positive number')
			.integer('Time must be an integer')
			.min(1, 'Time must be greater than 0'),
	});

	const submitHandler = (values: Earlang_Calculator_Max_Calls) => {
		earlangMaxCallsMutate.mutate(values);
	};

	const formBuilderArgs = {
		initialValues: initialValues,
		handleSubmit: submitHandler,
		validationSchema: validationSchema,
		loading: earlangMaxCallsMutate?.isPending,
		gridClassName: 'grid-cols-1',
		buttonClassName: 'w-full',
		formSchema: [
			{
				name: 'Agents',
				type: 'number',
				label: `Number of Agents`,
			},

			{
				name: 'Period',
				type: 'select',
				label: `Period (in minutes)`,
				elements: [
					{ id: '15', name: '15' },
					{ id: '30', name: '30' },
					{ id: '60', name: '60' },
				],
			},

			{
				name: 'AHT',
				type: 'number',
				label: `Average Handled Time (in seconds)`,
			},

			{
				name: 'SLA',
				type: 'number',
				label: `Service Level`,
			},

			{
				name: 'Time',
				type: 'number',
				label: `Time a Call Has to Wait (in seconds)`,
			},
		],
	};

	const roundedNumber = (number: number, decimalPlaces: number) => {
		return parseFloat(number.toFixed(decimalPlaces));
	};
	const ProgressCircle = ({ value, color }: { value: number; color: string }) => (
		<div className='relative w-16 h-16'>
			<svg className='w-full h-full' viewBox='0 0 36 36'>
				<path d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831' fill='none' stroke='#eee' strokeWidth='3' />
				<path
					d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
					fill='none'
					stroke={color}
					strokeWidth='3'
					strokeDasharray={`${value}, 100`}
				/>
			</svg>
			<div className='absolute inset-0 flex items-center justify-center text-sm font-semibold'>{value} %</div>
		</div>
	);

	return (
		<div className='flex md:flex-row flex-col wrap gap-2'>
			<div className='md:w-1/2 w-full'>{<FormBuilder {...formBuilderArgs} />}</div>
			<div className='md:w-1/2 w-full bg-white flex items-center justify-center text-center p-6'>
				{earlangMaxCallsMutate?.isPending ? (
					<BoxWithLoading loading={earlangMaxCallsMutate?.isPending}>
						<span className='font-bold text-xl text-navy-700'>"The calculation is being processed."</span>{' '}
					</BoxWithLoading>
				) : earlangMaxCallsMutate?.data?.data?.data?.Max_call ? (
					<div className='grid grid-cols-2 md:grid-cols-2 gap-4 w-full'>
						{values.metrics
							.filter((item) => item.value !== null)
							.map((metric, index) => (
								<TooltipProvider key={index}>
									<Tooltip key={index}>
										<TooltipTrigger>
											<CardShadCn className='overflow-hidden transition-all hover:shadow-lg'>
												<CardContent className='p-4 flex flex-col items-center'>
													<metric.icon className={`${metric.color} h-6 w-6 mb-2`} />
													<h3 className='font-semibold text-sm mb-2'>{metric.title}</h3>
													{typeof metric.value === 'number' && metric.value <= 100 ? (
														<ProgressCircle value={roundedNumber(metric.value * 100, 2)} color={metric.progressColor} />
													) : (
														<p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
													)}
												</CardContent>
											</CardShadCn>
										</TooltipTrigger>
										<TooltipContent>
											<p>{metric.tooltip}</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							))}
					</div>
				) : (
					<span className='font-bold text-xl text-navy-700'>
						"Fill the fields to see the result, which will be updated automatically after calculation."
					</span>
				)}
			</div>
		</div>
	);
};

export default MaxCalls;
