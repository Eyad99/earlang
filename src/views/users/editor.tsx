import { Update_Role_To_User } from '@/core';
import { KEY_USER_COOKIE } from '@/variables/constants';
import { useMutateData } from '@/hooks/useMutateData';
import { useParams } from 'react-router-dom';
import { userApi } from '@/core/services/users';
import FormBuilder from '@/components/formBuilder';
import Cookies from 'js-cookie';
import * as yup from 'yup';

const UserEditor = () => {
	const { userId } = useParams();
	let user: any = Cookies.get(KEY_USER_COOKIE);
	user = user ? JSON.parse(user) : {};

	const updateUserMutate = useMutateData({
		mutationFn: (data) => userApi.updateUser(data),
		invalidateKeys: ['updateUser', userId],
		displaySuccess: true,
	});

	const initialValues = {
		role: user?.role || '',
	};

	const validationSchema = yup.object().shape({
		role: yup.string().required('Role is required'),
	});

	const submitHandler = (values: Update_Role_To_User) => {
		updateUserMutate.mutate(values);
	};

	const formBuilderArgs = {
		initialValues: initialValues,
		handleSubmit: submitHandler,
		validationSchema: validationSchema,
		loading: updateUserMutate?.isPending,
		formSchema: [
			{
				name: 'role',
				type: 'select',
				label: `Role`,
			},
		],
	};

	return <FormBuilder {...formBuilderArgs} />;
};

export default UserEditor;
