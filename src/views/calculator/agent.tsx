import { useMutateData } from '@/hooks/useMutateData';
import { calculatorApi, Earlang_Calculator_Normal } from '@/core';
import FormBuilder from '@/components/formBuilder';
import withLoading from '@/hooks/withLoader';
import Card from '@/components/reusable/card';
import * as yup from 'yup';

const BoxWithLoading = withLoading(Card);

const Agent = () => {
	const earlangAgentMutate = useMutateData({
		mutationFn: (data) => calculatorApi.earlangNormal(data),
		invalidateKeys: ['earlangNormal'],
		displaySuccess: true,
	});

	const initialValues = {
		NCalls: '',
		Period: '',
		AHT: '',
		SLA: '',
		Time: '',
	};

	const validationSchema = yup.object().shape({
		NCalls: yup
			.number()
			.required('Number Calls is required')
			.positive('Number Calls must be a positive number')
			.integer('Number Calls must be an integer')
			.min(1, 'Number Calls must be greater than 0'),

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

	const submitHandler = (values: Earlang_Calculator_Normal) => {
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
				label: `Number of Calls`,
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
		<div className='flex md:flex-row flex-col wrap gap-2'>
			<div className='md:w-1/2 w-full'>{<FormBuilder {...formBuilderArgs} />}</div>
			<div className='md:w-1/2 w-full bg-white flex items-center justify-center text-center p-6'>
				{earlangAgentMutate?.isPending ? (
					<BoxWithLoading loading={earlangAgentMutate?.isPending}>
						<span className='font-bold text-xl '>"The calculation is being processed."</span>{' '}
					</BoxWithLoading>
				) : earlangAgentMutate?.data?.data?.data?.Agents ? (
					<div className='flex flex-col items-center justify-center '>
						<span className='font-bold text-xl '>The final result is</span>
						<span>
							<span className='font-bold'>ASA: </span> {earlangAgentMutate?.data?.data?.data?.ASA}
						</span>
						<span>
							<span className='font-bold'>Agents: </span>
							{earlangAgentMutate?.data?.data?.data?.Agents}
						</span>
						<span>
							<span className='font-bold'>Pw: </span>
							{earlangAgentMutate?.data?.data?.data?.Pw}
						</span>
						<span>
							<span className='font-bold'>SL: </span>
							{earlangAgentMutate?.data?.data?.data?.SL}
						</span>
						<span>
							<span className='font-bold'>Service Level: </span>
							{earlangAgentMutate?.data?.data?.data?.ServiceLevel}
						</span>
						<span>
							<span className='font-bold'>imm answ: </span>
							{earlangAgentMutate?.data?.data?.data?.imm_answ}
						</span>
						<span>
							<span className='font-bold'>Occ: </span>
							{earlangAgentMutate?.data?.data?.data?.occ}
						</span>
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

export default Agent;
