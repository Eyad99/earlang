import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PrivateRoute } from './routes/private-route';
import { PublicRoute } from './routes/public-route';
import AdminLayout from '@/layouts/admin';
import AuthLayout from '@/layouts/auth';
import NotFound from './views/not-found';

const App = () => {
	// Create a new context
	const [themeApp, setThemeApp] = useState<any>({
		'--background-100': '#FFFFFF',
		'--background-900': '#070f2e',
		'--shadow-100': 'rgba(112, 144, 176, 0.08)',
		'--color-50': '#E9E3FF',
		'--color-100': '#C0B8FE',
		'--color-200': '#A195FD',
		'--color-300': '#8171FC',
		'--color-400': '#7551FF',
		'--color-500': '#422AFB',
		'--color-600': '#3311DB',
		'--color-700': '#2111A5',
		'--color-800': '#190793',
		'--color-900': '#11047A',
	});
	const [mini, setMini] = useState(false);

	// When the theme state changes, this effect will update the CSS variables in the document's root element
	useEffect(() => {
		let color;
		for (color in themeApp) {
			document.documentElement.style.setProperty(color, themeApp[color]);
		}
		//eslint-disable-next-line
	}, [themeApp]);

	return (
		<Routes>
			<Route path='/' element={<Navigate to='/auth/sign-in' replace />} />
			<Route
				path='auth/*'
				element={
					<PublicRoute restricted={true}>
						<AuthLayout />
					</PublicRoute>
				}
			/>
			<Route
				path='admin/*'
				element={
					<PrivateRoute>
						<AdminLayout setMini={setMini} mini={mini} theme={themeApp} setTheme={setThemeApp} />
					</PrivateRoute>
				}
			/>
			<Route
				path='customer/*'
				element={
					<PrivateRoute>
						<AdminLayout setMini={setMini} mini={mini} theme={themeApp} setTheme={setThemeApp} />
					</PrivateRoute>
				}
			/>
			<Route
				path='staff/*'
				element={
					<PrivateRoute>
						<AdminLayout setMini={setMini} mini={mini} theme={themeApp} setTheme={setThemeApp} />
					</PrivateRoute>
				}
			/>

			<Route
				path='/401'
				element={
					<PublicRoute restricted={false}>
						<NotFound />
					</PublicRoute>
				}
			/>

			<Route path='*' element={<NotFound />} />
		</Routes>
	);
};

export default App;
