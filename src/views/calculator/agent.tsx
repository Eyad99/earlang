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
		shrinkage: 0,
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

		shrinkage: yup
			.number()
			.positive('Shrinkage must be a positive number')
			.integer('Shrinkage must be an integer')
			.min(0, 'Shrinkage must be greater than 0')
			.max(99, 'Number of shrinkage must be less or equal than 99'),
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

			{
				name: 'shrinkage',
				type: 'number',
				label: `Shrinkage (optional)`,
			},
		],
	};

	const divClassName =
		'w-[150px] h-[150px] bg-black bg-opacity-5 border-4  rounded-full flex flex-col justify-center items-center text-xl font-bold transition-transform transform hover:scale-110 hover:bg-opacity-20 duration-300 ';
	return (
		<div className='flex md:flex-row flex-col wrap gap-2'>
			<div className='md:w-1/2 w-full'>{<FormBuilder {...formBuilderArgs} />}</div>
			<div className='md:w-1/2 w-full bg-white flex items-center justify-center text-center p-6'>
				{earlangAgentMutate?.isPending ? (
					<BoxWithLoading loading={earlangAgentMutate?.isPending}>
						<span className='font-bold text-xl '>"The calculation is being processed."</span>{' '}
					</BoxWithLoading>
				) : earlangAgentMutate?.data?.data?.data?.Agents ? (
					<div className='flex flex-wrap gap-4 '>
						<div className={divClassName + ' border-red-400'}>
							<span>ASA </span>
							<span className='text-red-400'>{earlangAgentMutate?.data?.data?.data?.ASA} </span>
						</div>
						<div className={divClassName + ' border-green-400'}>
							<span>Agents </span>
							<span className='text-green-400'>{earlangAgentMutate?.data?.data?.data?.Agents} </span>
						</div>
						{earlangAgentMutate?.data?.data?.data?.Agents_with_shrinkage && (
							<div className={divClassName + ' border-yellow-400'}>
								<span>Agents with shrinkage </span>
								<span className='text-yellow-400'>{earlangAgentMutate?.data?.data?.data?.Agents_with_shrinkage} </span>
							</div>
						)}
						<div className={divClassName + ' border-blue-400'}>
							<span>Pw </span>
							<span className='text-blue-400'>{earlangAgentMutate?.data?.data?.data?.Pw} </span>
						</div>
						<div className={divClassName + ' border-fuchsia-400'}>
							<span>SL </span>
							<span className='text-fuchsia-400'>{earlangAgentMutate?.data?.data?.data?.SL} </span>
						</div>
						<div className={divClassName + ' border-horizonOrange-400'}>
							<span>Service Level </span>
							<span className='text-horizonOrange-400'>{earlangAgentMutate?.data?.data?.data?.ServiceLevel} </span>
						</div>
						<div className={divClassName + ' border-teal-400'}>
							<span>Imm answ </span>
							<span className='text-teal-400'>{earlangAgentMutate?.data?.data?.data?.imm_answ} </span>
						</div>
						<div className={divClassName + ' border-purple-400'}>
							<span>Occupancy </span>
							<span className='text-purple-400'>{earlangAgentMutate?.data?.data?.data?.occ} </span>
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

export default Agent;
