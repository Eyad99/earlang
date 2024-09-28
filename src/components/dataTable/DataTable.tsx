import React, { useState } from 'react';
import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	flexRender,
	createColumnHelper,
	getFilteredRowModel,
} from '@tanstack/react-table';
import { DataTableProps, SelectType } from '@/core';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { GenerateInitialState } from './utils/generateInitialState';
import { useDataTableFetch } from '@/hooks/dataTable/useDataTableFetch';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { toast } from 'react-toastify';
import DataTablePagination from './DataTablePagination';
import DataTableSearchArea from './DataTableSearchArea';
import Card from '../reusable/card';
import withLoading from '@/hooks/withLoader';
import TableSkeleton from '@/utils/skeletons/table-skeleton';
import moment from 'moment';
import { DEFAULT_DATE } from '@/variables/constants';

const BoxWithLoading = withLoading(Card);

// export const DataTable: <T>(p: DataTableProps<T>) => React.ReactElement<DataTableProps<T>> = ({
export const DataTable: (p: DataTableProps) => React.ReactElement<DataTableProps> = ({
	fetchUrl,
	queryKey,
	columns,
	actions = {}, // default value if don't pass actions
	selectArray,
	searchKey = 'search',
	filterByDate,
	cardClassName,
}) => {
	const columnHelper = createColumnHelper();

	const navigate = useNavigate();

	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [searchQuery, setSearchQuery] = useState('');
	// const [dateQuery, setDateQuery] = useState<Date>();
	const [timeout, setT] = useState<any>(null);
	const [filterQuery, setFilterQuery] = useState<any>(selectArray ? GenerateInitialState(selectArray) : {});

	const [dateQuery, setDateQuery] = useState<{ start_date: Date | null; end_date: Date | null }>({
		start_date: null,
		end_date: null,
	});
	/* - - - - - - - - Query - - - - - - - - */
	const { data, isPending, isLoading, isFetching, isError, error } = useDataTableFetch({
		queryKey,
		url: fetchUrl,
		page,
		search: searchQuery,
		filter: filterQuery,
		// filterByDate: dateQuery,
		setTotalPages,
		setPage,
		searchKey,
	});

	/* - - - - - - - - useReactTable - - - - - - - - */

	// Map columns from props to column definitions for useReactTable
	const mappedColumns = columns.map((column) => {
		return columnHelper.accessor(column.accessor, {
			id: column.accessor,
			header: () => <p className='text-sm font-bold text-gray-600 dark:text-white'>{column.header}</p>,
			cell: (info) => {
				const value = info.getValue() as any;
				const formattedValue = column.formatter ? column.formatter(value) : value;

				return <p className='text-[14px] text-navy-700 dark:text-white '>{formattedValue}</p>;
			},
		});
	});

	const actionColumn = Object.keys(actions)?.filter((el) => el !== 'add').length
		? columnHelper.accessor('actions', {
				id: 'actions',
				header: () => <></>,
				cell: (info: any) => (
					<div className='flex gap-2'>
						{actions?.edit && (
							<Button
								variant={'blueOutline'}
								size={'sm'}
								onClick={() => {
									navigate(`${location.pathname}/${info?.row?.original?.id}`);
								}}
							>
								{actions?.edit?.text ?? 'Edit'}
							</Button>
						)}

						{actions?.custom && actions?.custom?.component(info)}
					</div>
				),
		  })
		: ([] as any);

	// Filtering function based on start and end date
	// const filterByDate1 = (row: any, columnId: string, filterValue: any) => {
	// 	const { start_date, end_date } = dateQuery;

	// 	const rowDate = new Date(row.original.created_at); // Ensure this is the correct date field in your row data
	// 	const startDate = start_date ? new Date(start_date.setHours(0, 0, 0, 0)) : null;
	// 	const endDate = end_date ? new Date(end_date.setHours(23, 59, 59, 999)) : null;

	// 	console.log('Row date:', rowDate);
	// 	console.log('Start date:', startDate);
	// 	console.log('End date:', endDate);

	// 	// // If only start_date is provided, return rows that match the exact start_date
	// 	// if (startDate && !endDate) {
	// 	// 	return rowDate.toDateString() === startDate.toDateString();
	// 	// }

	// 	// // If both start_date and end_date are provided, return rows between the two dates
	// 	// if (startDate && endDate) {
	// 	// 	return rowDate >= startDate && rowDate <= endDate;
	// 	// }

	// 	// // If no valid date filter is applied, return true (include all rows)
	// 	// return true;
	// };

	const table = useReactTable({
		data: data,
		columns: mappedColumns.concat(actionColumn) as any,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		// getFilteredRowModel: getFilteredRowModel(),
		// state: {
		// 	globalFilter: dateQuery,
		// },
		// globalFilterFn: filterByDate1 as any,
		debugTable: false,
	});

	/* - - - - - - - - Handlers - - - - - - - - */
	const handleChangePage = (page: number) => {
		setPage(page);
	};

	// - - - Search - - -
	const handleSearch = (q: string) => {
		if (timeout) clearTimeout(timeout);
		setT(
			setTimeout(() => {
				setPage(1);
				setSearchQuery(q.trim());
			}, 500)
		);
	};

	// - - - Date [In the future, merge it with the filter and specify the type of filter before sending it to distinguish if it is a select, date or name ] - - -

	const handleFilterByDate = (name: string, date: Date) => {
		setDateQuery((prevDate) => ({
			...prevDate,
			[name]: date,
		}));
	};

	const handleFilterByDate1 = (name: string, date: Date) => {
		setDateQuery((prevDate) => ({
			...prevDate,
			[name]: date,
		}));
	};

	// - - - Filter - - -
	const handleFilter = (data: SelectType) => {
		setPage(1);
		setFilterQuery({
			...filterQuery,
			[data.queryParamName]: {
				queryParamName: data.queryParamName,
				value: data.value,
			},
		});
	};

	if (isLoading) return <TableSkeleton />;
	if (isError) {
		return (
			<div>
				{toast.error('An unexpected serror occurred')}
				<span className='flex justify-center text-center text-xl font-bold'>An unexpected error occurred</span>
			</div>
		);
	}

	return (
		<BoxWithLoading loading={false}>
			<Card extra={`w-full h-full sm:overflow-auto px-6  ${cardClassName} `}>
				{/* - - - - - - - - Search Area - - - - - - - - */}
				<DataTableSearchArea
					data={{
						searchQuery,
						selectArray,
						actions,
						filterByDate,
					}}
					handlers={{ handleSearch, handleFilter, handleFilterByDate, handleFilterByDate1 }}
				/>

				{/* - - - - - - - - Table - - - - - - - - */}
				<Table className={' overflow-auto'}>
					{/* - - - - - - - - THead - - - - - - - - */}
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
											onClick={header.column.getToggleSortingHandler()}
											className='cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start'
										>
											<div className='items-center justify-between text-xs text-gray-200'>
												{flexRender(header.column.columnDef.header, header.getContext())}
												{{
													asc: '',
													desc: '',
												}[header.column.getIsSorted() as string] ?? null}
											</div>
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>

					{/* - - - - - - - - TBody - - - - - - - - */}
					<TableBody>
						{table.getRowModel().rows?.length == 0 ? (
							<TableRow key={`emptyRow`}>
								<TableCell
									key={'1'}
									colSpan={table.getHeaderGroups()?.map((el) => el.headers?.length)[0]}
									className='w-full border-white/0 py-3 pr-4  text-center'
								>
									No Data
								</TableCell>
							</TableRow>
						) : (
							table.getRowModel().rows.map((row) => {
								return (
									<TableRow key={row.id}>
										{row.getVisibleCells().map((cell) => {
											return (
												<TableCell key={cell.id} className={`min-w-[150px] border-white/0 py-3 pr-4 ${''}`}>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})
						)}
					</TableBody>
				</Table>

				{/* - - - - - - - - Table Pagingation - - - - - - - - */}
				{/* {totalPages !== 0 && <DataTablePagination handleChangePage={handleChangePage} page={page} count={totalPages} />} */}
			</Card>
		</BoxWithLoading>
	);
};

export default DataTable;
