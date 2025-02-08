import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const AccountInforationSkeleton = () => {
	return (
		<div className='col-span-1 md:col-span-1 sm:col-span-2 sm-max:col-span-2 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white '>
			<Skeleton className='h-[300px] rounded-xl bg-[#E9EDF5]' />
		</div>
	);
};

export default AccountInforationSkeleton;
