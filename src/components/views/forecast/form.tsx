import FormBuilder from '@/components/formBuilder';
import SelectField from '@/components/reusable/fields/SelectField';
import * as yup from 'yup';

const ForecastForm = ({ setFieldValue, type, forecastResultMutate }: { setFieldValue: any; type: string; forecastResultMutate: any }) => {
	const initialValues = {
		file: [],
	};

	const validationSchema = yup.object().shape({
		file: yup.array().min(1, `you need to provide one file at least!`).required(`file field is required`),
	});

	const submitHandler = (values: string) => {
		forecastResultMutate.mutate(values);
	};

	const formBuilderArgs = {
		initialValues: initialValues,
		handleSubmit: submitHandler,
		validationSchema: validationSchema,
		loading: forecastResultMutate?.isPending,
		formSchema: [
			{
				type: 'component',
				commponent: () => (
					<SelectField
						name='type'
						label='type'
						placeholder='Select Type'
						elements={[
							{ id: 'Year', name: 'Year' },
							{ id: 'Three Month', name: 'Three Month' },
							{ id: 'Month', name: 'Month' },
							{ id: 'Week', name: 'Week' },
							{ id: 'Day', name: 'Day' },
							{ id: 'Interval Of Days', name: 'Interval Of Days' },
						]}
						onChange={(event: any) => {
							setFieldValue('type', event);
						}}
						value={type}
					/>
				),
				colSpan: 'col-span-2',
			},

			{
				name: 'file',
				type: 'file',
				label: `Xls Files`,
				colSpan: 'col-span-2',
				fileTypes: { 'application/vnd.ms-excel': ['.xls'], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] },
				singleFile: type === 'Interval Of Days' ? false : true,
			},
		],
	};

	return (
		<div className='flex flex-col gap-2 '>
			<FormBuilder {...formBuilderArgs} />
		</div>
	);
};

export default ForecastForm;
