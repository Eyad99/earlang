import { useMutateData } from '@/hooks/useMutateData';
import { Formula_One } from '@/core';
import { formulaApi } from '@/core/services/formulas';
import FormBuilder from '@/components/formBuilder';
import * as yup from 'yup';

const Formula4 = () => {
	const formula4Mutate = useMutateData({
		mutationFn: (data) => formulaApi.formulaFour(data),
		invalidateKeys: ['formulaFour'],
		displaySuccess: true,
	});

	const initialValues = {
		total_calls_answered_in_time_p: '',
		total_calls_abandoned_after_time: '',
		total_calls_answered: '',
	};

	const validationSchema = yup.object().shape({
		total_calls_answered_in_time_p: yup
			.number()
			.required('Total calls answered in time period is required')
			.positive('Total calls answered in time period must be a positive number')
			.integer('Total calls answered in time period must be an integer')
			.min(1, 'Total calls answered in time period must be greater than 0'),
		total_calls_abandoned_after_time: yup
			.number()
			.required('Total calls abandoned after time is required')
			.positive('Total calls abandoned after time must be a positive number')
			.integer('Total calls abandoned after time must be an integer')
			.min(1, 'Total calls abandoned after time must be greater than 0'),
		total_calls_answered: yup
			.number()
			.required('Total Calls Answered is required')
			.positive('Total Calls Answered must be a positive number')
			.integer('Total Calls Answered must be an integer')
			.min(1, 'Total Calls Answered must be greater than 0'),
	});

	const submitHandler = (values: Formula_One) => {
		formula4Mutate.mutate(values);
	};

	const formBuilderArgs = {
		initialValues: initialValues,
		handleSubmit: submitHandler,
		validationSchema: validationSchema,
		loading: formula4Mutate?.isPending,
		formSchema: [
			{
				name: 'total_calls_answered_in_time_p',
				type: 'number',
				label: `Total calls answered in time period`,
			},

			{
				name: 'total_calls_answered',
				type: 'number',
				label: `Total calls answered`,
			},

			{
				name: 'total_calls_abandoned_after_time',
				type: 'number',
				label: `Total calls abandoned after time period`,
			},
		],
	};
	return (
		<div className='flex flex-col gap-2'>
			<div>{<FormBuilder {...formBuilderArgs} />}</div>
			{formula4Mutate?.data?.data?.data?.result && (
				<div className='flex items-center justify-center text-blue-600'> Result {formula4Mutate?.data?.data?.data?.result}</div>
			)}{' '}
		</div>
	);
};

export default Formula4;
