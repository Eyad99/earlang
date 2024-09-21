import { Staff_Req, Update_Role_To_User } from '@/core/models';
import { patch, post } from '@/utils/api';

export const userApi = {
	updateUser: (data: Update_Role_To_User, userId: string | undefined) => patch(`auth/update-role/${userId}/`, data),
	addStaff: (data: Staff_Req) => post(`auth/centerstaff/register/`, data),
};
