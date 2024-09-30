import React from 'react';
import Dropdown from '@/components/reusable/dropdown';
import Cookies from 'js-cookie';
import avatar from '@/assets/img/avatars/avatar.png';
import { Bell, Moon, PanelRightClose, PanelRightOpen, Sun } from 'lucide-react';
import { KEY_TOKEN_COOKIE, KEY_USER_COOKIE } from '@/variables/constants';
import { Link, useNavigate } from 'react-router-dom';
import { useMutateData } from '@/hooks/useMutateData';
import { authApi } from '@/core';

const Navbar = (props: { brandText: string; [x: string]: any }) => {
	const { brandText, mini, hovered = true, open, handleOpenAndCloseSideBar } = props;
	console.log('navvvvvvv mini', mini);

	let user: any = Cookies.get(KEY_USER_COOKIE);
	user = user ? JSON.parse(user) : {};

	const [darkmode, setDarkmode] = React.useState(document.body.classList.contains('dark'));
	const navigate = useNavigate();

	// ------------ Logout Mutation ------------
	const logoutMutate = useMutateData({
		mutationFn: () => authApi.logout(),
		onSuccessFn: () => {
			Cookies.remove(KEY_TOKEN_COOKIE);
			Cookies.remove(KEY_USER_COOKIE);
			navigate('/auth/sign-in');
		},
	});

	const handleLogOutMutate = () => {
		logoutMutate.mutate({});
	};

	return (
		<nav
			className={`z-10 duration-175 linear fixed right-3 top-3 flex flex-row   items-center justify-between rounded-xl bg-white/30 transition-all ${
				mini === false
					? 'w-[calc(100vw_-_6%)] md:w-[calc(100vw_-_8%)] lg:w-[calc(100vw_-_6%)] xl:w-[calc(100vw_-_350px)] 2xl:w-[calc(100vw_-_365px)]'
					: mini === true && hovered === true
					? 'w-[calc(100vw_-_6%)] md:w-[calc(100vw_-_8%)] lg:w-[calc(100vw_-_6%)] xl:w-[calc(100vw_-_350px)] 2xl:w-[calc(100vw_-_365px)]'
					: 'w-[calc(100vw_-_6%)] md:w-[calc(100vw_-_8%)] lg:w-[calc(100vw_-_6%)] xl:w-[calc(100vw_-_180px)] 2xl:w-[calc(100vw_-_195px)]'
			}  p-2 backdrop-blur-xl dark:bg-[#0b14374d] md:right-[30px] md:top-4 xl:top-[20px]`}
		>
			<div className='ml-[6px]'>
				<div className='h-6 w-[224px] pt-1'>
					<a className='text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white' href=' '>
						Pages
						<span className='mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white'> / </span>
					</a>
					<Link className='text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white' to='#'>
						{brandText}
					</Link>
				</div>
				<p className='shrink text-[33px] capitalize text-navy-700 dark:text-white'>
					<Link to='#' className='font-bold capitalize hover:text-navy-700 dark:hover:text-white'>
						{brandText}
					</Link>
				</p>
			</div>

			<div className='relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-end gap-2 rounded-full px-2 py-2 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2'>
				{/* Notification List */}
				{/* <Dropdown
					button={
						<p className='cursor-pointer'>
							<Bell className='h-[18px] w-[18px] text-gray-600 dark:text-white' />
						</p>
					}
					animation='origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out'
					children={<></>}
					classNames={'py-2 top-4 -left-[230px] md:-left-[440px] w-max'}
				/> */}

				{/* open and close sidebar */}
				{mini ? (
					<PanelRightClose
						className='cursor-pointer h-[18px] w-[18px] text-gray-600 dark:text-white'
						onClick={() => handleOpenAndCloseSideBar()}
					/>
				) : (
					<PanelRightOpen
						className='cursor-pointer h-[18px] w-[18px] text-gray-600 dark:text-white'
						onClick={() => handleOpenAndCloseSideBar()}
					/>
				)}

				{/* Dark Mood And light Mood  */}
				<div
					className='cursor-pointer text-gray-600'
					onClick={() => {
						if (darkmode) {
							document.body.classList.remove('dark');
							setDarkmode(false);
						} else {
							document.body.classList.add('dark');
							setDarkmode(true);
						}
					}}
				>
					{darkmode ? (
						<Sun className='h-[18px] w-[18px] text-gray-600 dark:text-white' />
					) : (
						<Moon className='h-[18px] w-[18px] text-gray-600 dark:text-white' />
					)}
				</div>

				<Dropdown
					button={<img className='h-10 w-10 rounded-full' src={avatar} alt='Elon Musk' />}
					children={
						<div className='flex h-max w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat pb-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none'>
							<div className='ml-4 mt-3'>
								<div className='flex items-center gap-2'>
									<p className='text-sm font-bold text-navy-700 dark:text-white'>{user?.name}</p>{' '}
								</div>
							</div>
							<div className='mt-3 h-px w-full bg-gray-200 dark:bg-white/20 ' />

							<div className='ml-4 mt-3 flex flex-col'>
								<Link to='/admin/profile' className='text-sm text-gray-800 dark:text-white hover:dark:text-white'>
									Profile
								</Link>

								<a href='#' className='mt-3 text-sm font-medium text-red-500 hover:text-red-500' onClick={() => handleLogOutMutate()}>
									Log Out
								</a>
							</div>
						</div>
					}
					classNames={'py-2 top-8 -left-[180px] w-max'}
				/>
			</div>
		</nav>
	);
};

export default Navbar;
