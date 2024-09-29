import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
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
				<Ellipsis />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={() => handleExportAsImage()}>Export as image</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleExportAsPdf()}>Export as pdf</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleExportAsExcel()}>Export as excel</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ExportChartAsMultiTypes;
