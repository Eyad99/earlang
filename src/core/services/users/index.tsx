import { Update_Role_To_User } from '@/core/models';
import { put } from '@/utils/api';

export const userApi = {
	updateUser: (data: Update_Role_To_User) => put(`auth/update-role/${data.id}`, data),
};
