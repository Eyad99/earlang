import { Routes, Route, Navigate } from 'react-router-dom';
import AuthRoutes from '@/routes/auth';

export default function Auth() {
	const getRoutes = (routes: RoutesType[]): any => {
		return routes.map((prop, key) => {
			if (prop.layout === '/auth') {
				return <Route path={`${prop.path}`} element={prop.component} key={key} />;
			}
			if (prop.collapse) {
				return getRoutes(prop.items as any);
			}
			return null;
		});
	};
	document.documentElement.dir = 'ltr';
	return (
		<div>
			<div className='relative float-right h-full min-h-screen w-full dark:!bg-navy-900'>
				<main className={`mx-auto min-h-screen`}>
					{/* <FixedPlugin /> */}
					<Routes>
						{getRoutes(AuthRoutes)}
						<Route path='/' element={<Navigate to='/auth/sign-in' replace />} />
					</Routes>
				</main>
			</div>
		</div>
	);
}
