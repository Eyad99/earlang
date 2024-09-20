import FormBuilder from '@/components/formBuilder';
import { useFetchDataRQ } from '@/hooks/useFetchDataRQ';
import { useMutateData } from '@/hooks/useMutateData';
import { settingApi } from '@/core';
import * as yup from 'yup';

const SettingsList = () => {
	const { data, isLoading } = useFetchDataRQ({
		queryKey: ['setting'],
		queryFn: () => settingApi.getSettings(),
	});

	const addSettingMutate = useMutateData({
		mutationFn: (data) => settingApi.addSetting(data),
		invalidateKeys: ['addSetting'],
		displaySuccess: true,
	});

	const updateSettingMutate = useMutateData({
		mutationFn: (data) => settingApi.updateSetting(data),
		invalidateKeys: ['updateSetting'],
		displaySuccess: true,
	});

	const initialValues = {
		id: data?.data?.[0]?.id || undefined,
		count_users: data?.data?.[0]?.count_users || '',
		count_files: data?.data?.[0]?.count_files || '',
	};

	const validationSchema = yup.object().shape({
		count_users: yup
			.number()
			.required('Number of users is required')
			.positive('Number of users must be a positive number')
			.integer('Number of users must be an integer')
			.min(1, 'Number of users must be greater than 0'),

		count_files: yup
			.number()
			.required('Number of files is required')
			.positive('Number of files must be a positive number')
			.integer('Number of files must be an integer')
			.min(1, 'Number of files must be greater than 0'),
	});

	const submitHandler = (values: any) => {
		console.log('values', values);
		values?.id ? updateSettingMutate.mutate(values) : addSettingMutate.mutate(values);
	};

	const formBuilderArgs = {
		initialValues: initialValues,
		handleSubmit: submitHandler,
		validationSchema: validationSchema,
		loading: addSettingMutate?.isPending || updateSettingMutate?.isPending,
		formSchema: [
			{
				name: 'count_users',
				type: 'number',
				label: `Number of files scanned and uploaded`,
			},

			{
				name: 'count_files',
				type: 'number',
				label: `Number of users allowed to be added`,
			},
		],
	};

	if (isLoading) return <>Loading ...</>;

	return <FormBuilder {...formBuilderArgs} />;
};

export default SettingsList;
