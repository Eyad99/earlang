import DataTable from '@/components/dataTable/DataTable';
import { Button } from '@/components/ui/button';
import { DataTableProps } from '@/core';
import { Users_Res } from '@/core/models/users';
import { useNavigate } from 'react-router-dom';

export const MyStaffs = () => {
	const navigate = useNavigate();

	// const tableProps: DataTableProps<Users_Res> = {
	const tableProps: DataTableProps = {
		fetchUrl: 'auth/users/',
		queryKey: 'my-staffs',
		columns: [
			{ header: 'Name', accessor: 'fullname' },
			{ header: 'Email', accessor: 'email' },
			{ header: 'Role', accessor: 'role' },
		],
		actions: {
			add: {},
			custom: {
				component: (rowData: any) => {
					return (
						<Button variant={'blueOutline'} size={'sm'} onClick={() => navigate(`/customer/staffs/${rowData.row.original.id}/files`)}>
							View Files
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
