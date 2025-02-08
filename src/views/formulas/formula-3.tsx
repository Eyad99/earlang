import { useMutateData } from '@/hooks/useMutateData';
import { Formula_One } from '@/core';
import { formulaApi } from '@/core/services/formulas';
import FormBuilder from '@/components/formBuilder';
import * as yup from 'yup';

const Formula3 = () => {
	const formula3Mutate = useMutateData({
		mutationFn: (data) => formulaApi.formulaThree(data),
		invalidateKeys: ['formulaThree'],
		displaySuccess: true,
	});

	const initialValues = {
		total_calls_answered_in_time: '',
		total_calls_abandoned: '',
		total_calls_answered: '',
	};

	const validationSchema = yup.object().shape({
		total_calls_answered_in_time: yup
			.number()
			.required('Total Calls Answered In Time is required')
			.positive('Total Calls Answered In Time must be a positive number')
			.integer('Total Calls Answered In Time must be an integer')
			.min(1, 'Total Calls Answered In Time must be greater than 0'),
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
		formula3Mutate.mutate(values);
	};

	const formBuilderArgs = {
		initialValues: initialValues,
		handleSubmit: submitHandler,
		validationSchema: validationSchema,
		loading: formula3Mutate?.isPending,
		formSchema: [
			{
				name: 'total_calls_answered_in_time',
				type: 'number',
				label: `Total calls answered in time limit`,
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
			{formula3Mutate?.data?.data?.data?.result && (
				<div className='flex items-center justify-center text-blue-600'> Result {formula3Mutate?.data?.data?.data?.result}</div>
			)}{' '}
		</div>
	);
};

export default Formula3;
