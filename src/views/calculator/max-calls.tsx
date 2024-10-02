import { useMutateData } from '@/hooks/useMutateData';
import { calculatorApi, Earlang_Calculator_Max_Calls } from '@/core';
import FormBuilder from '@/components/formBuilder';
import withLoading from '@/hooks/withLoader';
import Card from '@/components/reusable/card';
import * as yup from 'yup';

const BoxWithLoading = withLoading(Card);

const MaxCalls = () => {
	const earlangMaxCallsMutate = useMutateData({
		mutationFn: (data) => calculatorApi.earlangMaxCalls(data),
		invalidateKeys: ['earlangMaxCalls'],
		displaySuccess: true,
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

	const divClassName =
		'w-[150px] h-[150px] bg-black bg-opacity-5 border-4  rounded-full flex flex-col justify-center items-center text-xl font-bold transition-transform transform hover:scale-110 hover:bg-opacity-20 duration-300 ';
	return (
		<div className='flex md:flex-row flex-col wrap gap-2'>
			<div className='md:w-1/2 w-full'>{<FormBuilder {...formBuilderArgs} />}</div>
			<div className='md:w-1/2 w-full bg-white flex items-center justify-center text-center p-6'>
				{earlangMaxCallsMutate?.isPending ? (
					<BoxWithLoading loading={earlangMaxCallsMutate?.isPending}>
						<span className='font-bold text-xl '>"The calculation is being processed."</span>{' '}
					</BoxWithLoading>
				) : earlangMaxCallsMutate?.data?.data?.data?.Max_call ? (
					<div className='flex flex-wrap gap-4 '>
						<div className={divClassName + ' border-red-400'}>
							<span>Max call </span>
							<span className='text-red-400'>{earlangMaxCallsMutate?.data?.data?.data?.Max_call} </span>
						</div>
						<div className={divClassName + ' border-green-400'}>
							<span>Numbe calls </span>
							<span className='text-green-400'>{earlangMaxCallsMutate?.data?.data?.data?.N_calls} </span>
						</div>
						<div className={divClassName + ' border-blue-400'}>
							<span>Archived service level </span>
							<span className='text-blue-400'>{earlangMaxCallsMutate?.data?.data?.data?.SL * 100} % </span>
						</div>
					</div>
				) : (
					<span className='font-bold text-xl '>
						"Fill the fields to see the result, which will be updated automatically after calculation."
					</span>
				)}
			</div>
		</div>
	);
};

export default MaxCalls;
