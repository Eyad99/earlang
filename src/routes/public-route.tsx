import { KEY_TOKEN_COOKIE, KEY_USER_COOKIE } from '@/variables/constants';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const PublicRoute = ({ children, restricted }: any) => {
	const isLoggedIn = Cookies.get(KEY_TOKEN_COOKIE);
	let user: any = Cookies.get(KEY_USER_COOKIE);
	user = user ? JSON.parse(user) : {};

	return isLoggedIn && restricted ? (
		<Navigate
			to={
				user?.role == 'superadmin' || 'administrator'
					? '/admin/dashboard'
					: user?.role == 'customer'
					? '/customer/dashboard'
					: user?.role == 'staff'
					? '/staff/dashboard'
					: '/error'
			}
		/>
	) : (
		children
	);
};
