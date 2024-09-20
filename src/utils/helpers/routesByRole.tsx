import AdminRoutes from '@/routes/admin';
import CustomerRoutes from '@/routes/customer';
import StaffRoutes from '@/routes/staff';
import Cookies from 'js-cookie';

export const RoutesByRole = () => {
	let user: any = Cookies.get('user');
	user = user ? JSON.parse(user) : {};

	return user?.role === 'superadmin'
		? AdminRoutes
		: user?.role === 'administrator'
		? AdminRoutes
		: user?.role === 'customer'
		? CustomerRoutes
		: user?.role === 'staff'
		? StaffRoutes
		: [];
};
