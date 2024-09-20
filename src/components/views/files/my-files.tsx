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
			{ header: 'Period in Minutes', accessor: 'period_in_m' },
			{ header: 'Time a Call Has to Wait (in seconds)', accessor: 'tat_in_s' },
			{ header: 'Average Handled Time (in seconds)', accessor: 'aht_in_s' },
			{ header: 'Service Level', accessor: 'sla' },
		],
		actions: {
			add: {},
			// custom: {
			// 	component: (rowData: any) => {
			// 		return (
			// 			<RButton
			// 				text={'Assign Order'}
			// 				size='xs'
			// 				colorScheme='cyan'
			// 				onClick={() => {
			// 					setIsOpen(true);
			// 					setDriverDetail(rowData.row.original);
			// 				}}
			// 			/>
			// 		);
			// 	},
			// },
		},
	};
	return (
		<div className='mt-5 grid h-full grid-cols-1 gap-5  md:grid-cols-1'>
			<DataTable {...tableProps} />
		</div>
	);
};

export default MyFiles;
