import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

// For the (labelName), once it is included in the (dataset)=> cut first object from format
// And when you are not within (dataset) =>don't cut anything
// LIKE (VCallStats -VCountFilesAllCallCenters)

const exportAsExcel = (
	data: any[], // Array of dates or labels
	statements: any, // Data that contains datasets
	format: { key: string; value: string }[], // Format array that defines the key-value mapping
	labelName: string
) => {
	// console.log('data', data, statements, format);
	const workbook = new ExcelJS.Workbook();
	const worksheet = workbook.addWorksheet('Chart Data');

	worksheet.columns = [
		{ header: labelName.toUpperCase(), key: 'lebel', width: 20 },
		...format.map((f) => ({
			header: f.key.includes('_') ? f.key.replace(/_/g, ' ').toUpperCase() : f.key.toUpperCase(),
			key: f.key,
			width: 20,
		})),
	];

	data.forEach((item: any, index: number) => {
		const row: { [key: string]: any } = { lebel: item };

		format.forEach((f) => {
			row[f.key] = statements.datasets[f.key][index];
		});

		worksheet.addRow(row);
	});

	workbook.xlsx.writeBuffer().then((buffer) => {
		const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
		saveAs(blob, 'chart-data.xlsx');
	});
};

export default exportAsExcel;

// worksheet.eachRow((row, rowNumber) => {
//   if (rowNumber === 1) {
//     // Style header row
//     row.eachCell((cell) => {
//       cell.fill = {
//         type: 'pattern',
//         pattern: 'solid',
//         fgColor: { argb: 'FFFF00' }, // Yellow background
//       };
//       cell.font = { bold: true };
//     });
//   }
// });
