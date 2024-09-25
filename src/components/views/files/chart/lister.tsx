import { DEFAULT_DATE, DEFAULT_DATE_TIME } from '@/variables/constants';
import { DataTableProps } from '@/core';
import { FC } from 'react';
import DataTable from '@/components/dataTable/DataTable';
import moment from 'moment';

interface ChartListerProps {
	fileId: string | undefined;
}

const ChartLister: FC<ChartListerProps> = ({ fileId }) => {
	const roundedNumber = (number: number, decimalPlaces: number) => {
		return parseFloat(number.toFixed(decimalPlaces));
	};
	const tableProps: DataTableProps = {
		fetchUrl: `api/get_erlangc_xls/${fileId}`,
		queryKey: `file-report-${fileId}`,
		cardClassName: 'max-h-[550px] !no-scrollbar',
		columns: [
			{ header: 'Datecalavg', accessor: 'datecalavg', formatter: (value: any) => moment(value).format(DEFAULT_DATE) },
			{ header: 'From Time', accessor: 'from_time' },
			{ header: 'To Time', accessor: 'to_time' },
			{ header: 'Total Offered', accessor: 'totall_Offered' },
			{ header: 'Total Answered', accessor: 'totall_answered' },
			{ header: 'Total Abandoned', accessor: 'totall_abandoned' },
			{ header: 'Sl Xpercentage', accessor: 'sl_xpercentage', formatter: (value: any) => roundedNumber(value, 0) },
			{ header: 'Sl xseconds', accessor: 'sl_xseconds' },
			{ header: 'Callavg Talk Time', accessor: 'callavg_talk_time' },
			{ header: 'Callavg After Call Work', accessor: 'callavg_after_call_work' },
			{ header: 'Callavg Abandom', accessor: 'callavg_abandom' },
			{ header: 'Aggent Scheduled', accessor: 'aggent_scheduled' },
			{ header: 'Aggent Logged_in', accessor: 'aggent_logged_in' },
			{ header: 'Aggent Available', accessor: 'aggent_available' },
			{ header: 'Agents', accessor: 'agents' },
			{ header: 'Service Level', accessor: 'sl', formatter: (value: any) => roundedNumber(value * 100, 2) + ' %' },
			{ header: 'Service Level Target', accessor: 'sl_target', formatter: (value: any) => roundedNumber(value * 100, 2) + ' %' },
			{ header: 'Asa', accessor: 'asa' },
			{ header: 'Imm Answ', accessor: 'imm_answ' },
			{ header: 'Pw', accessor: 'pw', formatter: (value: any) => roundedNumber(value * 100, 2) + ' %' },
			{ header: 'Occ', accessor: 'occ', formatter: (value: any) => roundedNumber(value * 100, 2) + ' %' },
			{ header: 'Max Call', accessor: 'max_call' },
		],
	};
	return (
		<div className='mt-5 grid h-full grid-cols-1 gap-5  md:grid-cols-1  '>
			<DataTable {...tableProps} />
		</div>
	);
};

export default ChartLister;
