import { Headset } from 'lucide-react';
import React, { FC } from 'react';

interface VStatisticsCardProps {
	items: Array<any>;
}

interface Statistic {
	name: string | number;
}

const VStatisticsCard: FC<VStatisticsCardProps> = ({ items }) => {
	return (
		<div className='mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6'>
			{items?.map((item: any, index: number) => (
				<div
					key={index}
					className='relative flex rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none !flex-row flex-grow items-center transform transition-transform duration-500 hover:translate-y-[-5px] hover:shadow-[0_0_40px_rgba(8,21,66,0.05)] '
				>
					<div className='ml-[18px] flex h-[90px] w-auto flex-row items-center'>
						<div className='rounded-full bg-lightPrimary p-3 dark:bg-navy-700'>
							<span className='flex items-center text-brand-500 dark:text-white'>
								<svg
									stroke='currentColor'
									fill='currentColor'
									stroke-width='0'
									viewBox='0 0 24 24'
									className='h-7 w-7'
									height='1em'
									width='1em'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path fill='none' d='M0 0h24v24H0z'></path>
									<path d='M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z'></path>
								</svg>
								{/* <Headset className='font-bold ' /> */}
							</span>
						</div>
					</div>
					<div className='h-50 ml-4 flex w-auto flex-col justify-center'>
						<p className='font-dm text-sm font-medium text-gray-600'>{item?.name}</p>
						<h4 className='text-xl font-bold text-navy-700 dark:text-white'>{item?.value}</h4>
					</div>
				</div>
			))}
		</div>
	);
};

export default VStatisticsCard;
