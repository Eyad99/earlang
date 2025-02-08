import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useParams } from 'react-router-dom';
import { Interval } from '@/core';
import Card from '@/components/reusable/card';

const Intervals = ({ intervalsData }: { intervalsData: Interval[] }) => {
	const { forecastType } = useParams();

	const headClassName = 'text-sm font-bold text-gray-600 dark:text-white pb-2 pr-4 pt-4 text-center';
	const bodyCellCassName = 'min-w-[100px] border-white/0 py-3 pr-4 text-[14px] text-navy-700 dark:text-white text-center';
	return (
		<Card extra={`w-full h-full sm:overflow-auto `}>
			<Table>
				<TableHeader>
					<TableRow key={'header'}>
						<TableHead key={1} className={`${headClassName}`}>
							From Time
						</TableHead>
						<TableHead key={2} className={`${headClassName}`}>
							To Time
						</TableHead>
						<TableHead key={3} className={`${headClassName}`}>
							{forecastType == 'aht' ? 'Forecasted Aht' : 'Forecasted Number Of Calls'}
						</TableHead>
						<TableHead key={4} className={`${headClassName}`}>
							{forecastType ? 'Weighted Moving Average' : 'Growth Rate'}
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{intervalsData.map((interval: Interval, index: number) => (
						<TableRow key={index}>
							<TableCell key={`${index}_${interval.From_Time}`} className={`${bodyCellCassName}`}>
								{interval.From_Time}
							</TableCell>

							<TableCell key={`${index}_${interval.To_Time}`} className={`${bodyCellCassName}`}>
								{interval.To_Time}
							</TableCell>

							<TableCell key={`${index}_${interval.Forecasted_Contacts}`} className={`${bodyCellCassName}`}>
								{forecastType == 'aht' ? interval.Forecasted_Aht : interval.Forecasted_Contacts}
							</TableCell>

							<TableCell key={`${index}_${interval.Growth_Rate}`} className={`${bodyCellCassName}`}>
								{interval.Growth_Rate ?? interval?.Weighted_Moving_Average}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
};

export default Intervals;
