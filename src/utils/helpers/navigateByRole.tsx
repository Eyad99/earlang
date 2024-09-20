import { KEY_USER_COOKIE } from '@/variables/constants';
import Cookies from 'js-cookie';

let user: any = Cookies.get(KEY_USER_COOKIE);
user = user ? JSON.parse(user) : {};

export const NavigateByRole =
	user?.role === 'superadmin'
		? '/admin/dashboard'
		: user?.role === 'administrator'
		? '/admin/dashboard'
		: user?.role === 'customer'
		? '/customer/dashboard'
		: user?.role === 'staff'
		? '/staff/dashboard'
		: '/auth/sign-in';
