import { Skeleton } from '@/components/ui/skeleton';
import { FC } from 'react';

{
	/* ECEFF4 */
}

interface StatissticsCardSkeletonProps {
	numberCell?: number;
}
const StatissticsCardSkeleton: FC<StatissticsCardSkeletonProps> = ({ numberCell = 6 }) => {
	return (
		<div className='mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6 '>
			{new Array(numberCell).fill(null).map((__: null, index: number) => (
				<div className='rounded-[20px] shadow-shadow-500 dark:!bg-navy-800' key={index}>
					<Skeleton className='h-[90px] rounded-xl bg-[#E9EDF5]' />
				</div>
			))}
		</div>
	);
};

export default StatissticsCardSkeleton;
