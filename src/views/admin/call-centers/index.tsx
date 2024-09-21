import DataTable from '@/components/dataTable/DataTable';
import { Button } from '@/components/ui/button';
import { DataTableProps } from '@/core';
import { CallCenter_Res } from '@/core/models/users';
import { useNavigate } from 'react-router-dom';

export const CallCentersList = () => {
	const navigate = useNavigate();
	const tableProps: DataTableProps<CallCenter_Res> = {
		fetchUrl: 'auth/callcenters/',
		queryKey: 'callcenters',
		columns: [
			{ header: 'Name', accessor: 'name' },
			{ header: 'Owner Name', accessor: 'user.fullname' },
			{ header: 'Owner Email', accessor: 'user.email' },
		],
		actions: {
			custom: {
				component: (rowData: any) => {
					console.log('rowData.row.original', rowData.row.original);
					return (
						<div className='flex gap-4'>
							<Button
								onClick={() => {
									navigate(`/admin/call-centers/${rowData.row.original.id}/staffs`);
								}}
							>
								View Staffs
							</Button>

							<Button
								onClick={() => {
									navigate(`/admin/call-centers/${rowData.row.original.id}/files`);
								}}
							>
								View Files
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
