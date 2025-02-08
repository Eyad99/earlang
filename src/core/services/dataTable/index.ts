import { get } from '@/utils';

export const dataTableApi = {
	getData: (url: string, params: any = {}) => get(url, { params }),
};
