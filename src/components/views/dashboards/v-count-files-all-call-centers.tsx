import React, { FC, useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Count_Files_ALL_CallCenter_Res } from '@/core';
import { Maximize } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import ExportChartAsMultiTypes from '../charts/export-chart-as-multi-types';
import EControlledDialog from '@/components/reusable/dialog/controlled-dialog';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface VCountFilesAllCallCentersProps {
	statements: Count_Files_ALL_CallCenter_Res[];
}
const VCountFilesAllCallCenters: FC<VCountFilesAllCallCentersProps> = ({ statements }) => {
	const chartRef = useRef(null);

	const [isOpen, setIsOpen] = useState(false);

	let barData = {
		labels: statements?.map((item: Count_Files_ALL_CallCenter_Res) => item?.name),
		datasets: [
			{
				label: `Total Excel Files`,
				data: statements?.map((item: Count_Files_ALL_CallCenter_Res) => item?.xlfile_count),
				borderWidth: 1,
				backgroundColor: '#D7E3FD',
				borderColor: '#D7E3FD',
			},
		],
	};

	const options = {
		responsive: true,
		// animation: {
		// 	duration: 1000,
		// 	easing: 'easeOutBounce',
		// },
		plugins: {
			legend: {
				display: false,
				position: 'top',
			},
			// title: {
			// 	display: true,
			// 	text: 'Monthly Sales for 2023', // Title of the chart
			// },
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	const format = [{ key: 'xlfile_count', value: '' }];
	return (
		<React.Fragment>
			<EControlledDialog
				isOpen={isOpen}
				setOpen={setIsOpen}
				contentClassName='!max-w-[1200px] sm:max-w-fit sm-max:max-w-fit'
				dialogBody={
					<div>
						<h2 className='text-lg font-bold text-navy-700 dark:text-white'>Files uploaded for each CallCenter</h2>
						<Bar options={options as any} data={barData} />
					</div>
				}
			/>

			<div className='p-[20px] flex flex-col gap-4 col-span-1 md:col-span-1 sm:col-span-2 sm-max:col-span-2 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none  transform transition-transform duration-500 hover:translate-y-[-10px] hover:shadow-[0_0_40px_rgba(8,21,66,0.05)] '>
				<div className='flex justify-between'>
					<h2 className='text-lg font-bold text-navy-700 dark:text-white'>Files uploaded for each CallCenter</h2>
					<div className='flex gap-2'>
						<Maximize className='cursor-pointer' onClick={() => setIsOpen(true)} />
						<ExportChartAsMultiTypes
							chartRef={chartRef}
							statements={{
								labels: statements?.map((item: Count_Files_ALL_CallCenter_Res) => item?.name),
								datasets: { xlfile_count: statements?.map((item: Count_Files_ALL_CallCenter_Res) => item?.xlfile_count) },
							}}
							format={format}
							labelName='Callcenter Name'
						/>
					</div>
				</div>
				<Bar options={options as any} data={barData} ref={chartRef} />
			</div>
		</React.Fragment>
	);
};

export default VCountFilesAllCallCenters;
