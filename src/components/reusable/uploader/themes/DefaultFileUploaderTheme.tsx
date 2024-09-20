import uploadFileIcon from '@/assets/img/others/upload.svg';
import FileLists from '../FileLists';

const DefaultFileUploaderTheme = ({ getRootProps, getInputProps, files, fileSize, removeFile, style }: any) => {
	return (
		<section>
			<div {...getRootProps({ style })} className='mb-2 cursor-pointer'>
				<input {...getInputProps()} />
				<div className={'flex gap-2 items-center '}>
					<img src={uploadFileIcon} width='42px' height='42px' alt='uploadFileIcon' />
					<div className={'flex gap-1'}>
						<span className={'text-blue-300'}>{`Browse files`}</span>
						<span className={'text-black'}>{`or Drag your file to start uploading`}</span>
					</div>
					<span className={'text-gray-600'}>
						{`max uploading size is`} {fileSize / 1000} GB
					</span>
				</div>
			</div>
			<FileLists files={files} />
		</section>
	);
};

export default DefaultFileUploaderTheme;
