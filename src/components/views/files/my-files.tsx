import DataTable from '@/components/dataTable/DataTable';
import { DataTableProps } from '@/core';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const MyFiles = () => {
	const navigate = useNavigate();

	// const tableProps: DataTableProps<any> = {
	const tableProps: DataTableProps = {
		fetchUrl: 'api/my_user_upload_xls/',
		queryKey: 'my-xls-files',
		// filterByDate: true,

		columns: [
			{ header: 'User Name', accessor: 'user.fullname' },
			{ header: 'Call Center Name', accessor: 'callcenter.name' },
			{ header: 'Period in Misnutes', accessor: 'period_in_m' },
			{ header: 'Time a Call Has to Wait (in seconds)', accessor: 'tat_in_s' },
			{ header: 'Average Handled Time (in seconds)', accessor: 'aht_in_s' },
			{ header: 'Service Level', accessor: 'sla' },
		],
		actions: {
			add: {},
			custom: {
				component: (rowData: any) => {
					return (
						<Button variant={'blueOutline'} size={'sm'} onClick={() => navigate(`order/${rowData.row.original?.id}`)}>
							View Details
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

export default MyFiles;
