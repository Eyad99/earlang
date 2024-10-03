import withLoading from '@/hooks/withLoader';
import Charts from '@/components/views/files/chart/charts';
import Card from '@/components/reusable/card';
import * as XLSX from 'xlsx';
import { useFetchDataRQ } from '@/hooks/useFetchDataRQ';
import { useParams } from 'react-router-dom';
import { fileApi } from '@/core/services/files';
import { Button } from '@/components/ui/button';
import ListerCom from '@/components/views/files/chart/lister-com';

const BoxWithLoading = withLoading(Card);
const Report = () => {
	const { fileId } = useParams();

	const { data, isLoading, isFetching } = useFetchDataRQ({
		queryKey: [`file-report-${fileId}`],
		queryFn: () => fileApi.getFileDetails(fileId),
	});

	const exportToExcel = () => {
		if (data?.data && Array.isArray(data?.data)) {
			const ws = XLSX.utils.json_to_sheet(data?.data);

			ws['!freeze'] = { xSplit: 0, ySplit: 1, topLeftCell: 'A2', activePane: 'bottomRight', state: 'frozen' };

			const wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
			XLSX.writeFile(wb, `exported-data_${fileId}.xlsx`);
		} else {
			console.error('Invalid data for Excel export');
		}
	};

	if (isLoading) return <BoxWithLoading loading={isLoading} size={32}></BoxWithLoading>;
	return (
		<div className='flex flex-col'>
			<div className='flex justify-end w-full'>
				<Button variant={'blueOutline'} onClick={exportToExcel}>
					Export As Excel
				</Button>
			</div>
			<div className='flex flex-col gap-6'>
				{/* <ChartLister fileId={fileId} /> */}
				<ListerCom data={data?.data} />
				<Charts data={data?.data} />
			</div>
		</div>
	);
};

export default Report;
