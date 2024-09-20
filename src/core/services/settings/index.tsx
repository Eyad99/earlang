import { Setting_Req, Update_Setting_Req } from '@/core/models/settings';
import { get, post, put } from '@/utils/api';

export const settingApi = {
	getSettings: () => get(`auth/settings/`),
	addSetting: (data: Setting_Req) => post(`auth/settings/`, data),
	updateSetting: (data: Update_Setting_Req) => put(`auth/settings/${data.id}/`, data),
};
