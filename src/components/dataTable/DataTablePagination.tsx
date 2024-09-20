import React, { FC } from 'react';

interface DataTablePaginationProps {
	handleChangePage: (page: number) => void;
	page: number;
	count: number;
}

//TODO:add pagination from shadcn
const DataTablePagination: FC<DataTablePaginationProps> = ({ handleChangePage, page, count }) => {
	return (
		<div className='mt-2 flex h-20 w-full items-center justify-end px-6'>
			<div className='flex items-center gap-2'>
				<button
					onClick={() => handleChangePage(page - 1)}
					disabled={page == 1}
					className={`linear flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 p-2 text-lg text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200`}
				>
					Left{' '}
				</button>

				{Array(count)
					.fill(null)
					.map((_, index) => {
						const pageNumber = index + 1;

						return (
							<button
								className={`linear flex h-10 w-10 items-center justify-center rounded-full p-2 text-sm transition duration-200 ${
									pageNumber === page
										? 'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'
										: 'border-[1px] border-gray-400 bg-[transparent] dark:border-white dark:text-white'
								}`}
								onClick={() => handleChangePage(pageNumber)}
								key={pageNumber}
							>
								{pageNumber}
							</button>
						);
					})}

				<button
					onClick={() => handleChangePage(page + 1)}
					disabled={page == count}
					className={`linear flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 p-2 text-lg text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 `}
				>
					Right{' '}
				</button>
			</div>
		</div>
	);
};

export default DataTablePagination;
