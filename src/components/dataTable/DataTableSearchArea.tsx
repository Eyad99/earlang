import { FC } from 'react';
import { SelectArray, SelectOption, SelectType, TableActions } from '@/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import TextField from '../reusable/fields/TextField';

interface DataTableSearchAreaProps {
	data: { searchQuery: string; selectArray?: SelectArray; actions: TableActions; filterByDate?: boolean };
	handlers: {
		handleSearch: (text: string) => void;
		handleFilter: (data: SelectType) => void;
		handleFiterByDate: (data: Date) => void;
	};
}
const DataTableSearchArea: FC<DataTableSearchAreaProps> = ({ data, handlers }) => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<header className='flex flex-col flex-wrap items-center justify-end gap-2 pt-6 sm:flex-row'>
			{/* <div className='flex w-[400px] max-w-full items-center rounded-xl'>
				<div className='flex h-[38px] w-[400px] flex-grow items-center rounded-xl bg-lightPrimary text-sm text-gray-600 dark:!bg-navy-900 dark:text-white'>
					<Search />
					<input
						onChange={(event) => handlers.handleSearch(event.target.value)}
						type='text'
						placeholder='Search....'
						className='block w-full rounded-full bg-lightPrimary text-base text-navy-700 outline-none dark:!bg-navy-900 dark:text-white'
					/>
				</div>
			</div> */}

			<div className='flex flex-wrap gap-2'>
				{/* select */}
				{data?.selectArray && (
					<div className='flex flex-wrap gap-2'>
						{Object.entries(data.selectArray).map(([_, selectObj], indKey) =>
							Object.entries(selectObj).map(([innerKey, selectValues]: any, innerIndKey) => {
								return (
									<div
										key={`${indKey}-${innerIndKey}`}
										className='w-full rounded-xl border !border-gray-200 px-3 text-sm font-medium text-gray-600 outline-none dark:!border-none dark:!bg-navy-700 sm:w-full md:w-fit'
									>
										<select
											className='h-[45px] w-full rounded-xl text-sm font-medium text-gray-600 outline-none dark:!bg-navy-700 md:w-fit md:pr-8 xl:pr-20'
											name={innerKey}
											id={innerKey}
											onChange={(e) => {
												handlers.handleFilter({
													queryParamName: innerKey,
													value: e.target.value,
												});
											}}
										>
											{selectValues.map((selectValue: SelectOption) => (
												<option key={selectValue.id} value={selectValue.id}>
													{selectValue.name}
												</option>
											))}
										</select>
									</div>
								);
							})
						)}
					</div>
				)}

				{data.actions?.add && (
					<div className='flex items-center justify-end rounded-xl'>
						<Button variant={'blue'} onClick={() => navigate(`${location.pathname}/add`)}>
							Add
						</Button>
					</div>
				)}

				{data?.filterByDate && (
					<TextField name='date' type='date' placeholder='date' onChange={(event: any) => handlers.handleFiterByDate(event.target.value)} />
				)}
			</div>
		</header>
	);
};

export default DataTableSearchArea;
