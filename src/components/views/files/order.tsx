import DataTable from '@/components/dataTable/DataTable';
import moment from 'moment';
import { DEFAULT_DATE_TIME } from '@/variables/constants';
import { DataTableProps } from '@/core';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Order = () => {
	const { orderId } = useParams();
	const navigate = useNavigate();

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
							<Button variant={'blueOutline'} size={'sm'} onClick={() => navigate(`report/${rowData?.row?.original?.id}`)}>
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
			<DataTable {...tableProps} />
		</div>
	);
};

export default Order;
