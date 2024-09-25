import { Files_Req } from '@/core/models/files';
import { get, post } from '@/utils/api';

export const fileApi = {
	addFiles: (data: Files_Req) => post(`api/upload_xls/`, data, { headers: { formData: true } }),
	getFileDetails: (fileId: string | undefined) => get(`api/get_erlangc_xls/${fileId}`),
};
