import { Activity, Clock, HeadphonesIcon, Percent, Users, UserMinus, PhoneCall, BarChart } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { calculatorApi, Earlang_Calculator_Normal } from '@/core';
import { Card as CardShadCn, CardContent } from '@/components/ui/card';
import { useMutateData } from '@/hooks/useMutateData';
import { useFormik } from 'formik';
import FormBuilder from '@/components/formBuilder';
import withLoading from '@/hooks/withLoader';
import Card from '@/components/reusable/card';
import * as yup from 'yup';
import React from 'react';

const BoxWithLoading = withLoading(Card);

const Agent = () => {
	const initialMetricsValues = {
		metrics: [
			{
				id: 'ASA',
				title: 'ASA',
				value: 2.96,
				icon: Clock,
				color: 'text-red-500',
				progressColor: '#eee',
				tooltip: 'Average Speed of Answer (in seconds)',
			},
			{
				id: 'Agents',
				title: 'Agents',
				value: 2,
				icon: Users,
				color: 'text-green-500',
				progressColor: '#eee',
				tooltip: 'Number of active agents',
			},
			{
				id: 'Agents_with_shrinkage',
				title: 'Agents with shrinkage',
				value: null,
				icon: UserMinus,
				color: 'text-yellow-500',
				progressColor: '#EAB308',
				tooltip: 'Agents accounting for shrinkage',
			},
			// {
			// 	id: 'Pw',
			// 	title: 'Pw',
			// 	value: 13.44,
			// 	icon: Percent,
			// 	color: 'text-purple-500',
			// 	progressColor: '#A855F7',
			// 	tooltip: 'Percentage of calls waiting',
			// },
			{
				id: 'SL',
				title: 'SL',
				value: 86.73,
				icon: BarChart,
				color: 'text-pink-500',
				progressColor: '#FF0080',
				tooltip: 'Calculated Service Level',
			},
			{
				id: 'ServiceLevel',
				title: 'Service Level',
				value: 88.27,
				icon: Percent,
				color: 'text-orange-500',
				progressColor: '#F97316',
				tooltip: 'Calculated Service Level within threshold',
			},
			{
				id: 'imm_answ',
				title: 'Imm answ',
				value: 86.56,
				icon: PhoneCall,
				color: 'text-teal-500',
				progressColor: '#14B8A6',
				tooltip: 'Percentage of calls answered immediately',
			},
			{
				id: 'occ',
				title: 'Calculated Occupancy',
				value: 13.44,
				icon: Activity,
				color: 'text-indigo-500',
				progressColor: '#7073F2',
				tooltip: 'Calculated Occupancy',
			},
		],
	};

	const { values, setFieldValue } = useFormik({
		initialValues: initialMetricsValues,
		onSubmit: () => {},
	});

	const earlangAgentMutate = useMutateData({
		mutationFn: (data) => calculatorApi.earlangNormal(data),
		invalidateKeys: ['earlangNormal'],
		displaySuccess: true,
		onSuccessFn: ({ data }) => {
			const updatedMetrics = values.metrics.map((metric) => {
				const matchedValue = data.data[metric.id];
				if (matchedValue !== undefined) {
					return {
						...metric,
						value: ['ASA', 'Agents'].includes(metric.id) ? String(matchedValue) : parseFloat(matchedValue),
					};
				} else {
					return {
						...metric,
						value: null,
					};
				}
			});

			setFieldValue('metrics', updatedMetrics);
		},
	});

	const initialValues = {
		NCalls: '',
		Period: '',
		AHT: '',
		SLA: '',
		Time: '',
		shrinkage: 0,
	};

	const validationSchema = yup.object().shape({
		NCalls: yup
			.number()
			.required('Calls Volume is required')
			.positive('Calls Volume must be a positive number')
			.integer('Calls Volume must be an integer')
			.min(1, 'Calls Volume must be greater than 0'),

		Period: yup
			.number()
			.required('Interval is required')
			.positive('Interval must be a positive number')
			.integer('Interval must be an integer')
			.min(1, 'Interval must be greater than 0'),

		AHT: yup
			.number()
			.required('Average is required')
			.positive('Average must be a positive number')
			.integer('Average must be an integer')
			.min(1, 'Average must be greater than 0'),

		SLA: yup
			.number()
			.required('Targeted Service Level is required')
			.positive('Targeted Service Level must be a positive number')
			.integer('Targeted Service Level must be an integer')
			.min(1, 'Targeted Service Level must be greater than 0'),

		Time: yup
			.number()
			.required('Time is required')
			.positive('Time must be a positive number')
			.integer('Time must be an integer')
			.min(1, 'Time must be greater than 0'),

		shrinkage: yup
			.number()
			.positive('Shrinkage must be a positive number')
			.integer('Shrinkage must be an integer')
			.min(0, 'Shrinkage must be greater than 0')
			.max(99, 'Number of shrinkage must be less or equal than 99'),
	});

	const submitHandler = (values: Earlang_Calculator_Normal | any) => {
		earlangAgentMutate.mutate(values);
	};

	const formBuilderArgs = {
		initialValues: initialValues,
		handleSubmit: submitHandler,
		validationSchema: validationSchema,
		loading: earlangAgentMutate?.isPending,
		gridClassName: 'grid-cols-1',
		buttonClassName: 'w-full',
		formSchema: [
			{
				name: 'NCalls',
				type: 'number',
				label: `Calls Volume`,
				min: 1,
			},

			{
				name: 'Period',
				type: 'select',
				label: `Interval (in minutes)`,
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
				min: 1,
			},

			{
				name: 'SLA',
				type: 'number',
				label: `Targeted Service Level`,
				min: 1,
			},

			{
				name: 'Time',
				type: 'number',
				label: `Targeted Threshold (in seconds)`,
				min: 1,
			},

			{
				name: 'shrinkage',
				type: 'number',
				label: `Targeted Shrinkage (optional)`,
			},
		],
	};

	const ProgressCircle = ({ value, color, removePercentage }: { value: number; color: string; removePercentage: boolean }) => (
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
			<div className='absolute inset-0 flex items-center justify-center text-sm font-semibold'>
				{value}
				{!removePercentage && '%'}
			</div>
		</div>
	);

	return (
		<React.Fragment>
			<h3 className='mb-4 font-bold text-navy-700'>"Calculate the number of agent required to reach an agreed service level"</h3>
			<div className='flex md:flex-row flex-col wrap gap-2'>
				<div className='md:w-1/2 w-full'>{<FormBuilder {...formBuilderArgs} />}</div>
				<div className='md:w-1/2 w-full bg-white flex items-center justify-center text-center p-6'>
					{earlangAgentMutate?.isPending ? (
						<BoxWithLoading loading={earlangAgentMutate?.isPending}>
							<span className='font-bold text-xl text-navy-700'>"The calculation is being processed."</span>{' '}
						</BoxWithLoading>
					) : earlangAgentMutate?.data?.data?.data?.Agents ? (
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
															<ProgressCircle
																value={metric.value}
																color={metric.progressColor}
																removePercentage={metric.id === 'ASA' || metric.id === 'Agents' || metric.id === 'Agents_with_shrinkage'}
															/>
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
						<span className='font-bold text-xl text-navy-700 '>
							"Fill the fields to see the result, which will be updated automatically after calculation."
						</span>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default Agent;
