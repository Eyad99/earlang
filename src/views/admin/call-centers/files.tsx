import FilesUploaded from '@/components/views/files/files-uploaded';
import { useParams } from 'react-router-dom';

const CAllCenterFiles = () => {
	const { callCenterId } = useParams();

	return <FilesUploaded url={`api/callcenter_upload_xls/${callCenterId}`} queryKey={`call-center-files-${callCenterId}`} />;
};

export default CAllCenterFiles;
