import DataTable from '@/components/dataTable/DataTable';
import { Button } from '@/components/ui/button';
import { DataTableProps } from '@/core';
import { CallCenter_Res } from '@/core/models/users';
import { useNavigate } from 'react-router-dom';

export const CallCentersList = () => {
	const navigate = useNavigate();
	// const tableProps: DataTableProps<CallCenter_Res> = {
	const tableProps: DataTableProps = {
		fetchUrl: 'auth/callcenters/',
		queryKey: 'callcenters',
		columns: [
			{ header: 'Name', accessor: 'name' },
			{ header: 'Owner Name', accessor: 'user.fullname' },
			{ header: 'Owner Email', accessor: 'user.email' },
			{ header: 'Account Type', accessor: 'free', formatter: (value: any) => 'free' },
		],
		actions: {
			custom: {
				component: (rowData: any) => {
					return (
						<div className='flex gap-4'>
							<Button
								variant={'defaultOutline'}
								size={'sm'}
								onClick={() => {
									navigate(`/admin/call-centers/${rowData.row.original.id}/staffs`);
								}}
							>
								View Staffs
							</Button>

							<Button
								variant={'blueOutline'}
								size={'sm'}
								onClick={() => {
									navigate(`/admin/call-centers/${rowData.row.original.id}/files`);
								}}
							>
								View Files
							</Button>

							<Button
								variant={'greenOutline'}
								size={'sm'}
								onClick={() => {
									navigate(`/admin/call-centers/${rowData.row.original.id}/statistics`);
								}}
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
			<DataTable {...tableProps} />
		</div>
	);
};

// account type
// free
// commershal
