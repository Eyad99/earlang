import UploadFilesAsACustomer from '@/views/customer/files/editor';
import MyFilesAsACustomer from '@/views/customer/files';
import CustomerDashboard from '@/views/customer/dashboard';
import StaffEditor from '@/views/customer/staffs/editor';
import Profile from '@/views/profile';
import { Files, LayoutDashboard, Users } from 'lucide-react';
import { MyStaffs } from '@/views/customer/staffs';
import StaffFiles from '@/views/customer/staffs/files';

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
		name: 'My Files',
		layout: '/customer',
		icon: <Files />,
		path: '/my-files',
		component: <MyFilesAsACustomer />,
	},

	{
		layout: '/customer',
		path: '/my-files/:customerId',
		component: <UploadFilesAsACustomer />,
		invisible: true,
	},

	{
		name: 'Staffs',
		layout: '/customer',
		icon: <Users />,
		path: '/staffs',
		component: <MyStaffs />,
	},

	{
		name: 'Staffs',
		layout: '/customer',
		icon: <Users />,
		path: '/staffs/:userId/files',
		component: <StaffFiles />,
	},

	{
		layout: '/customer',
		path: '/staffs/:staffId',
		component: <StaffEditor />,
		invisible: true,
	},
];
export default CustomerRoutes;
