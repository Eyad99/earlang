import Links from './components/Links';
import Card from '@/components/reusable/card';
import { renderThumb, renderTrack, renderView, renderViewMini } from '@/components/reusable/scrollbar/Scrollbar';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { RoutesByRole } from '@/utils';
import { Scrollbars } from 'react-custom-scrollbars-2';
import insightsImg from '@/assets/img/others/insights.png';
import insightsIcon from '@/assets/img/others/logo-icon.png';

function SidebarHorizon(props: { open: boolean; [x: string]: any }) {
	const { open, mini, hovered = false, handleOpenAndCloseSideBar } = props;

	console.log('sidebarrr mini', mini);
	return (
		<div
			// className={`sm:none ${
			// 	mini === false ? 'w-[285px]' : mini === true && hovered === true ? 'w-[285px]' : 'w-[285px] xl:!w-[130px]'
			// } duration-175 linear fixed !z-50 min-h-full transition-all md:!z-50 lg:!z-50 xl:!z-0 xl:block ${
			// 	mini ? `` : `sm-max:hidden sm:hidden`
			// } ${open ? '' : '-translate-x-[105%]'}`}

			className={`${
				mini === false ? 'w-[285px]' : 'w-[285px] xl:!w-[120px]'
			} duration-175 linear fixed !z-50 min-h-full transition-all md:!z-50 lg:!z-50 xl:!z-0 xl:block ${
				mini ? `` : `sm-max:hidden sm:hidden`
			} ${open ? '' : '-translate-x-[105%]'}`}

			// className={`sm:none ${
			// 	mini === false ? 'w-[285px]' : mini === true && hovered === true ? 'w-[285px]' : 'w-[285px] xl:!w-[120px]'
			// } duration-175 linear fixed !z-50 min-h-full transition-all md:!z-50 lg:!z-50 xl:!z-0  ${open ? '' : '-translate-x-[105%]'}`}
			// onMouseEnter={() => setHovered(true)}
			// onMouseLeave={() => setHovered(false)}
		>
			<Card extra={`ml-3 w-full h-[96.5vh] sm:mr-4 sm:my-4 m-7 !rounded-[20px]`}>
				<Scrollbars
					autoHide
					renderTrackVertical={renderTrack}
					renderThumbVertical={renderThumb}
					renderView={mini === false ? renderView : mini === true && hovered === true ? renderView : renderViewMini}
				>
					<div className='flex h-full flex-col justify-between '>
						<div>
							<div className={`mt-[30px] flex justify-around items-center `}>
								<div className='flex'>
									<div
										className={`font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white  ${
											mini === false ? 'block' : mini === true && hovered === true ? 'block' : 'hidden'
										}`}
									>
										<img src={insightsImg} width={170} />
									</div>
									<div
										className={`font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white ${
											mini === false ? 'hidden' : mini === true && hovered === true ? 'hidden' : 'block'
										}`}
									>
										<img src={insightsIcon} width={30} />
									</div>
								</div>
								{/* open and close sidebar */}
								{open ? (
									mini ? (
										<PanelRightClose className='cursor-pointer' onClick={() => handleOpenAndCloseSideBar()} />
									) : (
										<PanelRightOpen className='cursor-pointer' onClick={() => handleOpenAndCloseSideBar()} />
									)
								) : (
									''
								)}
							</div>
							<div className='mb-7 mt-[30px] h-px bg-gray-200 dark:bg-white/10' />
							{/* Nav item */}
							<ul>
								<Links mini={mini} hovered={hovered} routes={RoutesByRole()} />
							</ul>
						</div>
						{/* Free Horizon Card    */}
						<div className='mb-[30px] mt-[28px]'>
							{/* <div className="flex justify-center">
									<SidebarCard mini={mini} hovered={hovered} />
								</div> */}
							{/* Sidebar profile info */}
							{/* <div className='mt-5 flex items-center justify-center gap-3'>
								<div className='h-12 w-12 rounded-full bg-blue-200'>
									<img src={avatar4} className='rounded-full' alt='avatar' />
								</div>
								<div className={`ml-1 ${mini === false ? 'block' : mini === true && hovered === true ? 'block' : 'block xl:hidden'}`}>
									<h4 className='text-base font-bold text-navy-700 dark:text-white'>Adela Parkson</h4>
									<p className='text-sm font-medium text-gray-600'>Product Designer</p>
								</div>
							</div> */}
						</div>
					</div>
				</Scrollbars>
			</Card>
		</div>
	);
}

export default SidebarHorizon;
