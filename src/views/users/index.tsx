import DataTable from '@/components/dataTable/DataTable';
import { DataTableProps } from '@/core';
import { Users_Res } from '@/core/models/users';

export const UsersList = () => {
	// const tableProps: DataTableProps<Users_Res> = {
	const tableProps: DataTableProps = {
		fetchUrl: 'auth/users/',
		queryKey: 'users',
		columns: [
			{ header: 'Name', accessor: 'fullname' },
			{ header: 'Email', accessor: 'email' },
			{ header: 'Role', accessor: 'role' },
		],
		actions: { edit: {} },
	};

	return (
		<div className='mt-5 grid h-full grid-cols-1 gap-5  md:grid-cols-1'>
			<DataTable {...tableProps} />
		</div>
	);
};
