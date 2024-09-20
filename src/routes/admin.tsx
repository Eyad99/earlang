import Dashboard from '@/views/admin/dashboard';
import SettingsList from '@/views/admin/settings';
import MaxCalls from '@/views/calculator/max-calls';
import Agent from '@/views/calculator/agent';
import Formula1 from '@/views/formulas/formula-1';
import Formula2 from '@/views/formulas/formula-2';
import Formula3 from '@/views/formulas/formula-3';
import Formula4 from '@/views/formulas/formula-4';
import Formula5 from '@/views/formulas/formula-5';
import Profile from '@/views/profile';
import { UsersList } from '@/views/users';
import { Calculator, LayoutDashboard, Pi, Settings, Users } from 'lucide-react';
import UserEditor from '@/views/users/editor';

const AdminRoutes = [
	{
		name: 'Profile',
		layout: '/admin',
		path: '/profile',
		component: <Profile />,
		invisible: true,
	},

	{
		name: 'Dashboard',
		layout: '/admin',
		icon: <LayoutDashboard />,
		path: '/dashboard',
		component: <Dashboard />,
	},

	{
		name: 'Users',
		layout: '/admin',
		icon: <Users />,
		path: '/users',
		component: <UsersList />,
	},

	{
		layout: '/admin',
		path: '/user/:userId',
		component: <UserEditor />,
		invisible: true,
	},

	{
		name: 'Formulas',
		path: '/formula-1',
		icon: <Pi />,
		collapse: true,
		items: [
			{
				name: 'Formula 1',
				layout: '/admin',
				path: '/formula-1',
				component: <Formula1 />,
			},
			{
				name: 'Formula 2',
				layout: '/admin',
				path: '/formula-2',
				component: <Formula2 />,
			},
			{
				name: 'Formula 3',
				layout: '/admin',
				path: '/formula-3',
				component: <Formula3 />,
			},
			{
				name: 'Formula 4',
				layout: '/admin',
				path: '/formula-4',
				component: <Formula4 />,
			},
			{
				name: 'Formula 5',
				layout: '/admin',
				path: '/formula-5',
				component: <Formula5 />,
			},
		],
	},

	{
		name: 'Calculators',
		path: '/max-calls',
		icon: <Calculator />,
		collapse: true,
		items: [
			{
				name: 'Agent',
				layout: '/admin',
				path: '/agent',
				component: <Agent />,
			},

			{
				name: 'Max Calls',
				layout: '/admin',
				path: '/max-calls',
				component: <MaxCalls />,
			},
		],
	},

	{
		name: 'Setting',
		layout: '/admin',
		icon: <Settings />,
		path: '/setting',
		component: <SettingsList />,
	},
];
export default AdminRoutes;
