import UploadFilesAsACustomer from '@/views/customer/files/editor';
import MyFilesAsACustomer from '@/views/customer/files';
import CustomerDashboard from '@/views/customer/dashboard';
import StaffEditor from '@/views/customer/staffs/editor';
import { Calculator, Files, LayoutDashboard, Users } from 'lucide-react';
import { MyStaffs } from '@/views/customer/staffs';
import StaffFiles from '@/views/customer/staffs/files';
import OrderAsCustomer from '@/views/customer/files/order';
import OrderAsAStaff from '@/views/customer/staffs/order';
import Report from '@/views/report';
import CustomerProfile from '@/views/customer/profile';
import Agent from '@/views/calculator/agent';
import MaxCalls from '@/views/calculator/max-calls';

const CustomerRoutes = [
	{
		name: 'Profile',
		layout: '/customer',
		path: '/profile',
		component: <CustomerProfile />,
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
		name: 'Staffs',
		layout: '/customer',
		icon: <Users />,
		path: '/staffs',
		component: <MyStaffs />,
	},

	{
		layout: '/customer',
		path: '/staffs/:userId/files',
		component: <StaffFiles />,
		invisible: true,
	},

	{
		layout: '/customer',
		path: '/staffs/:userId/files/order/:orderId',
		component: <OrderAsAStaff />,
		invisible: true,
	},

	{
		layout: '/customer',
		path: '/staffs/:userId/files/order/:orderId/report/:fileId',
		component: <Report />,
		invisible: true,
	},

	{
		layout: '/customer',
		path: '/staffs/:staffId',
		component: <StaffEditor />,
		invisible: true,
	},

	{
		name: 'My Files',
		path: '/my-files',
		icon: <Files />,
		collapse: true,
		items: [
			{
				name: 'Lister',
				layout: '/customer',
				path: '/my-files',
				component: <MyFilesAsACustomer />,
			},

			{
				name: 'Upload Files',
				layout: '/customer',
				path: '/upload-files',
				component: <UploadFilesAsACustomer />,
			},
		],
	},

	{
		layout: '/customer',
		path: '/my-files/:customerId',
		component: <UploadFilesAsACustomer />,
		invisible: true,
	},

	{
		layout: '/customer',
		path: '/my-files/order/:orderId',
		component: <OrderAsCustomer />,
		invisible: true,
	},

	{
		layout: '/customer',
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
				layout: '/customer',
				path: '/agent',
				component: <Agent />,
			},

			{
				name: 'Max Calls',
				layout: '/customer',
				path: '/max-calls',
				component: <MaxCalls />,
			},
		],
	},
];
export default CustomerRoutes;
