import EControlledDialog from '@/components/reusable/dialog/controlled-dialog';
import { Count_Files_ALL_CallCenter_Res } from '@/core';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Maximize } from 'lucide-react';
import React, { useState } from 'react';
import { FC } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface VCountFilesAllStaffsProps {
	statements: Count_Files_ALL_CallCenter_Res[];
}
const VCountFilesAllStaffs: FC<VCountFilesAllStaffsProps> = ({ statements }) => {
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
		animation: {
			duration: 1000,
			easing: 'easeOutBounce',
		},
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
	return (
		<React.Fragment>
			<EControlledDialog
				isOpen={isOpen}
				setOpen={setIsOpen}
				contentClassName='!max-w-[1200px] sm:max-w-fit sm-max:max-w-fit'
				dialogBody={
					<div>
						<h2 className='text-lg font-bold text-navy-700 dark:text-white'>Files uploaded for each Staff</h2>
						<Bar options={options as any} data={barData} />
					</div>
				}
			/>
			<div className='p-[20px] flex flex-col gap-4 col-span-1 md:col-span-1 sm:col-span-2 sm-max:col-span-2 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none  transform transition-transform duration-500 hover:translate-y-[-10px] hover:shadow-[0_0_40px_rgba(8,21,66,0.05)] '>
				<div className='flex justify-between'>
					<h2 className='text-lg font-bold text-navy-700 dark:text-white'>Files uploaded for each Staff</h2>
					<Maximize className='cursor-pointer' onClick={() => setIsOpen(true)} />
				</div>
				<Bar options={options as any} data={barData} />
			</div>{' '}
		</React.Fragment>
	);
};

export default VCountFilesAllStaffs;
