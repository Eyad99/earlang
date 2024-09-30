import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download, Ellipsis, FileText, Image, Sheet } from 'lucide-react';
import { FC } from 'react';
import downloadFile from '@/utils/helpers/downloadFile';
import exportAsPdf from '@/utils/helpers/exportAsPdf';
import exportAsExcel from '@/utils/helpers/exportAsExcel';

interface ExportChartAsMultiTypesProps {
	chartRef: any;
	statements: any;
	format: { key: string; value: string }[];
	labelName?: string;
}
const ExportChartAsMultiTypes: FC<ExportChartAsMultiTypesProps> = ({ chartRef, statements, format, labelName = 'Date' }) => {
	const handleExportAsImage = () => {
		if (chartRef.current) {
			const chart = chartRef.current as any;
			const url = chart.toBase64Image();
			downloadFile(url);
		}
	};

	const handleExportAsPdf = () => {
		if (chartRef.current) {
			const chart = chartRef.current as any;
			const url = chart.toBase64Image();
			exportAsPdf(url);
		}
	};

	const handleExportAsExcel = () => {
		exportAsExcel(statements.labels, statements, format, labelName);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				{/* <Ellipsis /> */}
				<div className='flex gap-2 text-gray-600'>
					<Download />
					<span className=''>Export As</span>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={() => handleExportAsImage()}>
					<div className='flex gap-2'>
						<Image className='text-blue-400' />
						<span> Image</span>
					</div>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleExportAsPdf()}>
					<div className='flex gap-2'>
						<FileText className='text-red-400' />
						<span> Pdf</span>
					</div>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleExportAsExcel()}>
					<div className='flex gap-2'>
						<Sheet className='text-green-400' />
						<span> Excel</span>
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ExportChartAsMultiTypes;
