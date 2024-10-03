import { useMutateData } from '@/hooks/useMutateData';
import { useNavigate } from 'react-router-dom';
import { Files_Req } from '@/core';
import { fileApi } from '@/core/services/files';
import FormBuilder from '@/components/formBuilder';
import Cookies from 'js-cookie';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import downloadFile from '@/utils/helpers/downloadFile';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const UploadFile = () => {
	const navigate = useNavigate();

	let user: any = Cookies.get('user');
	user = user ? JSON.parse(user) : {};

	const addFilesMutate = useMutateData({
		mutationFn: (data) => fileApi.addFiles(data),
		invalidateKeys: ['my-xls-files'],
		displaySuccess: true,
		onSuccessFn: ({ data }) => {
			navigate(`/${user?.role == 'customer' ? 'customer' : user?.role == 'staff' ? 'staff' : 'admin'}/my-files/order/${data?.data?.id}`);
		},
	});

	const initialValues = {
		period_in_m: '',
		tat_in_s: '',
		aht_in_s: '',
		sla: '',
		occ: 0,
		shrinkage: 0,
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

		occ: yup
			.number()
			.positive('Occupency must be a positive number')
			.integer('Occupency must be an integer')
			.min(0, 'Occupency must be greater than 0')
			.max(99, 'Number of occupency must be less or equal than 99'),

		shrinkage: yup
			.number()
			.positive('Shrinkage must be a positive number')
			.integer('Shrinkage must be an integer')
			.min(0, 'Shrinkage must be greater than 0')
			.max(99, 'Number of shrinkage must be less or equal than 99'),

		file: yup.array().min(1, `you need to provide one file at least!`).required(`file field is required`),
	});

	const submitHandler = (values: Files_Req) => {
		addFilesMutate.mutate(values);
	};

	const handleDownloadTemplate = () => {
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Template');
		worksheet.columns = [
			{ header: 'From', key: 'From', width: 10 },
			{ header: 'To', key: 'To', width: 10 },
			{ header: 'Offered', key: 'Offered', width: 10 },
			{ header: 'Answered', key: 'Answered', width: 10 },
			{ header: 'Abandoned', key: 'Abandoned', width: 10 },
			{ header: 'x%', key: 'x%', width: 10 },
			{ header: 'y secs', key: 'y secs', width: 10 },
			{ header: 'Talk time', key: 'Talk time', width: 10 },
			{ header: 'After Call Work', key: 'After Call Work', width: 10 },
			{ header: 'Time to Abandon', key: 'Time to Abandon', width: 10 },
			{ header: 'Scheduled', key: 'Scheduled', width: 10 },
			{ header: 'Logged in', key: 'Logged in', width: 10 },
			{ header: 'Available', key: 'Available', width: 10 },
		];

		workbook.xlsx.writeBuffer().then((buffer) => {
			const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
			saveAs(blob, 'template.xlsx');
		});
	};

	const formBuilderArgs = {
		initialValues: initialValues,
		handleSubmit: submitHandler,
		validationSchema: validationSchema,
		loading: addFilesMutate?.isPending,
		formSchema: [
			{
				name: 'period_in_m',
				type: 'select',
				label: `Period (in minutes)`,
				elements: [
					{ id: '15', name: '15' },
					{ id: '30', name: '30' },
					{ id: '60', name: '60' },
				],
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
				name: 'occ',
				type: 'number',
				label: `Occupency (optional)`,
			},

			{
				name: 'shrinkage',
				type: 'number',
				label: `Shrinkage (optional)`,
			},
			{
				type: 'component',
				commponent: () => (
					<div className='flex flex-col md:flex-row items-center md:gap-[8rem]'>
						<span>"Download the Excel template to upload your data." </span>
						<Button type='button' variant={'defaultOutline'} onClick={handleDownloadTemplate}>
							Download Template
						</Button>
					</div>
				),
				colSpan: 'col-span-2',
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
