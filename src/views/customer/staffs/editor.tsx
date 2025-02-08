import { useMutateData } from '@/hooks/useMutateData';
import { useNavigate } from 'react-router-dom';
import { Staff_Req } from '@/core';
import { userApi } from '@/core/services/users';
import FormBuilder from '@/components/formBuilder';
import * as yup from 'yup';

const StaffEditor = () => {
	const navigate = useNavigate();

	const addStaffMutate = useMutateData({
		mutationFn: (data) => userApi.addStaff(data),
		invalidateKeys: ['my-staffs'],
		displaySuccess: true,
		onSuccessFn: () => {
			navigate(-1);
		},
	});

	const initialValues = {
		email: '',
		fullname: '',
		password: '',
		password2: '',
	};

	const validationSchema = yup.object().shape({
		email: yup.string().required('Email is required'),
		fullname: yup.string().required('Name is required'),
		password: yup
			.string()
			.matches(/^(?=.{8,})/, `must contain 8 character`)
			.required(`password is required`),
		password2: yup
			.string()
			.matches(/^(?=.{8,})/, `must contain 8 character`)
			.oneOf([yup.ref('password')], `passwords must match`)
			.required(`confirm password is required`),
	});

	const submitHandler = (values: Staff_Req) => {
		addStaffMutate.mutate(values);
	};

	const formBuilderArgs = {
		initialValues: initialValues,
		handleSubmit: submitHandler,
		validationSchema: validationSchema,
		loading: addStaffMutate?.isPending,
		formSchema: [
			{
				name: 'fullname',
				type: 'text',
				label: `Name`,
				placeholder: `Name`,
			},
			{
				name: 'email',
				type: 'text',
				label: `Email`,
				placeholder: `Email`,
			},

			{
				name: 'password',
				type: 'password',
				label: `Password`,
				placeholder: `Password`,
			},
			{
				name: 'password2',
				type: 'password',
				label: `Confirm password`,
				placeholder: `Confirm Password`,
			},
		],
	};

	return <FormBuilder {...formBuilderArgs} />;
};

export default StaffEditor;
