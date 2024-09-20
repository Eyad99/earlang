import { LoaderIcon } from 'lucide-react';
import { useFormik } from 'formik';
import { FC } from 'react';
import { Button } from '../ui/button';
import TextField from '../reusable/fields/TextField';
import PasswordField from '../reusable/fields/PasswordField';
import Uploader from '../reusable/uploader/inex';

export type FormBuilderProps = {
	initialValues: any;
	handleSubmit: any;
	validationSchema: any;
	formSchema: any[];
	submitButtonText?: string;
	mode?: string;
	multiple?: boolean;
	loading?: boolean;
};

const FormBuilder: FC<FormBuilderProps> = ({
	initialValues,
	handleSubmit,
	validationSchema,
	formSchema,
	submitButtonText = 'submit',
	// mode,
	// multiple,
	loading = false,
}) => {
	const {
		values,
		errors,
		touched,
		handleBlur,
		handleChange,
		handleSubmit: handleSubmitFormik,
		setFieldValue,
	} = useFormik({
		initialValues: initialValues,
		onSubmit: handleSubmit,
		validationSchema: validationSchema,
	});

	const renderInputField = (x: any) => {
		return (
			<TextField
				name={x.name}
				label={x.label}
				type={x.type}
				onBlur={handleBlur}
				onChange={handleChange}
				value={values[x.name]}
				placeholder={x.placeholder}
				error={!!touched[x.name] && !!errors[x.name]}
				helperText={touched[x.name] && errors[x.name]}
				disabled={x.disabled || false}
			/>
		);
	};

	const renderPasswordField = (x: any) => {
		return (
			<PasswordField
				onBlur={handleBlur}
				onChange={handleChange}
				value={values[x.name]}
				touched={touched[x.name] as any}
				errors={errors[x.name] as any}
				name={x.name}
				label={x.label}
			/>
		);
	};

	const renderFilesField = (x: any) => {
		return <Uploader onChange={(files: any) => setFieldValue(x.name, files)} fileTypes={x.fileTypes} />;
	};

	const itemToRendererMap: any = {
		text: renderInputField,
		number: renderInputField,
		email: renderInputField,
		url: renderInputField,
		date: renderInputField,
		time: renderInputField,
		'datetime-local': renderInputField,
		password: renderPasswordField,
		file: renderFilesField,
	};

	const render = (x: any) => {
		if (x?.checkigToDisplay?.key && !x?.checkigToDisplay?.value) {
			return null;
		}
		const Renderer = itemToRendererMap[x.type];
		return Renderer ? Renderer(x) : null;
	};

	return (
		<form onSubmit={handleSubmitFormik} className='bg-white p-4 rounded-md'>
			<div className='grid grid-cols-2 gap-3 '>
				{formSchema.map((x) => {
					const element = render(x);
					if (!element) return null; // Skip rendering if `element` is null
					return (
						<div key={x.name} className={x?.colSpan ? x?.colSpan : 'col-span-2 md:col-span-1'}>
							{element}
						</div>
					);
				})}
			</div>
			<div className='mt-4 flex justify-end'>
				<Button variant={'blue'} className='mt-4' disabled={loading}>
					{loading ? (
						<div className='flex gap-2'>
							<span>{submitButtonText ?? 'submit'}</span>
							<LoaderIcon className='animate-spin' />
						</div>
					) : (
						<span>{submitButtonText ?? 'submit'}</span>
					)}
				</Button>
			</div>
		</form>
	);
};

export default FormBuilder;
