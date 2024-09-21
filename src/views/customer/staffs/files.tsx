import { useParams } from 'react-router-dom';
import FilesUploaded from '@/components/views/files/files-uploaded';

const StaffFiles = () => {
	const { userId } = useParams();

	return <FilesUploaded url={`api/user_upload_xls/${userId}`} queryKey={`sraff-files-${userId}`} />;
};

export default StaffFiles;
