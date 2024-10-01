import { authApi, CallCenter_Profile_Req } from '@/core';
import { KEY_USER_COOKIE } from '@/variables/constants';
import { useFetchDataRQ } from '@/hooks/useFetchDataRQ';
import { useMutateData } from '@/hooks/useMutateData';
import Cookies from 'js-cookie';
import * as yup from 'yup';
import VInformation from '@/components/views/profiles/user/v-information';
import AccountInforationSkeleton from '@/utils/skeletons/account-inforation-skeleton';

const Information = () => {
	let user: any = Cookies.get(KEY_USER_COOKIE);
	user = user ? JSON.parse(user) : {};

	const { data, isLoading } = useFetchDataRQ({
		queryKey: ['userProfile'],
		queryFn: () => authApi.userProfile(),
	});

	const updateUserInforationMutate = useMutateData({
		mutationFn: (data: CallCenter_Profile_Req) => authApi.updateCallCenterProfile(data, '3'),
		invalidateKeys: ['userProfile'],
	});

	const initialValues = { fullname: (data && data?.data?.fullname) || '' };

	const handleFormSubmit = (values: CallCenter_Profile_Req) => {
		updateUserInforationMutate.mutate(values);
	};

	const validationSchema = yup.object().shape({});

	const formBuilderArgs = {
		initialValues: initialValues,
		handleSubmit: handleFormSubmit,
		validationSchema: validationSchema,
		loading: updateUserInforationMutate?.isPending,
		formClassName: '',
		gridClassName: 'mt-7 mb-2 grid grid-cols-2 gap-3',
		formSchema: [
			{
				name: 'fullname',
				type: 'text',
				label: `Full Name`,
				placeholder: 'Full Name',
				colSpan: 'col-span-2',
			},
		],
	};

	if (isLoading) return <AccountInforationSkeleton />;

	return <VInformation formBuilderArgs={formBuilderArgs} />;
};

export default Information;
