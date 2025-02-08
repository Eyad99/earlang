import { Skeleton } from '@/components/ui/skeleton';

const TableSkeleton = () => {
	return (
		<div className='overflow-x-auto'>
			<table className='min-w-full divide-y divide-gray-200'>
				<thead className='bg-gray-50'>
					<tr>
						{Array.from({ length: 5 }).map((_, index) => (
							<th key={index} className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								<Skeleton className='h-4 w-32' />
							</th>
						))}
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					{Array.from({ length: 5 }).map((_, rowIndex) => (
						<tr key={rowIndex}>
							{Array.from({ length: 5 }).map((_, colIndex) => (
								<td key={colIndex} className='px-6 py-4 whitespace-nowrap'>
									<Skeleton className='h-4 w-full' />
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TableSkeleton;
