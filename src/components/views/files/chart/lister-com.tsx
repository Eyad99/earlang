// import Card from '@/components/reusable/card';
// import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
// import React, { FC } from 'react';

// interface listerCom {
// 	data: any;
// 	columns: any;
// }

// const listerCom: FC<listerCom> = ({ data }) => {
// 	const table = useReactTable({
// 		data: data,
// 		columns: mappedColumns.concat(actionColumn) as any,
// 		getCoreRowModel: getCoreRowModel(),
// 		getSortedRowModel: getSortedRowModel(),
// 		debugTable: true,
// 	});
// 	return (
// 		<Card extra={'w-full h-full sm:overflow-auto px-6 '}>
// 			<div className=' overflow-x-auto'>
// 				<table className='w-full'>
// 					<thead>
// 						{table.getHeaderGroups().map((headerGroup) => (
// 							<tr key={headerGroup.id} className='!border-px !border-gray-400'>
// 								{headerGroup.headers.map((header) => {
// 									return (
// 										<th
// 											key={header.id}
// 											colSpan={header.colSpan}
// 											onClick={header.column.getToggleSortingHandler()}
// 											className='cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start'
// 										>
// 											<div className='items-center justify-between text-xs text-gray-200'>
// 												{flexRender(header.column.columnDef.header, header.getContext())}
// 												{{
// 													asc: '',
// 													desc: '',
// 												}[header.column.getIsSorted() as string] ?? null}
// 											</div>
// 										</th>
// 									);
// 								})}
// 							</tr>
// 						))}
// 					</thead>
// 					<tbody>
// 						{table.getRowModel().rows?.length == 0 ? (
// 							<tr key={`emptyRow`}>
// 								<td
// 									key={'1'}
// 									colSpan={table.getHeaderGroups()?.map((el) => el.headers?.length)[0]}
// 									className='w-full border-white/0 py-3 pr-4  text-center'
// 								>
// 									No Data
// 								</td>
// 							</tr>
// 						) : (
// 							table.getRowModel().rows.map((row) => {
// 								return (
// 									<tr key={row.id}>
// 										{row.getVisibleCells().map((cell) => {
// 											return (
// 												<td key={cell.id} className='min-w-[150px] border-white/0 py-3  pr-4'>
// 													{flexRender(cell.column.columnDef.cell, cell.getContext())}
// 												</td>
// 											);
// 										})}
// 									</tr>
// 								);
// 							})
// 						)}
// 					</tbody>
// 				</table>
// 			</div>
// 		</Card>
// 	);
// };

// export default listerCom;
