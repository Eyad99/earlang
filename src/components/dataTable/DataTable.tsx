import React, { useState } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, createColumnHelper } from '@tanstack/react-table';
import { DataTableProps, SelectType } from '@/core';
import { GenerateInitialState } from './utils/generateInitialState';
import { useDataTableFetch } from '@/hooks/dataTable/useDataTableFetch';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { toast } from 'react-toastify';
import DataTablePagination from './DataTablePagination';
import DataTableSearchArea from './DataTableSearchArea';
import Card from '../reusable/card';

// export const DataTable: <T>(p: DataTableProps<T>) => React.ReactElement<DataTableProps<T>> = ({
export const DataTable: (p: DataTableProps) => React.ReactElement<DataTableProps> = ({
	fetchUrl,
	queryKey,
	columns,
	actions = {}, // default value if don't pass actions
	selectArray,
	searchKey = 'search',
	// filterByDate,
}) => {
	const columnHelper = createColumnHelper();

	const navigate = useNavigate();

	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [searchQuery, setSearchQuery] = useState('');
	const [dateQuery, setDateQuery] = useState<Date>();
	const [timeout, setT] = useState<any>(null);
	const [filterQuery, setFilterQuery] = useState<any>(selectArray ? GenerateInitialState(selectArray) : {});

	/* - - - - - - - - Query - - - - - - - - */
	const { data, isPending, isLoading, isFetching, isError, error } = useDataTableFetch({
		queryKey,
		url: fetchUrl,
		page,
		search: searchQuery,
		filter: filterQuery,
		filterByDate: dateQuery,
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
			// cell: (info) => <p className='text-[14px] text-navy-700 dark:text-white'>{info.getValue() as any}</p>,
			cell: (info) => {
				const value = info.getValue() as any;
				const formattedValue = column.formatter ? column.formatter(value) : value;

				return <p className='text-[14px] text-navy-700 dark:text-white'>{formattedValue}</p>;
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
								variant={'default'}
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

	const table = useReactTable({
		data: data,
		columns: mappedColumns.concat(actionColumn) as any,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true,
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
	const handleFiterByDate = (date: Date) => {
		setDateQuery(date);
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

	if (isLoading) return <>Loading...</>;
	if (isError)
		return (
			<div>
				{toast.error('An unexpected serror occurred')}
				<span className='flex justify-center text-center text-xl font-bold'>An unexpected error occurred</span>
			</div>
		);

	return (
		<Card extra={'w-full h-full sm:overflow-auto px-6 '}>
			{/* - - - - - - - - Search Area - - - - - - - - */}
			<DataTableSearchArea
				data={{
					searchQuery,
					selectArray,
					actions,
					//  filterByDate
				}}
				handlers={{ handleSearch, handleFilter, handleFiterByDate }}
			/>

			{/* - - - - - - - - Table Container - - - - - - - - */}
			<div className=' overflow-x-auto'>
				{/* - - - - - - - - Table - - - - - - - - */}
				<table className='w-full'>
					{/* - - - - - - - - THead - - - - - - - - */}
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className='!border-px !border-gray-400'>
								{headerGroup.headers.map((header) => {
									return (
										<th
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
										</th>
									);
								})}
							</tr>
						))}
					</thead>
					{/* - - - - - - - - TBody - - - - - - - - */}
					<tbody>
						{table.getRowModel().rows?.length == 0 ? (
							<tr key={`emptyRow`}>
								<td
									key={'1'}
									colSpan={table.getHeaderGroups()?.map((el) => el.headers?.length)[0]}
									className='w-full border-white/0 py-3 pr-4  text-center'
								>
									No Data
								</td>
							</tr>
						) : (
							table.getRowModel().rows.map((row) => {
								return (
									<tr key={row.id}>
										{row.getVisibleCells().map((cell) => {
											return (
												<td key={cell.id} className='min-w-[150px] border-white/0 py-3  pr-4'>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</td>
											);
										})}
									</tr>
								);
							})
						)}
					</tbody>
				</table>

				{/* - - - - - - - - Table Pagingation - - - - - - - - */}
				{/* {totalPages !== 0 && <DataTablePagination handleChangePage={handleChangePage} page={page} count={totalPages} />} */}
			</div>
		</Card>
	);
};

export default DataTable;
