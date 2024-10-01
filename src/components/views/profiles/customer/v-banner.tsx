import Card from '@/components/reusable/card';
import avatar from '@/assets/img/avatars/avatar.png';
import banner from '@/assets/img/others/banner.png';
import { FC } from 'react';

interface VBannerProps {
	user: any;
}
const VBanner: FC<VBannerProps> = ({ user }) => {
	return (
		<Card extra={'items-center w-full h-full p-[16px] bg-cover'}>
			{/* Background and profile */}
			<div className='relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover' style={{ backgroundImage: `url(${banner})` }}>
				<div className='absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700'>
					<img className='h-full w-full rounded-full' src={avatar} alt='' />
				</div>
			</div>

			{/* Name and position */}
			<div className='mt-16 flex flex-col items-center'>
				<h4 className='text-xl font-bold text-navy-700 dark:text-white'>{user?.fullname}</h4>
				<h5 className='text-base font-normal text-gray-600'>{user?.role}</h5>
			</div>

			{/* Post followers */}
			<div className='mt-6 mb-3 flex gap-4 md:!gap-14'>
				<div className='flex flex-col items-center justify-center'>
					<h4 className='text-2xl font-bold text-navy-700 dark:text-white'>17</h4>
					<p className='text-sm font-normal text-gray-600'>Staffs</p>
				</div>
				<div className='flex flex-col items-center justify-center'>
					<h4 className='text-2xl font-bold text-navy-700 dark:text-white'>2K</h4>
					<p className='text-sm font-normal text-gray-600'>Files Uploaded</p>
				</div>
				<div className='flex flex-col items-center justify-center'>
					<h4 className='text-2xl font-bold text-navy-700 dark:text-white'>434</h4>
					<p className='text-sm font-normal text-gray-600'>Max Agents</p>
				</div>
			</div>
		</Card>
	);
};

export default VBanner;
