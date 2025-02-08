// import { DEFAULT_DATE } from '@/variables/constants';
// import { DataTableProps } from '@/core';
// import { FC } from 'react';
// import DataTable from '@/components/dataTable/DataTable';
// import moment from 'moment';

// interface ChartListerProps {
// 	fileId: string | undefined;
// }

// const ChartLister: FC<ChartListerProps> = ({ fileId }) => {
// 	const roundedNumber = (number: number, decimalPlaces: number) => {
// 		return parseFloat(number.toFixed(decimalPlaces));
// 	};
// 	const tableProps: DataTableProps = {
// 		fetchUrl: `api/get_erlangc_xls/${fileId}`,
// 		queryKey: `file-report-${fileId}`,
// 		cardClassName: 'max-h-[450px] no-scrollbar-y ',
// 		columns: [
// 			{
// 				header: 'Datecalavg',
// 				accessor: 'datecalavg',
// 				formatter: (value: any) => moment(value).format(DEFAULT_DATE),
// 			},
// 			{ header: 'From Time', accessor: 'from_time' },
// 			{ header: 'To Time', accessor: 'to_time' },
// 			{ header: 'Total Offered', accessor: 'totall_Offered' },
// 			{ header: 'Total Answered', accessor: 'totall_answered' },
// 			{ header: 'Total Abandoned', accessor: 'totall_abandoned' },
// 			{ header: 'Sl Xpercentage', accessor: 'sl_xpercentage', formatter: (value: any) => roundedNumber(value, 0) },
// 			{ header: 'Sl xseconds', accessor: 'sl_xseconds' },
// 			{ header: 'Callavg Talk Time', accessor: 'callavg_talk_time' },
// 			{ header: 'Callavg After Call Work', accessor: 'callavg_after_call_work' },
// 			{ header: 'Callavg Abandom', accessor: 'callavg_abandom' },
// 			{ header: 'Aggent Scheduled', accessor: 'aggent_scheduled' },
// 			{ header: 'Aggent Logged_in', accessor: 'aggent_logged_in' },
// 			{ header: 'Aggent Available', accessor: 'aggent_available' },
// 			{ header: 'Agents', accessor: 'agents' },
// 			{ header: 'Service Level', accessor: 'sl', formatter: (value: any) => roundedNumber(value * 100, 2) + ' %' },
// 			{ header: 'Service Level Target', accessor: 'sl_target', formatter: (value: any) => roundedNumber(value * 100, 2) + ' %' },
// 			{ header: 'Asa', accessor: 'asa' },
// 			{ header: 'Imm Answ', accessor: 'imm_answ' },
// 			{ header: 'Pw', accessor: 'pw', formatter: (value: any) => roundedNumber(value * 100, 2) + ' %' },
// 			{ header: 'Occ', accessor: 'occ', formatter: (value: any) => roundedNumber(value * 100, 2) + ' %' },
// 			{ header: 'Max Call', accessor: 'max_call' },
// 		],
// 	};
// 	return (
// 		<div className='mt-5 grid h-full grid-cols-1 gap-5  md:grid-cols-1  '>
// 			<DataTable {...tableProps} />
// 		</div>
// 	);
// };

// export default ChartLister;

// import React, { CSSProperties } from 'react';
// import ReactDOM from 'react-dom/client';

// import './index.css';

// import { Column, ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
// import { makeData } from './makeData';

// const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
// 	const isPinned = column.getIsPinned();
// 	const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left');
// 	const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right');

// 	return {
// 		boxShadow: isLastLeftPinnedColumn ? '-4px 0 4px -4px gray inset' : isFirstRightPinnedColumn ? '4px 0 4px -4px gray inset' : undefined,
// 		left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
// 		right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
// 		opacity: isPinned ? 0.95 : 1,
// 		position: isPinned ? 'sticky' : 'relative',
// 		width: column.getSize(),
// 		zIndex: isPinned ? 1 : 0,
// 	};
// };

