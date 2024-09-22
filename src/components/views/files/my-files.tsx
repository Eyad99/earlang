import DataTable from '@/components/dataTable/DataTable';
import Cookies from 'js-cookie';
import { DataTableProps } from '@/core';
import { Button } from '@/components/ui/button';

const MyFiles = () => {
	let user: any = Cookies.get('user');
	user = user ? JSON.parse(user) : {};

	// const tableProps: DataTableProps<any> = {
	const tableProps: DataTableProps = {
		fetchUrl: user?.role === 'customer' ? 'api/callcenter/my_xl_filedata/' : 'api/my_user_upload_xls/',
		queryKey: 'my-xls-files',
		columns: [
			{ header: 'Period in Minutes', accessor: 'period_in_m' },
			{ header: 'Time a Call Has to Wait (in seconds)', accessor: 'tat_in_s' },
			{ header: 'Average Handled Time (in seconds)', accessor: 'aht_in_s' },
			{ header: 'Service Level', accessor: 'sla' },
		],
		actions: {
			add: {},
			custom: {
				component: (rowData: any) => {
					console.log('rowData.row.origina', rowData.row.origina);
					return <Button onClick={() => {}}>View Chart</Button>;
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
