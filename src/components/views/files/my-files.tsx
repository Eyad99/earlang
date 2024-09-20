import DataTable from '@/components/dataTable/DataTable';
import Cookies from 'js-cookie';
import { DataTableProps } from '@/core';

const MyFiles = () => {
	let user: any = Cookies.get('user');
	user = user ? JSON.parse(user) : {};

	const tableProps: DataTableProps<any> = {
		fetchUrl: user?.role === 'customer' ? 'api/callcenter/my_xl_filedata/' : 'api/my_user_upload_xls/',
		queryKey: 'my-xls-files',
		columns: [
			{ header: 'Id', accessor: 'id' },
			{ header: 'Name', accessor: 'fullname' },
		],
		actions: { add: {} },
	};
	return (
		<div className='mt-5 grid h-full grid-cols-1 gap-5  md:grid-cols-1'>
			<DataTable {...tableProps} />
		</div>
	);
};

export default MyFiles;
