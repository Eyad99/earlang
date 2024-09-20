import { Files_Req } from '@/core/models/files';
import { post } from '@/utils/api';

export const fileApi = {
	addFiles: (data: Files_Req) => post(`api/upload_xls/`, data, { headers: { formData: true } }),
};
