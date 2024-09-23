import Dashboard from '@/views/admin/dashboard';
import Profile from '@/views/profile';
import StaffDashboard from '@/views/staff/dashboard';
import MyFilesAsAStaff from '@/views/staff/files';
import UploadFilesAsAStaff from '@/views/staff/files/editor';
import { Files, LayoutDashboard } from 'lucide-react';

const StaffRoutes = [
	{
		name: 'Profile',
		layout: '/staff',
		path: '/profile',
		component: <Profile />,
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
];
export default StaffRoutes;
