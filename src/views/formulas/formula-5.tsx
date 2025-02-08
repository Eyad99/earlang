import { useMutateData } from '@/hooks/useMutateData';
import { Formula_One } from '@/core';
import { formulaApi } from '@/core/services/formulas';
import FormBuilder from '@/components/formBuilder';
import * as yup from 'yup';

const Formula5 = () => {
	const formula5Mutate = useMutateData({
		mutationFn: (data) => formulaApi.formulaFive(data),
		invalidateKeys: ['formulaFive'],
		displaySuccess: true,
	});

	const initialValues = {
		total_calls_answered_within_time_p: '',
		calls_abandoned_within_shorter_time: '',
		total_calls_abandoned: '',
		total_calls_answered: '',
	};

	const validationSchema = yup.object().shape({
		total_calls_answered_within_time_p: yup
			.number()
			.required('Total calls answered within time period is required')
			.positive('Total calls answered within time period must be a positive number')
			.integer('Total calls answered within time period must be an integer')
			.min(1, 'Total calls answered within time period must be greater than 0'),
		calls_abandoned_within_shorter_time: yup
			.number()
			.required('Calls abandoned within shorter time is required')
			.positive('Calls abandoned within shorter time must be a positive number')
			.integer('Calls abandoned within shorter time must be an integer')
			.min(1, 'Calls abandoned within shorter time must be greater than 0'),
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
		formula5Mutate.mutate(values);
	};

	const formBuilderArgs = {
		initialValues: initialValues,
		handleSubmit: submitHandler,
		validationSchema: validationSchema,
		loading: formula5Mutate?.isPending,
		formSchema: [
			{
				name: 'total_calls_answered_within_time_p',
				type: 'number',
				label: `Total calls answered within time period`,
			},

			{
				name: 'calls_abandoned_within_shorter_time',
				type: 'number',
				label: `Calls abandoned within a shorter time than the time limit`,
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
			{formula5Mutate?.data?.data?.data?.result && (
				<div className='flex items-center justify-center text-blue-600'> Result {formula5Mutate?.data?.data?.data?.result}</div>
			)}{' '}
		</div>
	);
};

export default Formula5;
