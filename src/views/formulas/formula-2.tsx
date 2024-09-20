import { useMutateData } from '@/hooks/useMutateData';
import { Formula_One } from '@/core';
import { formulaApi } from '@/core/services/formulas';
import FormBuilder from '@/components/formBuilder';
import * as yup from 'yup';

const Formula2 = () => {
	const formula2Mutate = useMutateData({
		mutationFn: (data) => formulaApi.formulaTow(data),
		invalidateKeys: ['formulaTow'],
		displaySuccess: true,
	});

	const initialValues = {
		calls_answered: '',
		abandoned_calls: '',
		total_calls_abandoned: '',
		total_calls_answered: '',
	};

	const validationSchema = yup.object().shape({
		calls_answered: yup
			.number()
			.required('Calls Answered is required')
			.positive('Calls Answered must be a positive number')
			.integer('Calls Answered must be an integer')
			.min(1, 'Calls Answered must be greater than 0'),
		abandoned_calls: yup
			.number()
			.required('Abandoned Calls is required')
			.positive('Abandoned Calls must be a positive number')
			.integer('Abandoned Calls must be an integer')
			.min(1, 'Abandoned Calls must be greater than 0'),
		total_calls_abandoned: yup
			.number()
			.required('Total Calls Abandoned is required')
			.positive('Total Calls Abandoned must be a positive number')
			.integer('Total Calls Abandoned must be an integer')
			.min(1, 'Total Calls Abandoned must be greater than 0'),
		total_calls_answered: yup
			.number()
			.required('Total Calls Answered is required')
			.positive('Total Calls Answered must be a positive number')
			.integer('Total Calls Answered must be an integer')
			.min(1, 'Total Calls Answered must be greater than 0'),
	});

	const submitHandler = (values: Formula_One) => {
		formula2Mutate.mutate(values);
	};

	const formBuilderArgs = {
		initialValues: initialValues,
		handleSubmit: submitHandler,
		validationSchema: validationSchema,
		loading: formula2Mutate?.isPending,
		formSchema: [
			{
				name: 'calls_answered',
				type: 'number',
				label: `Number of calls Answered in the time period`,
			},
			{
				name: 'abandoned_calls',
				type: 'number',
				label: `Calls abandoned in time limit`,
			},
			{
				name: 'total_calls_abandoned',
				type: 'number',
				label: `Total calls abandoned`,
			},
			{
				name: 'total_calls_answered',
				type: 'number',
				label: `Total calls answered`,
			},
		],
	};
	return (
		<div className='flex flex-col gap-2'>
			<div>{<FormBuilder {...formBuilderArgs} />}</div>
			{formula2Mutate?.data?.data?.data?.result && (
				<div className='flex items-center justify-center text-blue-600'> Result {formula2Mutate?.data?.data?.data?.result}</div>
			)}{' '}
		</div>
	);
};

export default Formula2;
