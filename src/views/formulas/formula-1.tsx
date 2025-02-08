import { useMutateData } from '@/hooks/useMutateData';
import { Formula_One } from '@/core';
import { formulaApi } from '@/core/services/formulas';
import FormBuilder from '@/components/formBuilder';
import * as yup from 'yup';

const Formula1 = () => {
	const formula1Mutate = useMutateData({
		mutationFn: (data) => formulaApi.formulaOne(data),
		invalidateKeys: ['formulaOne'],
		displaySuccess: true,
	});

	const initialValues = {
		calls_answered: '',
		total_calls: '',
	};

	const validationSchema = yup.object().shape({
		calls_answered: yup
			.number()
			.required('Calls Answered is required')
			.positive('Calls Answered must be a positive number')
			.integer('Calls Answered must be an integer')
			.min(1, 'Calls Answered must be greater than 0'),

		total_calls: yup
			.number()
			.required('Total Calls is required')
			.positive('Total Calls must be a positive number')
			.integer('Total Calls must be an integer')
			.min(1, 'Total Calls must be greater than 0'),
	});

	const submitHandler = (values: Formula_One) => {
		formula1Mutate.mutate(values);
	};

	const formBuilderArgs = {
		initialValues: initialValues,
		handleSubmit: submitHandler,
		validationSchema: validationSchema,
		loading: formula1Mutate?.isPending,
		formSchema: [
			{
				name: 'calls_answered',
				type: 'number',
				label: `Number of calls Answered in the time period`,
			},

			{
				name: 'total_calls',
				type: 'number',
				label: `Total number of calls answered`,
			},
		],
	};

	return (
		<div className='flex flex-col gap-2'>
			<div>{<FormBuilder {...formBuilderArgs} />}</div>
			{formula1Mutate?.data?.data?.data?.result && (
				<div className='flex items-center justify-center text-blue-600'> Result {formula1Mutate?.data?.data?.data?.result}</div>
			)}
		</div>
	);
};

export default Formula1;
