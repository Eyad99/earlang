import { KEY_TOKEN_COOKIE } from '@/variables/constants';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const PrivateRoute = ({ children }: any) => {
	const isLoggedIn = Cookies.get(KEY_TOKEN_COOKIE);

	return isLoggedIn ? children : <Navigate to={'/auth/sign-in'} />;
};
