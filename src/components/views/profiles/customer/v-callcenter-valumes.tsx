import Card from '@/components/reusable/card';
import TextField from '@/components/reusable/fields/TextField';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useFormik } from 'formik';
import React from 'react';

const VCallcenterValumes = () => {
	const initialValues = {
		est: [
			{ month: 'Jan', volume: 25428, proportion: 7 },
			{ month: 'Feb', volume: 25181, proportion: 7 },
			{ month: 'Mar', volume: 21250, proportion: 6 },
			{ month: 'Apr', volume: 35889, proportion: 10 },
			{ month: 'May', volume: 11150, proportion: 3 },
			{ month: 'Jun', volume: 50118, proportion: 14 },
			{ month: 'July', volume: 36018, proportion: 10 },
			{ month: 'Aug', volume: 42525, proportion: 12 },
			{ month: 'Sept', volume: 36154, proportion: 10 },
			{ month: 'Oct', volume: 27779, proportion: 8 },
			{ month: 'Nov', volume: 28317, proportion: 8 },
			{ month: 'Dec', volume: 28478, proportion: 8 },
		],
	};

	const totalVolume = initialValues.est.reduce((acc, item) => acc + item.volume, 0);

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues,
		onSubmit: () => {},
	});
	const headClassName = 'text-sm font-bold text-gray-600 dark:text-white pb-2 pr-4 pt-4 text-center';
	const bodyCellCassName = 'min-w-[100px] border-white/0 py-3 pr-4 text-[14px] text-navy-700 dark:text-white text-center';

	return (
		<Card extra={'w-full !p-5'}>
			{/* Header */}
			<div className='w-full px-[8px]'>
				<h4 className='text-xl font-bold text-navy-700 dark:text-white'>Callcenter Est. Call Volume</h4>
				<p className='mt-1 text-base text-gray-600'>Here you can change volume</p>
			</div>

			<Table>
				<TableHeader>
					<TableRow key={'header'}>
						<TableHead key={1} className={`${headClassName}`}>
							Month
						</TableHead>
						<TableHead key={2} className={`${headClassName}`}>
							Est. Call Volume
						</TableHead>
						<TableHead key={3} className={`${headClassName}`}>
							Proportion
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{values?.est?.map((item, index) => (
						<TableRow key={index}>
							<TableCell key={`${index}_${item.month}`} className={`${bodyCellCassName}`}>
								{item.month}
							</TableCell>
							<TableCell key={`${index}_${item.month}`} className={`${bodyCellCassName}`}>
								<TextField
									name={`volume`}
									type='number'
									onBlur={handleBlur}
									value={item.volume}
									onChange={handleChange}
									className='min-w-30'
								/>
							</TableCell>
							<TableCell key={`${index}_${item.month}`} className={`${bodyCellCassName}`}>
								{item.proportion} %
							</TableCell>
						</TableRow>
					))}
					<TableRow key={'total'}>
						<TableCell className={`${bodyCellCassName}`}></TableCell>
						<TableCell className={`${bodyCellCassName} font-bold`}>Total {totalVolume}</TableCell>
						<TableCell className={`${bodyCellCassName}`}></TableCell>
					</TableRow>
					<TableRow key={'avg'}>
						<TableCell className={`${bodyCellCassName}`}></TableCell>
						<TableCell className={`${bodyCellCassName} font-bold`}>Avg {(totalVolume / 12).toFixed(2)}</TableCell>
						<TableCell className={`${bodyCellCassName}`}></TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Card>
	);
};

export default VCallcenterValumes;
