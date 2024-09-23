const downloadFile = (fileUrl:string) => {
 	const link = document.createElement("a");
	link.href = fileUrl;

	link.setAttribute("download", "");

	link.style.display = "none";

	document.body.appendChild(link);

	link.click();

	document.body.removeChild(link);
 };
export default downloadFile;
