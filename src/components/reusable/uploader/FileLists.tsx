import {
	fileTypes,
	fileIcon,
	fileWord,
	wordIcon,
	fileExcel,
	excelIcon,
	filePowerPoint,
	powerPointIcon,
	filePdf,
	pdfIcon,
	fileVideo,
	videoIcon,
	fileAudio,
	audioIcon,
	fileZip,
	zipIcon,
} from '@/variables/mimeTypes';

const FileLists = ({ files }: any) => {
	const thumbs = files?.map((fileObj: any, index: number) => {
		const type = fileObj?.type;
		const fileName = fileObj?.name;

		const fSource = fileTypes.includes(type)
			? fileIcon
			: fileWord.includes(type)
			? wordIcon
			: fileExcel.includes(type)
			? excelIcon
			: filePowerPoint.includes(type)
			? powerPointIcon
			: filePdf.includes(type)
			? pdfIcon
			: fileVideo.includes(type)
			? videoIcon
			: fileAudio.includes(type)
			? audioIcon
			: fileZip.includes(type)
			? zipIcon
			: fileObj?.image_url
			? fileObj?.image_url
			: URL.createObjectURL(fileObj);

		return (
			<div key={index}>
				<div className={'relative w-[100px] h-[100px] rounded'}>
					<img className={'w-full h-full object-cover cursor-pointer'} src={fSource} alt={fileName} />
				</div>

				<div className={'m-w-[100px] text-center'}>
					{/* <i className={"fa fa-trash"} onClick={() => removeFile(index, fileName)} style={{ color: "#fb404b", cursor: "pointer" }} /> */}
					<p>{fileName?.length > 10 ? `${fileName.substring(0, 10)} ..` : fileName}</p>
				</div>
			</div>
		);
	});

	return <section className={'flex flex-wrap gap-5'}>{thumbs}</section>;
};

export default FileLists;
