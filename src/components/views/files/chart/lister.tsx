import DataTable from '@/components/dataTable/DataTable';
import { DataTableProps } from '@/core';
import { FC } from 'react';

interface ChartListerProps {
	fileId: string;
}

const ChartLister: FC<ChartListerProps> = ({ fileId }) => {
	const tableProps: DataTableProps = {
		fetchUrl: `api/get_erlangc_xls/${fileId}`,
		queryKey: `file-details-${fileId}`,
		columns: [
			{ header: 'datecalavg', accessor: 'datecalavg' },
			{ header: 'from_time', accessor: 'from_time' },
			{ header: 'to_time', accessor: 'to_time' },
			{ header: 'totall_Offered', accessor: 'totall_Offered' },
			{ header: 'totall_answered', accessor: 'totall_answered' },
			{ header: 'totall_abandoned', accessor: 'totall_abandoned' },
			{ header: 'sl_xpercentage', accessor: 'sl_xpercentage' },
			{ header: 'sl_xseconds', accessor: 'sl_xseconds' },
			{ header: 'callavg_talk_time', accessor: 'callavg_talk_time' },
			{ header: 'callavg_after_call_work', accessor: 'callavg_after_call_work' },
			{ header: 'callavg_abandom', accessor: 'callavg_abandom' },
			{ header: 'aggent_scheduled', accessor: 'aggent_scheduled' },
			{ header: 'aggent_logged_in', accessor: 'aggent_logged_in' },
			{ header: 'aggent_available', accessor: 'aggent_available' },
			{ header: 'agents', accessor: 'agents' },
			{ header: 'sl', accessor: 'sl' },
			{ header: 'sl_target', accessor: 'sl_target' },
			{ header: 'asa', accessor: 'asa' },
			{ header: 'imm_answ', accessor: 'imm_answ' },
			{ header: 'pw', accessor: 'pw' },
			{ header: 'occ', accessor: 'occ' },
			{ header: 'max_call', accessor: 'max_call' },
			{ header: 'created_at', accessor: 'created_at' },
		],
	};
	return (
		<div className='mt-5 grid h-full grid-cols-1 gap-5  md:grid-cols-1'>
			<DataTable {...tableProps} />
		</div>
	);
};

export default ChartLister;
