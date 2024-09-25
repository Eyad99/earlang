import EControlledDialog from '@/components/reusable/dialog/controlled-dialog';
import DataTable from '@/components/dataTable/DataTable';
import moment from 'moment';
import Chart from './chart';
import { DEFAULT_DATE_TIME } from '@/variables/constants';
import { DataTableProps } from '@/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import downloadFile from '@/utils/helpers/downloadFile';

const Order = () => {
	const { orderId } = useParams();
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [fileId, setFileId] = useState('');
	const [fileUrl, setFileUrl] = useState('');

	const handleOpenDialog = () => {
		setIsOpen(true);
	};

	const tableProps: DataTableProps = {
		fetchUrl: `api/get_fiels_xls/${orderId}`,
		queryKey: `my-order-${orderId}`,
		columns: [
			{ header: 'Name', accessor: `xlfile`, formatter: (value: any) => value.split('/')?.[value.split('/')?.length - 1] },
			{ header: 'Date of creation', accessor: 'created_at', formatter: (value: any) => moment(value).format(DEFAULT_DATE_TIME) },
		],
		actions: {
			custom: {
				component: (rowData: any) => {
					return (
						<div className='flex gap-4'>
							<Button
								variant={'blueOutline'}
								size={'sm'}
								// onClick={() => {
								// 	handleOpenDialog();
								// 	setFileId(rowData?.row?.original?.id);
								// 	setFileUrl(import.meta.env.VITE_BASE_URL + rowData?.row?.original?.xlfile.replace(/^\//, ''));
								// }}
								onClick={() => navigate(`report/${rowData?.row?.original?.id}`)}
							>
								View Report
							</Button>
						</div>
					);
				},
			},
		},
	};

	return (
		<div className='mt-5 grid h-full grid-cols-1 gap-5  md:grid-cols-1'>
			<EControlledDialog
				contentClassName='max-w-[1500px] overflow-y-auto max-h-screen'
				isOpen={isOpen}
				setOpen={setIsOpen}
				dialogBody={<Chart fileId={fileId} fileUrl={fileUrl} />}
			/>
			<DataTable {...tableProps} />
		</div>
	);
};

export default Order;
