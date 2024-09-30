import React, { FC, useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Maximize } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import ExportChartAsMultiTypes from '../charts/export-chart-as-multi-types';
import EControlledDialog from '@/components/reusable/dialog/controlled-dialog';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface VDemonstratingOfferedProps {
	statements?: any;
}

const VDemonstratingOffered: FC<VDemonstratingOfferedProps> = ({}) => {
	const chartRef = useRef(null);

	const [isOpen, setIsOpen] = useState(false);

	const statementsData = {
		labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'july', 'aug', 'sep', 'oct', 'nov', 'dec'],

		datasets: [
			{
				label: 'Est. Call Volume',
				data: [25500, 25600, 25700, 25800, 25900, 26000, 26100, 40100, 26300, 26400, 40000, 26600],
				borderColor: 'blue',
				backgroundColor: 'rgba(0, 0, 255, 0.1)',
			},
			{
				label: 'Est. Email Volume',
				data: [65500, 65600, 65700, 40000, 65900, 67000, 67100, 67200, 67300, 67400, 67500, 6700],
				borderColor: 'orange',
				backgroundColor: 'rgba(255, 165, 0, 0.1)',
			},
			{
				label: 'Est. Other Volume',
				data: [85500, 10000, 85700, 90000, 85900, 86000, 86100, 86300, 86400, 86500, 86600, 30000],
				borderColor: 'green',
				backgroundColor: 'rgba(0, 255, 0, 0.1)',
			},
		],
	};

	const options = {
		responsive: true,
		// animations: {
		// 	tension: {
		// 		duration: 1000,
		// 		easing: 'linear',
		// 		from: 1,
		// 		to: 0,
		// 		loop: true,
		// 	},
		// },

		plugins: {
			legend: {
				position: 'top',
			},
		},
	};

	const exportFormats = [
		{ key: 'email_volume', value: '' },
		{ key: 'call_volume', value: '' },
		{ key: 'other_volume', value: '' },
	];

	const renderExportButton = () => (
		<ExportChartAsMultiTypes
			chartRef={chartRef}
			statements={{
				labels: statementsData?.labels,
				datasets: {
					call_volume: [25500, 25600, 25700, 25800, 25900, 26000, 26100, 40100, 26300, 26400, 40000, 26600],
					email_volume: [65500, 65600, 65700, 40000, 65900, 67000, 67100, 67200, 67300, 67400, 67500, 6700],
					other_volume: [85500, 10000, 85700, 90000, 85900, 86000, 86100, 86300, 86400, 86500, 86600, 30000],
				},
			}}
			format={exportFormats}
			labelName='Callcenter Name'
		/>
	);
	return (
		<React.Fragment>
			<EControlledDialog
				isOpen={isOpen}
				setOpen={setIsOpen}
				contentClassName='!max-w-[1200px] sm:max-w-fit sm-max:max-w-fit'
				dialogBody={
					<div>
						<div className='flex justify-between'>
							<h2 className='text-lg font-bold text-navy-700 dark:text-white'>Demonstrating Offered</h2>
							<div className='flex gap-2 items-center'>{renderExportButton()}</div>{' '}
						</div>
						<Line data={statementsData} options={options as any} />
					</div>
				}
			/>
			<div className='p-[20px] flex flex-col gap-4 col-span-1 md:col-span-1 sm:col-span-2 sm-max:col-span-2 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none  transform transition-transform duration-500 hover:translate-y-[-10px] hover:shadow-[0_0_40px_rgba(8,21,66,0.05)] '>
				<div className='flex justify-between'>
					<h2 className='text-lg font-bold text-navy-700 dark:text-white'>Demonstrating Offered</h2>
					<div className='flex gap-2 items-center'>
						<Maximize className='cursor-pointer' onClick={() => setIsOpen(true)} />
						{renderExportButton()}
					</div>{' '}
				</div>
				<Line data={statementsData} options={options as any} ref={chartRef} />
			</div>
		</React.Fragment>
	);
};

export default VDemonstratingOffered;
