import { Link, useLocation } from 'react-router-dom';
import DashIcon from '@/components/icons/DashIcon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function SidebarLinks(props: { routes: RoutesType[]; [x: string]: any }) {
	//  Chakra color mode
	const location = useLocation();

	const { routes, hovered, mini } = props;
	// verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName: string) => {
		return location.pathname.includes(routeName);
	};

	const createLinks = (routes: RoutesType[]) => {
		return routes.map((route, key) => {
			if (route.invisible) {
				return null;
			}

			if (route.collapse) {
				return (
					<Accordion type='single' tabIndex={activeRoute(route.path.toLowerCase()) ? 0 : 1} collapsible key={key}>
						<AccordionItem value={`${key}`} className='border-none'>
							<AccordionTrigger className='mr-4'>
								{route.icon ? (
									<div
										className={`mb-1.5 flex w-full items-center pl-8 pr-7 ${
											mini === false ? ' justify-between' : mini === true && hovered === true ? ' justify-between' : ' justify-center'
										}`}
									>
										<div>
											<div className='align-center flex w-full justify-center'>
												<div
													className={`flex items-center justify-center ${
														mini === false ? 'mr-3.5' : mini === true && hovered ? 'mr-3.5' : 'mx-auto'
													} ${activeRoute(route.path.toLowerCase()) ? 'text-brand-500 dark:text-white' : 'text-gray-600'} ${
														activeRoute(route.path.toLowerCase()) ? '22px' : '26px'
													}`}
												>
													{route.icon}
												</div>
												<p
													className={`mr-auto ${
														mini === false ? 'block' : mini === true && hovered === true ? 'block' : 'block xl:hidden'
													} ${
														activeRoute(route.path.toLowerCase())
															? 'text-700 font-medium text-navy-700 dark:text-white'
															: 'font-medium text-gray-600'
													} `}
												>
													{route.name}
												</p>
											</div>
										</div>
									</div>
								) : (
									<div
										className={`flex w-full items-center pb-0 pt-0 ${
											mini === false
												? 'ml-5 pl-12'
												: mini === true && hovered === true
												? 'ml-5 pl-12'
												: 'ml-5 pl-12 xl:ml-[unset] xl:justify-center xl:pl-8 xl:pr-7 '
										} pr-7`}
									>
										<div>
											<p
												className={`mr-auto text-sm font-medium ${
													activeRoute(route.path.toLowerCase()) ? 'text-800 text-navy-700 dark:text-white' : 'text-gray-600'
												} ${activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}`}
											>
												{mini === false ? route.name : mini === true && hovered === true ? route.name : route.name[0]}
											</p>
										</div>
									</div>
								)}
							</AccordionTrigger>
							<AccordionContent

							// pe={route.icon ? null : '0px'}
							// py='0px'
							// ps={
							// 	route.icon
							// 		? mini === false
							// 			? '8px'
							// 			: mini === true && hovered === true
							// 			? '8px'
							// 			: 'base:8px xl:0px'
							// 		: mini === false
							// 		? '8px'
							// 		: mini === true && hovered === true
							// 		? '8px'
							// 		: 'base:8px xl:0px'
							// }
							// display={mini === false ? 'block' : mini === true && hovered === true ? 'block' : 'base:block xl:flex'}
							>
								<ul>
									{
										route.icon
											? createLinks(route.items as any) // for bullet accordion links
											: createAccordionLinks(route.items as any) // for non-bullet accordion links
									}
								</ul>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				);
			} else {
				return (
					<Link to={route.layout + route.path} key={key}>
						{route.icon ? (
							<div className='relative flex hover:cursor-pointer h-[62px]'>
								<li className='my-[3px] flex cursor-pointer items-center px-[30px]'>
									<span
										className={`${
											activeRoute(route.path) === true ? 'font-bold text-brand-500 dark:text-white' : 'font-medium text-gray-600'
										}`}
									>
										{route.icon ? route.icon : <DashIcon />}{' '}
									</span>

									<p
										className={`leading-1 ml-4 flex   ${
											mini === false ? 'block' : mini === true && hovered === true ? 'block' : 'block xl:hidden'
										}  ${activeRoute(route.path) === true ? 'font-bold text-navy-700 dark:text-white' : 'font-medium text-gray-600'}`}
									>
										{route.name}
									</p>
								</li>
								{activeRoute(route.path) ? (
									<div className='absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400' />
								) : null}
							</div>
						) : (
							<div
								className={`relative mb-2 flex ${
									mini === false ? '' : mini === true && hovered === true ? '' : 'xl:justify-center'
								} hover:cursor-pointer`}
							>
								<li className='my-[3px] flex cursor-pointeritems-center px-[34px]' key={key}>
									<span
										className={`flex text-sm leading-none  ${
											mini === false ? 'ml-9' : mini === true && hovered === true ? 'ml-9' : 'ml-9 xl:ml-0'
										} ${activeRoute(route.path) === true ? 'font-medium text-navy-700 dark:text-white' : 'font-medium text-gray-600'}`}
									>
										{mini === false ? route.name : mini === true && hovered === true ? route.name : route.name[0]}
									</span>
								</li>
							</div>
						)}
					</Link>
				);
			}
		});
	};

	const createAccordionLinks = (routes: RoutesType[]) => {
		return routes.map((route, index) => {
			if (route.layout === '/admin' || route.layout === '/auth') {
				return (
					<Link key={index} to={route.layout + route.path}>
						<div
							className={`relative ${
								mini === false ? 'ml-7' : mini === true && hovered === true ? 'ml-7' : 'ml-7 xl:ml-4'
							} mb-1 flex hover:cursor-pointer`}
						>
							<li className='my-[3px] flex cursor-pointer items-center px-8' key={index}>
								<span className={`text-brand-500 dark:text-white`}>
									{/* <FaCircle className={`mr-0.5 h-1.5 w-1.5`} /> */}
									Icon Here
								</span>
								<span
									className={`ml-2 flex text-sm ${
										activeRoute(route.path) === true ? 'font-medium text-navy-700 dark:text-white' : 'font-medium text-gray-600'
									}`}
								>
									{mini === false ? route.name : mini === true && hovered === true ? route.name : route.name[0]}
								</span>
							</li>
						</div>
					</Link>
				);
			}
		});
	};
	return <>{createLinks(routes)}</>;
}

export default SidebarLinks;
