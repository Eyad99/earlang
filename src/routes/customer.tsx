import Dashboard from '@/views/admin/dashboard';
import CustomerDashboard from '@/views/customer/dashboard';
import MyFilesAsACustomer from '@/views/customer/files';
import UploadFilesAsACustomer from '@/views/customer/files/editor';
import Profile from '@/views/profile';
import { Files, LayoutDashboard } from 'lucide-react';

const CustomerRoutes = [
	{
		name: 'Profile',
		layout: '/customer',
		path: '/profile',
		component: <Profile />,
		invisible: true,
	},
	{
		name: 'Dashboard',
		layout: '/customer',
		icon: <LayoutDashboard />,
		path: '/dashboard',
		component: <CustomerDashboard />,
	},

	{
		name: 'Files',
		path: '/my-files',
		icon: <Files />,
		collapse: true,
		items: [
			{
				name: 'My Files',
				layout: '/customer',
				path: '/my-files',
				component: <MyFilesAsACustomer />,
			},

			{
				layout: '/customer',
				path: '/my-files/:customerId',
				component: <UploadFilesAsACustomer />,
				invisible: true,
			},
		],
	},
];
export default CustomerRoutes;
