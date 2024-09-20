import { useMutateData } from '@/hooks/useMutateData';
import { calculatorApi, Earlang_Calculator_Max_Calls } from '@/core';
import FormBuilder from '@/components/formBuilder';
import * as yup from 'yup';

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
		formSchema: [
			{
				name: 'Agents',
				type: 'number',
				label: `Number of Agents`,
			},

			{
				name: 'Period',
				type: 'number',
				label: `Period (in minutes)`,
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

	return (
		<div className='flex flex-col gap-2'>
			<div>{<FormBuilder {...formBuilderArgs} />}</div>
			{earlangMaxCallsMutate?.data?.data?.data?.Max_call && (
				<div className='flex flex-col items-center justify-center bg-white w-1/3 m-auto'>
					<span>Result</span>
					<span>
						<span className='font-bold'>Max call: </span> {earlangMaxCallsMutate?.data?.data?.data?.Max_call}
					</span>
					<span>
						<span className='font-bold'>Numbe calls: </span>
						{earlangMaxCallsMutate?.data?.data?.data?.N_calls}
					</span>
					<span>
						<span className='font-bold'>Sl: </span>
						{earlangMaxCallsMutate?.data?.data?.data?.SL}
					</span>
				</div>
			)}{' '}
		</div>
	);
};

export default MaxCalls;
