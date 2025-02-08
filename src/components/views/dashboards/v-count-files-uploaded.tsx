import React, { FC, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import EControlledDialog from '@/components/reusable/dialog/controlled-dialog';
import { Maximize } from 'lucide-react';

// Register the necessary components for the pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

interface VCountFilesUploadedProps {
	statements?: [];
}
const VCountFilesUploaded: FC<VCountFilesUploadedProps> = ({}) => {
	const [isOpen, setIsOpen] = useState(false);

	const data = {
		labels: [],
		datasets: [
			{
				label: 'Files',
				data: [12],
				backgroundColor: ['rgba(255, 99, 132, 0.2)'],
				borderColor: ['rgba(255, 99, 132, 1)'],
				borderWidth: 1,
			},
		],
	};
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
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
						<h2 className='text-lg font-bold text-navy-700 dark:text-white'>Files Uploaded </h2>
						<Pie data={data} options={options as any} className='!w-[250px] !h[250px]' />
					</div>
				}
			/>
			<div className='h-[350px] p-[20px] flex flex-col gap-4 col-span-1 md:col-span-1 sm:col-span-2 sm-max:col-span-2 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none  transform transition-transform duration-500 hover:translate-y-[-10px] hover:shadow-[0_0_40px_rgba(8,21,66,0.05)] '>
				<div className='flex justify-between'>
					<h2 className='text-lg font-bold text-navy-700 dark:text-white'>Files Uploaded </h2>
					<Maximize className='cursor-pointer' onClick={() => setIsOpen(true)} />
				</div>
				<Pie data={data} options={options as any} className='!w-[250px] !h[250px]' />
			</div>{' '}
		</React.Fragment>
	);
};

export default VCountFilesUploaded;
