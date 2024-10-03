import Card from '@/components/reusable/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BetweenHorizontalEnd, BetweenHorizontalStart } from 'lucide-react';
import { FC, useState } from 'react';

interface listerCom {
	data: any;
}

const ListerCom: FC<listerCom> = ({ data }) => {
	const [expansionOfColumns, setExpansionOfColumns] = useState(false);

	const roundedNumber = (number: number, decimalPlaces: number) => {
		return parseFloat(number.toFixed(decimalPlaces));
	};

	const shouldShowShrinkage = data[0]?.shrinkage === 0 || data[0]?.shrinkage === null;

	const headers = [
		{ header: 'From Time' },
		{ header: 'To Time' },
		{ header: 'Total Offered' },
		{ header: 'Total Answered' },
		{ header: 'Total Abandoned' },
		{ header: 'Sl Xpercentage' },
		{ header: 'Sl xseconds' },
		{ header: 'Callavg Talk Time' },
		{ header: 'Callavg After Call Work' },
		{ header: 'Callavg Abandom' },
		{ header: 'Aggent Scheduled' },
		{ header: 'Aggent Logged_in' },
		{ header: 'Aggent Available' },
		{ header: 'Agents' },
		{ header: 'Agents With Shrinkage' },
		{ header: 'Shrinkage' },
		{ header: 'Service Level' },
		{ header: 'Service Level Target' },
		{ header: 'Asa' },
		{ header: 'Imm Answ' },
		{ header: 'Pw' },
		{ header: 'Occ' },
		{ header: 'Max Call' },
	];

	const headers1 = [
		{ header: 'From Time' },
		{ header: 'To Time' },
		{ header: 'Agents' },
		{ header: 'Agents With Shrinkage' },
		{ header: 'Shrinkage' },
		{ header: 'Service Level' },
		{ header: 'Service Level Target' },
		{ header: 'Asa' },
		{ header: 'Imm Answ' },
		{ header: 'Pw' },
		{ header: 'Occ' },
		{ header: 'Max Call' },
	];

	const headerFields = ['Agents', 'Agents With Shrinkage', 'Shrinkage', 'Service Level', 'Asa', 'Imm Answ', 'Pw', 'Occ', 'Max Call'];
	const bodyCellCassName = 'min-w-[150px] border-white/0 py-3 pr-4 text-[14px] text-navy-700 dark:text-white text-center';

	const handleExpansionOfColumns = () => setExpansionOfColumns(!expansionOfColumns);
	return (
		<Card extra={'w-full h-full sm:overflow-auto  mt-6 max-h-[450px]'}>
			<Table className={' overflow-auto'}>
				<TableHeader>
					<TableRow key={'header'}>
						{(expansionOfColumns
							? shouldShowShrinkage
								? headers.filter((item) => item.header !== 'Shrinkage')
								: headers
							: shouldShowShrinkage
							? headers1.filter((item) => item.header !== 'Shrinkage')
							: headers1
						)?.map((item) => {
							return (
								<TableHead
									key={item.header}
									className={`text-sm font-bold text-gray-600 dark:text-white pb-2 pr-4 pt-4 text-center ${
										headerFields?.includes(item.header) ? 'bg-gray-100' : ''
									}`}
									style={{
										width: '50px',
										position: ['From Time', 'To Time'].includes(item.header) ? 'sticky' : 'relative',
										left: item.header == 'From Time' ? '0px' : item.header == 'To Time' ? '150px' : '',
										zIndex: ['From Time', 'To Time'].includes(item.header) ? 10 : 1,
										background: ['From Time', 'To Time'].includes(item.header) ? 'white' : '',
									}}
								>
									<span className={item.header.toLowerCase() == 'to time' ? 'relative bottom-1 left-3' : ''}> {item.header}</span>
									{item.header.toLowerCase() == 'to time' && (
										<span className='relative left-[40%] cursor-pointer text-green-400'>
											{!expansionOfColumns ? (
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger>
															<BetweenHorizontalStart onClick={handleExpansionOfColumns} />
														</TooltipTrigger>
														<TooltipContent>
															<p>Preview all columns</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											) : (
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger>
															<BetweenHorizontalEnd onClick={handleExpansionOfColumns} />
														</TooltipTrigger>
														<TooltipContent>
															<p>Preview fewer columns</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											)}
										</span>
									)}
								</TableHead>
							);
						})}
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.length > 0 ? (
						data?.map((row: any, index: number) => (
							<TableRow
								key={index}
								className={`${row.totall_answered === 0 ? 'bg-red-200' : row.totall_Offered === 0 ? 'bg-yellow-200' : ''}`}
							>
								<TableCell
									className={`${bodyCellCassName}`}
									style={{ width: '50px', position: 'sticky', left: '0px', zIndex: 10, background: 'white' }}
								>
									{row.from_time}
								</TableCell>
								<TableCell
									className={`${bodyCellCassName}`}
									style={{ width: '50px', position: 'sticky', left: '150px', zIndex: 10, background: 'white' }}
								>
									{row.to_time}
								</TableCell>
								{expansionOfColumns ? (
									<>
										<TableCell className={bodyCellCassName}>{row.totall_Offered}</TableCell>
										<TableCell className={bodyCellCassName}>{row.totall_answered}</TableCell>
										<TableCell className={bodyCellCassName}>{row.totall_abandoned}</TableCell>
										<TableCell className={bodyCellCassName}>{roundedNumber(row.sl_xpercentage * 100, 2) + ' %'}</TableCell>
										<TableCell className={bodyCellCassName}>{row.sl_xseconds}</TableCell>
										<TableCell className={bodyCellCassName}>{row.callavg_talk_time}</TableCell>
										<TableCell className={bodyCellCassName}>{row.callavg_after_call_work}</TableCell>
										<TableCell className={bodyCellCassName}>{row.callavg_abandom}</TableCell>
										<TableCell className={bodyCellCassName}>{row.aggent_scheduled}</TableCell>
										<TableCell className={bodyCellCassName}>{row.aggent_logged_in}</TableCell>
										<TableCell className={bodyCellCassName}>{row.aggent_available}</TableCell>
									</>
								) : (
									''
								)}
								<TableCell className={bodyCellCassName + ' bg-gray-100'}>{row.agents}</TableCell>
								<TableCell className={bodyCellCassName + ' bg-gray-100'}>{row.agents_with_shrinkage}</TableCell>
								{row.shrinkage === 0 || row.shrinkage === null ? (
									''
								) : (
									<TableCell className={bodyCellCassName + ' bg-gray-100'}>{row?.shrinkage * 100}</TableCell>
								)}
								<TableCell
									className={bodyCellCassName + ` bg-gray-100 ${roundedNumber(row.sl * 100, 2) < 80 ? 'bg-red-400' : 'bg-green-400'}`}
								>
									{roundedNumber(row.sl * 100, 2) + ' %'}
								</TableCell>
								<TableCell className={bodyCellCassName}>{roundedNumber(row.sl_target * 100, 2) + ' %'}</TableCell>
								<TableCell className={bodyCellCassName + ' bg-gray-100'}>{roundedNumber(row.asa, 2)}</TableCell>
								<TableCell className={bodyCellCassName + ' bg-gray-100'}>{roundedNumber(row.imm_answ, 2) + ' %'}</TableCell>
								<TableCell className={bodyCellCassName + ' bg-gray-100'}>{roundedNumber(row.pw * 100, 2) + ' %'}</TableCell>
								<TableCell
									className={bodyCellCassName + ` bg-gray-100 ${roundedNumber(row.occ * 100, 2) > 85 ? 'bg-red-400' : 'bg-green-400'}`}
								>
									{roundedNumber(row.occ * 100, 2) + ' %'}
								</TableCell>
								<TableCell className={bodyCellCassName + ' bg-gray-100'}> {row.max_call}</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={headers?.length} className='h-24 text-center'>
								{'No results.'}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</Card>
	);
};

export default ListerCom;
