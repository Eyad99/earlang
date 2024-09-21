import { useMutateData } from '@/hooks/useMutateData';
import { useNavigate } from 'react-router-dom';
import { Files_Req } from '@/core';
import { fileApi } from '@/core/services/files';
import FormBuilder from '@/components/formBuilder';
import Cookies from 'js-cookie';
import * as yup from 'yup';

const UploadFile = () => {
	const navigate = useNavigate();

	let user: any = Cookies.get('user');
	user = user ? JSON.parse(user) : {};

	const addFilesMutate = useMutateData({
		mutationFn: (data) => fileApi.addFiles(data),
		invalidateKeys: ['my-xls-files'],
		displaySuccess: true,
		onSuccessFn: () => {
			navigate(-1);
		},
	});

	const initialValues = {
		period_in_m: '',
		tat_in_s: '',
		aht_in_s: '',
		sla: '',
		file: [],
	};

	const validationSchema = yup.object().shape({
		period_in_m: yup
			.number()
			.required('Period in Minutes is required')
			.positive('Period in Minutes must be a positive number')
			.integer('Period in Minutes must be an integer')
			.min(1, 'Period in Minutes must be greater than 0'),

		tat_in_s: yup
			.number()
			.required('Time Call is required')
			.positive('Time Call must be a positive number')
			.integer('Time Call must be an integer')
			.min(1, 'Time Call must be greater than 0'),

		aht_in_s: yup
			.number()
			.required('Average Handled is required')
			.positive('Average Handled must be a positive number')
			.integer('Average Handled must be an integer')
			.min(1, 'Average Handled must be greater than 0'),

		sla: yup
			.number()
			.required('Service Level is required')
			.positive('Service Level must be a positive number')
			.integer('Service Level must be an integer')
			.min(1, 'Service Level must be greater than 0'),

		file: yup.array().min(1, `you need to provide one file at least!`).required(`file field is required`),
	});

	const submitHandler = (values: Files_Req) => {
		addFilesMutate.mutate(values);
	};

	const formBuilderArgs = {
		initialValues: initialValues,
		handleSubmit: submitHandler,
		validationSchema: validationSchema,
		loading: addFilesMutate?.isPending,
		formSchema: [
			{
				name: 'period_in_m',
				type: 'number',
				label: `Period in Minutes`,
			},

			{
				name: 'tat_in_s',
				type: 'number',
				label: `Time a Call Has to Wait (in seconds)`,
			},

			{
				name: 'aht_in_s',
				type: 'number',
				label: `Average Handled Time (in seconds)`,
			},

			{
				name: 'sla',
				type: 'number',
				label: `Service Level`,
			},

			{
				name: 'file',
				type: 'file',
				label: `Xls Files`,
				colSpan: 'col-span-2',
				fileTypes: { 'application/vnd.ms-excel': ['.xls'], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] },
			},
		],
	};

	return <FormBuilder {...formBuilderArgs} />;
};

export default UploadFile;
