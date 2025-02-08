import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import EControlledDialog from '@/components/reusable/dialog/controlled-dialog';
import Intervals from './intervals';
import moment from 'moment';
import Card from '@/components/reusable/card';

const ForecastTable = ({ data, type }: { data: any; type: string }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [intervalsData, stIntervalsData] = useState([]);

	const headClassName = 'text-sm font-bold text-gray-600 dark:text-white pb-2 pr-4 pt-4 text-center';
	const bodyCellCassName = 'min-w-[100px] border-white/0 py-3 pr-4 text-[14px] text-navy-700 dark:text-white text-center';
	return (
		<React.Fragment>
			<EControlledDialog
				isOpen={isOpen}
				setOpen={setIsOpen}
				contentClassName='md:max-w-[800px] max-w-full max-h-[90%] overflow-auto'
				dialogBody={<Intervals intervalsData={intervalsData} />}
			/>
			<Card extra={`w-full h-full sm:overflow-auto `}>
				<Table>
					<TableHeader>
						<TableRow key={'header'}>
							<TableHead key={1} className={`${headClassName}`}>
								{type === 'Year'
									? 'Year'
									: type === 'Three Month'
									? 'Quarter'
									: type === 'Month'
									? 'Month'
									: type === 'Week'
									? 'Week Starting'
									: type === 'Day'
									? 'Day'
									: type === 'Interval Of Days'
									? 'Day'
									: ''}
							</TableHead>
							{(type === 'Day' || type === 'Interval Of Days') && (
								<TableHead key={4} className={`${headClassName}`}>
									Name
								</TableHead>
							)}
							<TableHead key={2} className={`${headClassName}`}>
								Number Of Calls
							</TableHead>
							<TableHead key={3} className={`${headClassName}`}>
								Growth Rate
							</TableHead>
							{type === 'Interval Of Days' && <TableHead key={5} className={`${headClassName}`}></TableHead>}
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.map((item: any, index: number) => (
							<TableRow key={index}>
								<TableCell
									key={`${index}_${item.Year || item.Quarter || item.Month || item?.['Week Starting'] || item.Day}`}
									className={`${bodyCellCassName}`}
								>
									{moment(
										type === 'Year'
											? item.Year
											: type === 'Three Month'
											? item.Quarter
											: type === 'Month'
											? item.Month
											: type === 'Week'
											? item?.['Week Starting']
											: type === 'Day'
											? item.Day
											: type === 'Interval Of Days'
											? item.Day
											: ''
									).format('L')}
								</TableCell>

								{(type === 'Day' || type === 'Interval Of Days') && (
									<TableCell key={`${index}_${item.Name}`} className={`${bodyCellCassName}`}>
										{item.Name}
									</TableCell>
								)}

								<TableCell key={`${index}_${item.Contacts}`} className={`${bodyCellCassName}`}>
									{item.Contacts}
								</TableCell>
								<TableCell key={`${index}_${item?.['Growth Rate']}`} className={`${bodyCellCassName}`}>
									{item?.['Growth Rate']}
								</TableCell>
								{type === 'Interval Of Days' && item.Intervals && (
									<TableCell key={`${index}_${item.Name}_interval`} className={`${bodyCellCassName}`}>
										<Button
											variant={'blueOutline'}
											onClick={() => {
												setIsOpen(true);
												stIntervalsData(item.Intervals);
											}}
										>
											Intervals
										</Button>
									</TableCell>
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>
		</React.Fragment>
	);
};

export default ForecastTable;
