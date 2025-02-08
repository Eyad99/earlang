import jsPDF from 'jspdf';

const exportAsPdf = (fileUrl: string, fileName: string) => {
	const pdf = new jsPDF();
	pdf.addImage(fileUrl, 'JPEG', 10, 10, 180, 90); // Add the chart image
	pdf.save(fileName ? fileName : 'chart.pdf');
};
export default exportAsPdf;