// const defaultColumns: ColumnDef<any>[] = [
// 	{
// 		accessorKey: 'firstName',
// 		id: 'firstName',
// 		header: 'First Name',
// 		cell: (info) => info.getValue(),
// 		footer: (props) => props.column.id,
// 		size: 180,
// 	},
// 	{
// 		accessorFn: (row) => row.lastName,
// 		id: 'lastName',
// 		cell: (info) => info.getValue(),
// 		header: () => <span>Last Name</span>,
// 		footer: (props) => props.column.id,
// 		size: 180,
// 	},
// 	{
// 		accessorKey: 'age',
// 		id: 'age',
// 		header: 'Age',
// 		footer: (props) => props.column.id,
// 		size: 180,
// 	},
// 	{
// 		accessorKey: 'visits',
// 		id: 'visits',
// 		header: 'Visits',
// 		footer: (props) => props.column.id,
// 		size: 180,
// 	},
// 	{
// 		accessorKey: 'status',
// 		id: 'status',
// 		header: 'Status',
// 		footer: (props) => props.column.id,
// 		size: 180,
// 	},
// 	{
// 		accessorKey: 'progress',
// 		id: 'progress',
// 		header: 'Profile Progress',
// 		footer: (props) => props.column.id,
// 		size: 180,
// 	},
// ];

// function App() {
// 	const [data, setData] = React.useState(() => makeData(30));
// 	const [columns] = React.useState(() => [...defaultColumns]);

// 	const table = useReactTable({
// 		data,
// 		columns,
// 		getCoreRowModel: getCoreRowModel(),
// 		debugTable: true,
// 		debugHeaders: true,
// 		debugColumns: true,
// 		columnResizeMode: 'onChange',
// 	});

// 	return (
// 		<div className='p-2'>
// 			<div className='inline-block border border-black shadow rounded'>
// 				{table.getAllLeafColumns().map((column) => {
// 					return (
// 						<div key={column.id} className='px-1'>
// 							<label>
// 								<input
// 									{...{
// 										type: 'checkbox',
// 										checked: column.getIsVisible(),
// 										onChange: column.getToggleVisibilityHandler(),
// 									}}
// 								/>{' '}
// 								{column.id}
// 							</label>
// 						</div>
// 					);
// 				})}
// 			</div>

// 			<div className='table-container'>
// 				<table
// 					style={{
// 						width: table.getTotalSize(),
// 					}}
// 				>
// 					<thead>
// 						{table.getHeaderGroups().map((headerGroup) => (
// 							<tr key={headerGroup.id}>
// 								{headerGroup.headers.map((header) => {
// 									const { column } = header;

// 									return (
// 										<th
// 											key={header.id}
// 											colSpan={header.colSpan}
// 											//IMPORTANT: This is where the magic happens!
// 											style={{ ...getCommonPinningStyles(column) }}
// 										>
// 											<div className='whitespace-nowrap'>
// 												{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}{' '}
// 												{/* Demo getIndex behavior */}
// 												{column.getIndex(column.getIsPinned() || 'center')}
// 											</div>
// 											{!header.isPlaceholder && header.column.getCanPin() && (
// 												<div className='flex gap-1 justify-center'>
// 													{header.column.getIsPinned() !== 'left' ? (
// 														<button
// 															className='border rounded px-2'
// 															onClick={() => {
// 																header.column.pin('left');
// 															}}
// 														>
// 															{'<='}
// 														</button>
// 													) : null}
// 													{header.column.getIsPinned() ? (
// 														<button
// 															className='border rounded px-2'
// 															onClick={() => {
// 																header.column.pin(false);
// 															}}
// 														>
// 															X
// 														</button>
// 													) : null}
// 													{header.column.getIsPinned() !== 'right' ? (
// 														<button
// 															className='border rounded px-2'
// 															onClick={() => {
// 																header.column.pin('right');
// 															}}
// 														>
// 															{'=>'}
// 														</button>
// 													) : null}
// 												</div>
// 											)}
// 											<div
// 												{...{
// 													onDoubleClick: () => header.column.resetSize(),
// 													onMouseDown: header.getResizeHandler(),
// 													onTouchStart: header.getResizeHandler(),
// 													className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`,
// 												}}
// 											/>
// 										</th>
// 									);
// 								})}
// 							</tr>
// 						))}
// 					</thead>
// 					<tbody>
// 						{table.getRowModel().rows.map((row) => (
// 							<tr key={row.id}>
// 								{row.getVisibleCells().map((cell) => {
// 									const { column } = cell;
// 									return (
// 										<td
// 											key={cell.id}
// 											//IMPORTANT: This is where the magic happens!
// 											style={{ ...getCommonPinningStyles(column) }}
// 										>
// 											{flexRender(cell.column.columnDef.cell, cell.getContext())}
// 										</td>
// 									);
// 								})}
// 							</tr>
// 						))}
// 					</tbody>
// 				</table>
// 			</div>
// 			<pre>{JSON.stringify(table.getState().columnPinning, null, 2)}</pre>
// 		</div>
// 	);
// }
