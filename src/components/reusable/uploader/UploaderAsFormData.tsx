import React, { useState, useEffect } from 'react';
import { Default_File_Types } from '@/variables/constants';
import { useDropzone } from 'react-dropzone';
import DefaultFileUploaderTheme from './themes/DefaultFileUploaderTheme';

const UploaderAsFormData = ({
	baseStyle,
	activeStyle,
	acceptStyle,
	rejectStyle,
	onChange,
	fileTypes,
	fileSize = 5000,
	singleFile,
	value = [],
}: any) => {
	const [files, setFiles] = useState(value);

	useEffect(() => {
		if (onChange) onChange(singleFile ? files[0] : files);
	}, [files]);

	useEffect(() => {
		if (value.length > 0) {
			setFiles(value);
		}
	}, [value]);

	// - - - - - - - - - - - - - - onDrop Function - - - - - - - - - - - - - -

	const onDrop = async (acceptedFiles: any) => {
		if (singleFile) {
			setFiles(acceptedFiles);
		} else {
			setFiles((prevFiles: any) => [...prevFiles, ...acceptedFiles]);
		}
	};

	// - - - - - - - - - - - - - - onDrop Hook - - - - - - - - - - - - - -

	const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
		onDrop,
		accept: fileTypes ? fileTypes : Default_File_Types,
		multiple: singleFile ? false : true,
	});

	const style = React.useMemo(
		() => ({
			...baseStyle,
			...(isDragActive ? activeStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isDragActive, isDragReject, isDragAccept]
	);

	return (
		<React.Fragment>
			<DefaultFileUploaderTheme
				getRootProps={getRootProps}
				getInputProps={getInputProps}
				files={files}
				fileSize={fileSize}
				removeFile={null}
				style={style}
			/>
		</React.Fragment>
	);
};

export default UploaderAsFormData;
