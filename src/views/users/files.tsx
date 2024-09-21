import { useParams } from 'react-router-dom';
import FilesUploaded from '@/components/views/files/files-uploaded';

const UserFiles = () => {
	const { userId } = useParams();

	return <FilesUploaded url={`api/user_upload_xls/${userId}`} queryKey={`user-files-${userId}`} />;
};

export default UserFiles;
