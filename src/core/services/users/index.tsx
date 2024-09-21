import { Update_Role_To_User } from '@/core/models';
import { get, patch, put } from '@/utils/api';

export const userApi = {
	updateUser: (data: Update_Role_To_User, userId: string | undefined) => patch(`auth/update-role/${userId}/`, data),
};
