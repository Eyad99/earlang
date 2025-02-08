import DataTable from '@/components/dataTable/DataTable';
import moment from 'moment';
import Cookies from 'js-cookie';
import { DataTableProps } from '@/core';
import { DEFAULT_DATE } from '@/variables/constants';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Forecast = () => {
	let user: any = Cookies.get('user');
	user = user ? JSON.parse(user) : {};

	const navigate = useNavigate();
	const tableProps: DataTableProps = {
		fetchUrl: 'api/forcasting/files/',
		queryKey: 'forcast-list',
		columns: [
			{ header: 'File Name', accessor: 'filename' },
			{ header: 'Description', accessor: 'desc', formatter: (value: any) => <div className='max-w-120  '>{value}</div> },
			{ header: 'Date of creation', accessor: 'created_at', formatter: (value: any) => moment(value).format(DEFAULT_DATE) },
		],
		actions: {
			add: {},
			customInSearchArea: {
				component: () => {
					return (
						<Button
							variant={'defaultOutline'}
							onClick={() =>
								navigate(`/${user?.role == 'customer' ? 'customer/forecast-by-uploading-a-file' : 'admin/forecast-by-uploading-a-file'}`)
							}
						>
							View the forecast by uploading a file{' '}
						</Button>
					);
				},
			},
			custom: {
				component: (rowData: any) => {
					return (
						<div className='flex gap-2'>
							<Button variant={'greenOutline'} size={'sm'} onClick={() => navigate(`${rowData.row.original.id}/volume`)}>
								View By Volume
							</Button>
							<Button variant={'blueOutline'} size={'sm'} onClick={() => navigate(`${rowData.row.original.id}/aht`)}>
								View By Aht
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

export default Forecast;
