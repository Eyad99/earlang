import React from 'react';
import UploaderAsFormData from './UploaderAsFormData';

const Uploader = ({ onChange, singleFile, fileTypes, fileSize, placeholder, value, errors, error }: any) => {
	const baseStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '24px',
		borderWidth: 2,
		borderRadius: 2,
		borderColor: '#668AD7',
		borderStyle: 'dashed',
		transition: 'border .3s ease-in-out',
	};

	const activeStyle = {
		borderColor: '#2196f3',
	};

	const acceptStyle = {
		borderColor: '#00e676',
	};

	const rejectStyle = {
		borderColor: '#ff1744',
	};

	return (
		<UploaderAsFormData
			baseStyle={baseStyle}
			activeStyle={activeStyle}
			acceptStyle={acceptStyle}
			rejectStyle={rejectStyle}
			onChange={onChange}
			fileTypes={fileTypes}
			fileSize={fileSize}
			singleFile={singleFile}
			placeholder={placeholder}
			errors={errors}
			error={error}
			value={value}
		/>
	);
};

export default Uploader;
