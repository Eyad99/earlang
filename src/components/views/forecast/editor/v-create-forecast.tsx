import FormBuilder from '@/components/formBuilder';
import * as yup from 'yup';

const VCreateForecast = ({ createForecatMutate }: { createForecatMutate: any }) => {
	const initialValues = {
		desc: '',
		file: [],
	};

	const validationSchema = yup.object().shape({
		desc: yup.string().required(`Description is required`),
		file: yup.array().min(1, `you need to provide one file at least!`).required(`File field is required`),
	});

	const submitHandler = (values: string) => {
		createForecatMutate.mutate(values);
	};

	const formBuilderArgs = {
		initialValues: initialValues,
		handleSubmit: submitHandler,
		validationSchema: validationSchema,
		loading: createForecatMutate?.isPending,
		formSchema: [
			{
				name: 'desc',
				type: 'textarea',
				label: `Description`,
				placeholder: 'Write Description',
				colSpan: 'col-span-2',
			},

			{
				name: 'file',
				type: 'file',
				label: `Xls Files`,
				colSpan: 'col-span-2',
				fileTypes: { 'application/vnd.ms-excel': ['.xls'], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] },
				singleFile: false,
			},
		],
	};
	return (
		<div className='flex flex-col gap-2 '>
			<FormBuilder {...formBuilderArgs} />
		</div>
	);
};

export default VCreateForecast;
