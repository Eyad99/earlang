import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Call_Stats_Res } from '@/core';
import { DEFAULT_DATE } from '@/variables/constants';
import { Line } from 'react-chartjs-2';
import React, { FC, useState } from 'react';
import moment from 'moment';
import { Maximize } from 'lucide-react';
import EDialog from '@/components/reusable/dialog';
import EControlledDialog from '@/components/reusable/dialog/controlled-dialog';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface VCountFilesAllCallCentersProps {
	statements: Call_Stats_Res;
}

const VCallStats: FC<VCountFilesAllCallCentersProps> = ({ statements }) => {
	const [isOpen, setIsOpen] = useState(false);
	const lineData = {
		labels: statements?.labels.map((item) => moment(item).format(DEFAULT_DATE)),
		datasets: [
			{
				label: 'Agents',
				data: statements?.datasets?.agents,
				borderColor: 'blue',
				backgroundColor: 'rgba(0, 0, 255, 0.1)',
			},
			{
				label: 'Service Level',
				data: statements?.datasets?.service_level,
				borderColor: 'red',
				backgroundColor: 'rgba(255, 0, 0, 0.1)',
			},
			{
				label: 'Speed Of Answer',
				data: statements?.datasets?.average_speed_of_answer,
				borderColor: 'green',
				backgroundColor: 'rgba(0, 255, 0, 0.1)',
			},
			{
				label: 'Occupancy',
				data: statements?.datasets?.occupancy,
				borderColor: 'yellow',
				backgroundColor: 'rgba(0, 255, 0, 0.1)',
			},
		],
	};

	const options = {
		responsive: true,
		animations: {
			tension: {
				duration: 1000,
				easing: 'linear',
				from: 1,
				to: 0,
				loop: true,
			},
		},

		plugins: {
			legend: {
				position: 'top',
			},
		},
	} as any;
	return (
		<React.Fragment>
			<EControlledDialog
				isOpen={isOpen}
				setOpen={setIsOpen}
				contentClassName='!max-w-[1200px] sm:max-w-fit sm-max:max-w-fit'
				dialogBody={
					<div>
						<h2 className='text-lg font-bold text-navy-700 dark:text-white'>Calls</h2>
						<Line data={lineData} options={options} />
					</div>
				}
			/>
			<div className='p-[20px] flex flex-col gap-4 col-span-1 md:col-span-1 sm:col-span-2 sm-max:col-span-2 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none  transform transition-transform duration-500 hover:translate-y-[-10px] hover:shadow-[0_0_40px_rgba(8,21,66,0.05)] '>
				<div className='flex justify-between'>
					<h2 className='text-lg font-bold text-navy-700 dark:text-white'>Calls</h2>
					<Maximize className='cursor-pointer' onClick={() => setIsOpen(true)} />
				</div>
				<Line data={lineData} options={options} />
			</div>
		</React.Fragment>
	);
};

export default VCallStats;
