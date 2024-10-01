import Dashboard from '@/views/admin/dashboard';
import Agent from '@/views/calculator/agent';
import MaxCalls from '@/views/calculator/max-calls';
import OrderAsAStaff from '@/views/customer/staffs/order';
import Report from '@/views/report';
import StaffDashboard from '@/views/staff/dashboard';
import MyFilesAsAStaff from '@/views/staff/files';
import UploadFilesAsAStaff from '@/views/staff/files/editor';
import StaffProfile from '@/views/staff/profile';
import { Calculator, Files, LayoutDashboard } from 'lucide-react';

const StaffRoutes = [
	{
		name: 'Profile',
		layout: '/staff',
		path: '/profile',
		component: <StaffProfile />,
		invisible: true,
	},
	{
		name: 'Dashboard',
		layout: '/staff',
		icon: <LayoutDashboard />,
		path: '/dashboard',
		component: <StaffDashboard />,
	},

	{
		name: 'My Files',
		layout: '/staff',
		icon: <Files />,
		path: '/my-files',
		component: <MyFilesAsAStaff />,
	},

	{
		layout: '/staff',
		path: '/my-files/:staffId',
		component: <UploadFilesAsAStaff />,
		invisible: true,
	},

	{
		layout: '/staff',
		path: '/my-files/order/:orderId',
		component: <OrderAsAStaff />,
		invisible: true,
	},

	{
		layout: '/staff',
		path: '/my-files/order/:orderId/report/:fileId',
		component: <Report />,
		invisible: true,
	},

	{
		name: 'Calculators',
		path: '/max-calls',
		icon: <Calculator />,
		collapse: true,
		items: [
			{
				name: 'Agent',
				layout: '/staff',
				path: '/agent',
				component: <Agent />,
			},

			{
				name: 'Max Calls',
				layout: '/staff',
				path: '/max-calls',
				component: <MaxCalls />,
			},
		],
	},
];
export default StaffRoutes;
