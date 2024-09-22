import DataTable from '@/components/dataTable/DataTable';
import { Button } from '@/components/ui/button';
import { DataTableProps, Files_By_User_Res } from '@/core';
import { FC } from 'react';

interface FilesUploadedProps {
	url: string;
	queryKey: string;
}

const FilesUploaded: FC<FilesUploadedProps> = ({ url, queryKey }) => {
	// const tableProps: DataTableProps<Files_By_User_Res> = {
	const tableProps: DataTableProps = {
		fetchUrl: url,
		queryKey: queryKey,
		columns: [
			{ header: 'User Name', accessor: 'user.fullname' },
			{ header: 'Call Center Name', accessor: 'callcenter.name' },
			{ header: 'Period in Minutes', accessor: 'period_in_m' },
			{ header: 'Time a Call Has to Wait (in seconds)', accessor: 'tat_in_s' },
			{ header: 'Average Handled Time (in seconds)', accessor: 'aht_in_s' },
			{ header: 'Service Level', accessor: 'sla' },
		],
		actions: {
			custom: {
				component: (rowData: any) => {
					console.log('rowData', rowData.row.origin);
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

export default FilesUploaded;
