import UploadFilesAsACustomer from '@/views/customer/files/editor';
import MyFilesAsACustomer from '@/views/customer/files';
import CustomerDashboard from '@/views/customer/dashboard';
import StaffEditor from '@/views/customer/staffs/editor';
import { Calculator, Files, Headset, LayoutDashboard, TrendingUpDown, Users } from 'lucide-react';
import { MyStaffs } from '@/views/customer/staffs';
import StaffFiles from '@/views/customer/staffs/files';
import OrderAsCustomer from '@/views/customer/files/order';
import OrderAsAStaff from '@/views/customer/staffs/order';
import Report from '@/views/report';
import CustomerProfile from '@/views/customer/profile';
import Agent from '@/views/calculator/agent';
import MaxCalls from '@/views/calculator/max-calls';
import Forecast from '@/views/forecast';
import { CallCenters } from '@/views/customer/callCenters';
import CallCenterEditor from '@/views/customer/callCenters/editor';
import ForecastEditor from '@/views/forecast/editor';
import ForecastViewer from '@/views/forecast/view';
import VForecast from '@/components/views/forecast/v-forecast';

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
		name: 'Call Centers',
		layout: '/customer',
		icon: <Headset />,
		path: '/call-centers',
		component: <CallCenters />,
	},

	{
		layout: '/customer',
		path: '/call-centers/:callCenterId',
		component: <CallCenterEditor />,
		invisible: true,
	},

	{
		name: 'Agent',
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
				name: 'Activities',
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
		name: 'Forecast',
		layout: '/customer',
		icon: <TrendingUpDown />,
		path: '/forecast',
		component: <Forecast />,
	},

	{
		name: 'Uploading a file',
		layout: '/customer',
		path: '/forecast-by-uploading-a-file',
		component: <VForecast />,
		invisible: true,
	},

	{
		layout: '/customer',
		path: '/forecast/:forecastId',
		component: <ForecastEditor />,
		invisible: true,
	},
	{
		layout: '/customer',
		path: '/forecast/:forecastId/:forecastType',
		component: <ForecastViewer />,
		invisible: true,
	},

	{
		name: 'Calculators',
		path: '/max-calls',
		icon: <Calculator />,
		collapse: true,
		items: [
			{
				name: 'Agents Required',
				layout: '/customer',
				path: '/agent',
				component: <Agent />,
			},

			// {
			// 	name: 'Max Calls',
			// 	layout: '/customer',
			// 	path: '/max-calls',
			// 	component: <MaxCalls />,
			// },
		],
	},
];
export default CustomerRoutes;
