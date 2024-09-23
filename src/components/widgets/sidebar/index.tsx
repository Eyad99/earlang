import Links from './components/Links';

import { renderThumb, renderTrack, renderView, renderViewMini } from '@/components/reusable/scrollbar/Scrollbar';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Card from '@/components/reusable/card';
import { RoutesByRole } from '@/utils';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';

function SidebarHorizon(props: { open: boolean; onClose: React.MouseEventHandler<HTMLSpanElement>; variant?: string; [x: string]: any }) {
	const { open, onClose, variant, setMini, mini, hovered = true, setHovered } = props;
	console.log('ssssss m', mini);
	return (
		<div
			className={`sm:none ${
				mini === false ? 'w-[285px]' : mini === true && hovered === true ? 'w-[285px]' : 'w-[285px] xl:!w-[120px]'
			} duration-175 linear fixed !z-50 min-h-full transition-all md:!z-50 lg:!z-50 xl:!z-0 xl:block ${
				mini ? `` : `sm-max:hidden sm:hidden`
			} ${open ? '' : '-translate-x-[105%]'}`}
			// className={`sm:none ${
			// 	mini === false ? 'w-[285px]' : mini === true && hovered === true ? 'w-[285px]' : 'w-[285px] xl:!w-[120px]'
			// } duration-175 linear fixed !z-50 min-h-full transition-all md:!z-50 lg:!z-50 xl:!z-0 ${
			// 	variant === 'auth' ? 'xl:hidden' : 'xl:block'
			// } ${open ? '' : '-translate-x-[105%]'}`}
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
					<div className='flex h-full flex-col justify-between'>
						<div>
							{/* <span className='absolute right-4 top-4 block cursor-pointer xl:hidden' onClick={onClose}>
								close sidebar
							</span> */}
							<div className={`mt-[44px] flex justify-around items-center`}>
								<div className='flex'>
									<div
										className={`font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white ${
											mini === false ? 'block' : mini === true && hovered === true ? 'block' : 'hidden'
										}`}
									>
										Erlang
									</div>
									<div
										className={`font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white ${
											mini === false ? 'hidden' : mini === true && hovered === true ? 'hidden' : 'block'
										}`}
									>
										E
									</div>
								</div>
								{/* open and close sidebar */}
								{mini ? (
									<PanelRightClose className='cursor-pointer' onClick={() => props.setMini(!props.mini)} />
								) : (
									<PanelRightOpen className='cursor-pointer' onClick={() => props.setMini(!props.mini)} />
								)}
							</div>

							<div className='mb-7 mt-[44px] h-px bg-gray-200 dark:bg-white/10' />

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
