import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart_Res } from '@/core';
import { Line } from 'react-chartjs-2';
import React, { FC, useRef, useState } from 'react';
import moment from 'moment';
import { Maximize } from 'lucide-react';
import EControlledDialog from '@/components/reusable/dialog/controlled-dialog';
import ExportChartAsMultiTypes from '../../charts/export-chart-as-multi-types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartsProps {
	data: any;
}

// CountFilesAllCallCentersSkeleton
const Charts: FC<ChartsProps> = ({ data }) => {
	const chartRefOne = useRef(null);
	const chartRefTow = useRef(null);
	const chartRefThree = useRef(null);
	const chartRefFour = useRef(null);

	const [isOpen, setIsOpen] = useState<any>(null);

	const generateHalfHourLabels = (fromTime: any, toTime: any) => {
		// Convert `fromTime` and `toTime` to moment objects
		const start = moment(fromTime, 'HH:mm');
		const end = moment(toTime, 'HH:mm');
		const labels = [];

		// Generate half-hour intervals
		while (start.isBefore(end)) {
			const nextTime = start.clone().add(30, 'minutes');
			labels.push(`${start.format('HH:mm')} - ${nextTime.format('HH:mm')}`);
			start.add(30, 'minutes');
		}

		return labels;
	};

	const timeToSeconds = (timeString: any) => {
		if (!timeString || timeString === '') return 0; // Handle empty string
		const [hours, minutes, seconds] = timeString.split(':');
		return +hours * 3600 + +minutes * 60 + parseFloat(seconds);
	};

	const chartOne = {
		// labels: data ? data?.map((item: Chart_Res) => `${item.from_time} - ${item.to_time}`) : [],
		labels: data ? data.flatMap((item: Chart_Res) => generateHalfHourLabels(item.from_time, item.to_time)) : [],
		datasets: [
			{
				label: 'Time To obvious',
				data: data ? data?.map((item: Chart_Res) => item.totall_abandoned) : [],
				borderColor: 'blue',
			},
		],
	};

	const chartTow = {
		labels: data ? data.flatMap((item: Chart_Res) => generateHalfHourLabels(item.from_time, item.to_time)) : [],

		datasets: [
			{
				label: 'SL',
				data: data ? data?.map((item: Chart_Res) => item.sl * 100) : [],
				borderColor: 'blue',
				backgroundColor: 'rgba(0, 0, 255, 0.1)',
			},
			{
				label: 'Call Avg Abandon',
				data: data ? data?.map((item: Chart_Res) => timeToSeconds(item.callavg_abandom)) : [],
				borderColor: 'orange',
				backgroundColor: 'rgba(255, 165, 0, 0.1)',
			},
			{
				label: 'AHT (Avg Handle Time)',
				data: data
					? data.map((item: Chart_Res) => timeToSeconds(item.callavg_talk_time) + timeToSeconds(item.callavg_after_call_work))
					: [],
				borderColor: 'green',
				backgroundColor: 'rgba(0, 255, 0, 0.1)',
			},
		],
	};

	const chartThree = {
		labels: data ? data.flatMap((item: Chart_Res) => generateHalfHourLabels(item.from_time, item.to_time)) : [],
		datasets: [
			{
				label: 'Total Answered',
				data: data ? data?.map((item: Chart_Res) => item.totall_answered) : [],
				borderColor: 'blue',
				backgroundColor: 'rgba(0, 0, 255, 0.1)',
			},
			{
				label: 'Total Abandoned',
				data: data ? data?.map((item: Chart_Res) => item.totall_abandoned) : [],
				borderColor: 'red',
				backgroundColor: 'rgba(255, 0, 0, 0.1)',
			},
			{
				label: 'SL',
				data: data ? data?.map((item: Chart_Res) => item.sl * 100) : [],
				borderColor: 'purple',
				backgroundColor: 'rgba(128, 0, 128, 0.1)',
			},
			{
				label: 'SL X Seconds',
				data: data ? data?.map((item: Chart_Res) => item.sl_xseconds) : [],
				borderColor: 'orange',
				backgroundColor: 'rgba(255, 165, 0, 0.1)',
			},
		],
	};

	const chartFour = {
		labels: data ? data.flatMap((item: Chart_Res) => generateHalfHourLabels(item.from_time, item.to_time)) : [],
		datasets: [
			{
				label: 'Total Answered',
				data: data ? data?.map((item: Chart_Res) => item.totall_answered) : [],
				borderColor: 'blue',
				backgroundColor: 'rgba(0, 0, 255, 0.1)',
			},
			{
				label: 'Total Abandoned',
				data: data ? data?.map((item: Chart_Res) => item.totall_abandoned) : [],
				borderColor: 'red',
				backgroundColor: 'rgba(255, 0, 0, 0.1)',
			},
			{
				label: 'Occupancy (occ)',
				data: data ? data?.map((item: Chart_Res) => item.occ * 100) : [], // Assuming occ is a decimal and we convert it to percentage
				borderColor: 'green',
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
		// maintainAspectRatio: false, // Disable default aspect ratio
		// height: 500, // Set desired height
		plugins: {
			legend: {
				position: 'top',
			},
		},
	} as any;

	{
		/* 7 6 5 2 */
	}
	// 3 / 4/ 8 / 11
	return (
		<React.Fragment>
			<EControlledDialog
				isOpen={isOpen}
				setOpen={setIsOpen}
				contentClassName='!max-w-[1200px] sm:max-w-fit sm-max:max-w-fit'
				dialogBody={
					<div>
						<h2 className='text-lg font-bold text-navy-700 dark:text-white'>
							{isOpen == 1
								? 'Average Time To Abandon (seconds)'
								: isOpen == 2
								? 'SL, Call Avg Abandon, AHT'
								: isOpen == 3
								? 'Total Answered, SL, SL X Seconds'
								: isOpen == 4
								? 'Total Answered,Total Abandon, Occupancy'
								: ''}
							{isOpen == 1 ? (
								<Line data={chartOne} options={options} />
							) : isOpen == 2 ? (
								<Line data={chartTow} options={options} />
							) : isOpen == 3 ? (
								<Line data={chartThree} options={options} />
							) : isOpen == 4 ? (
								<Line data={chartFour} options={options} />
							) : (
								''
							)}
						</h2>
					</div>
				}
			/>
			<div className='grid grid-cols-2 gap-5 md:grid-cols-2 sm:grid-cols-1 sm-max:grid-cols-1'>
				<div className='p-[20px] flex flex-col gap-4 col-span-1 md:col-span-1 sm:col-span-2 sm-max:col-span-2 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none  transform transition-transform duration-500 hover:translate-y-[-10px] hover:shadow-[0_0_40px_rgba(8,21,66,0.05)] '>
					<div className='flex justify-between'>
						<h2 className='text-lg font-bold text-navy-700 dark:text-white'>Average Time To Abandon (seconds)</h2>
						<div className='flex gap-2'>
							<Maximize className='cursor-pointer' onClick={() => setIsOpen(1)} />
							<ExportChartAsMultiTypes
								chartRef={chartRefOne}
								statements={{
									labels: data.flatMap((item: Chart_Res) => generateHalfHourLabels(item.from_time, item.to_time)),
									datasets: { time_to_abvious: data?.map((item: Chart_Res) => item.totall_abandoned) },
								}}
								format={[{ key: 'time_to_abvious', value: '' }]}
								labelName='from time - to time'
							/>
						</div>
					</div>
					<Line data={chartOne} options={options} ref={chartRefOne} />
				</div>

				<div className='p-[20px] flex flex-col gap-4 col-span-1 md:col-span-1 sm:col-span-2 sm-max:col-span-2 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none  transform transition-transform duration-500 hover:translate-y-[-10px] hover:shadow-[0_0_40px_rgba(8,21,66,0.05)] '>
					<div className='flex justify-between'>
						<h2 className='text-lg font-bold text-navy-700 dark:text-white'>SL, Call Avg Abandon, AHT</h2>
						<div className='flex gap-2'>
							<Maximize className='cursor-pointer' onClick={() => setIsOpen(2)} />
							<ExportChartAsMultiTypes
								chartRef={chartRefTow}
								statements={{
									labels: data.flatMap((item: Chart_Res) => generateHalfHourLabels(item.from_time, item.to_time)),
									datasets: {
										sl: data?.map((item: Chart_Res) => item.sl * 100),
										call_avg_abandon: data?.map((item: Chart_Res) => timeToSeconds(item.callavg_abandom)),
										avg_handle_time: data.map(
											(item: Chart_Res) => timeToSeconds(item.callavg_talk_time) + timeToSeconds(item.callavg_after_call_work)
										),
									},
								}}
								format={[
									{ key: 'sl', value: '' },
									{ key: 'call_avg_abandon', value: '' },
									{ key: 'avg_handle_time', value: '' },
								]}
								labelName='from time - to time'
							/>
						</div>{' '}
					</div>
					<Line data={chartTow} options={options} ref={chartRefTow} />
				</div>

				<div className='p-[20px] flex flex-col gap-4 col-span-1 md:col-span-1 sm:col-span-2 sm-max:col-span-2 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none  transform transition-transform duration-500 hover:translate-y-[-10px] hover:shadow-[0_0_40px_rgba(8,21,66,0.05)] '>
					<div className='flex justify-between'>
						<h2 className='text-lg font-bold text-navy-700 dark:text-white'>Total Answered, SL, SL X Seconds</h2>
						<div className='flex gap-2'>
							<Maximize className='cursor-pointer' onClick={() => setIsOpen(3)} />
							<ExportChartAsMultiTypes
								chartRef={chartRefThree}
								statements={{
									labels: data.flatMap((item: Chart_Res) => generateHalfHourLabels(item.from_time, item.to_time)),
									datasets: {
										'Total Answered': data?.map((item: Chart_Res) => item.totall_answered),
										'Total Abandoned': data?.map((item: Chart_Res) => item.totall_abandoned),
										SL: data?.map((item: Chart_Res) => item.sl * 100),
										'SL X Seconds': data?.map((item: Chart_Res) => item.sl_xseconds),
									},
								}}
								format={[
									{ key: 'Total Answered', value: '' },
									{ key: 'Total Abandoned', value: '' },
									{ key: 'SL', value: '' },
									{ key: 'SL X Seconds', value: '' },
								]}
								labelName='from time - to time'
							/>
						</div>{' '}
					</div>
					<Line data={chartThree} options={options} ref={chartRefThree} />
				</div>

				<div className='p-[20px] flex flex-col gap-4 col-span-1 md:col-span-1 sm:col-span-2 sm-max:col-span-2 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none  transform transition-transform duration-500 hover:translate-y-[-10px] hover:shadow-[0_0_40px_rgba(8,21,66,0.05)] '>
					<div className='flex justify-between'>
						<h2 className='text-lg font-bold text-navy-700 dark:text-white'>Total Answered,Total Abandon, Occupancy</h2>
						<div className='flex gap-2'>
							<Maximize className='cursor-pointer' onClick={() => setIsOpen(4)} />
							<ExportChartAsMultiTypes
								chartRef={chartRefFour}
								statements={{
									labels: data.flatMap((item: Chart_Res) => generateHalfHourLabels(item.from_time, item.to_time)),
									datasets: {
										'Total Answered': data?.map((item: Chart_Res) => item.totall_answered),
										'Total Abandoned': data?.map((item: Chart_Res) => item.totall_abandoned),
										Occupancy: data?.map((item: Chart_Res) => item.occ * 100),
									},
								}}
								format={[
									{ key: 'Total Answered', value: '' },
									{ key: 'Total Abandoned', value: '' },
									{ key: 'Occupancy', value: '' },
								]}
								labelName='from time - to time'
							/>
						</div>{' '}
					</div>
					<Line data={chartFour} options={options} ref={chartRefFour} />
				</div>
			</div>
		</React.Fragment>
	);
};

export default Charts;
