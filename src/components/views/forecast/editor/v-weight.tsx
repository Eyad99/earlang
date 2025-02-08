import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@/components/reusable/fields/TextField';
import moment from 'moment';
import Card from '@/components/reusable/card';
import React from 'react';

const VWeight = ({ dailyForecast, weights, formProperities }: { dailyForecast: any[]; weights: string[]; formProperities: any }) => {
	const { forecastType } = useParams();

	const headClassName = 'min-w-[150px] text-sm font-bold text-gray-600 dark:text-white pb-2 pr-4 pt-4 text-center';
	const bodyCellCassName = 'min-w-[150px] border-white/0 py-3 pr-4 text-[14px] text-navy-700 dark:text-white text-center';

	useEffect(() => {
		const groupedData: Record<string, { date: string; total: number; weight: number | string }[]> = {};

		dailyForecast.forEach((item: any, index: number) => {
			const dayName = item.Day_Name.toLowerCase();
			const currentDate = item.Date_Day.split('T')[0];
			const currentWeight = weights[index % weights.length];

			// إذا لم يتم تهيئة اليوم في الكائن، قم بإنشاء مصفوفة فارغة
			if (!groupedData[dayName]) {
				groupedData[dayName] = [];
			}

			// إيجاد الأسبوع الحالي الذي ينتمي له اليوم
			let currentWeek = groupedData[dayName].find((week) => week.date === currentDate);

			// إذا لم يكن الأسبوع موجودًا، أضفه كبداية جديدة
			if (!currentWeek) {
				currentWeek = { date: currentDate, total: 0, weight: currentWeight };
				groupedData[dayName].push(currentWeek);
			}

			// اجمع القيم لسبعة أيام
			const startIndex = index;
			const endIndex = index + 6; // سبعة أيام تشمل اليوم الحالي

			for (let i = startIndex; i <= endIndex && i < dailyForecast.length; i++) {
				currentWeek.total +=
					forecastType == 'volume' ? dailyForecast[i]?.Number_of_calls_or_contacts || 0 : parseFloat(dailyForecast[i]?.Data_Avg_Aht) || 0;
			}
		});

		formProperities.setFieldValue('weeklyData', groupedData);
	}, [dailyForecast]);

	return (
		<Card extra={`w-full `}>
			<Table>
				<TableHeader>
					<TableRow>
						{Object.keys(formProperities.values?.weeklyData)?.map((key) => {
							return (
								<React.Fragment key={key}>
									<TableHead className={headClassName}>Weekly Date</TableHead>
									<TableHead className={headClassName}>{forecastType == 'volume' ? 'Total' : 'Data Average'}</TableHead>
								</React.Fragment>
							);
						})}
						<TableHead className={headClassName + ' sticky right-0 bg-gray-50 z-5 min-w-[120px]'}>Weight % </TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{Array.from({ length: 6 })?.map((_, ind: number) => (
						<TableRow key={`row_${ind}`}>
							{Object.keys(formProperities.values?.weeklyData)?.map((day) => (
								<React.Fragment key={`day_${day}_${ind}`}>
									<TableCell className={bodyCellCassName}>
										{formProperities.values?.weeklyData?.[day]?.[ind]?.date
											? moment(formProperities.values?.weeklyData[day][ind]?.date).format('llll')
											: '-'}
									</TableCell>
									<TableCell className={bodyCellCassName}>{formProperities.values?.weeklyData[day][ind]?.total || '-'}</TableCell>
								</React.Fragment>
							))}
							<TableCell className={bodyCellCassName + ' sticky right-0 bg-gray-50 z-5 min-w-[120px]'}>
								<TextField
									name={`weeklData[${'wednesday'}][${ind}].weight`}
									type='number'
									divClassName=''
									value={formProperities.values?.weeklyData?.['wednesday']?.[ind]?.weight || 0}
									onChange={(event: any) => {
										let value = +event.target.value || 0;
										if (value > 100) value = 100;
										if (value < 0) value = 0;
										formProperities.setFieldValue(`weeklyData[${'wednesday'}][${ind}].weight`, value);
									}}
									min={0}
									max={100}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
};

export default VWeight;
