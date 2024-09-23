import DataTable from '@/components/dataTable/DataTable';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { DataTableProps } from '@/core';
import { DEFAULT_DATE_TIME } from '@/variables/constants';
import { useNavigate, useParams } from 'react-router-dom';

const Order = () => {
	const navigate = useNavigate();
	const { orderId } = useParams();

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
						<Button variant={'blueOutline'} size={'sm'} onClick={() => {}}>
							View Chart
						</Button>
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
