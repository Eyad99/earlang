import SignIn from '@/views/auth/sign-in';
import SignUp from '@/views/auth/sign-up';
import ForgetPassword from '@/views/auth/forget-password';
import VerificationCode from '@/views/auth/verification-code';
import ResetPassword from '@/views/auth/reset-password';
import NotFound from '@/views/not-found';

const AuthRoutes = [
	{
		name: 'sign-in',
		layout: '/auth',
		path: '/sign-in',
		component: <SignIn />,
	},
	{
		name: 'sign-up',
		layout: '/auth',
		path: '/sign-up',
		component: <SignUp />,
	},
	{
		name: 'forget-password',
		layout: '/auth',
		path: '/forget-password',
		component: <ForgetPassword />,
	},
	{
		name: 'verification-code',
		layout: '/auth',
		path: '/verification-code',
		component: <VerificationCode />,
	},
	{
		name: 'reset-password',
		layout: '/auth',
		path: '/reset-password',
		component: <ResetPassword />,
	},

	{
		name: 'NotFound',
		layout: '/auth',
		path: '*',
		invisible: true,
		component: <NotFound />,
	},
];
export default AuthRoutes;
