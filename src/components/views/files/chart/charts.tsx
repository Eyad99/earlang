import withLoading from '@/hooks/withLoader';
import Card from '@/components/reusable/card';
import { useFetchDataRQ } from '@/hooks/useFetchDataRQ';
import { fileApi } from '@/core/services/files';
import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart_Res } from '@/core';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartsProps {
	fileId: string;
}
const BoxWithLoading = withLoading(Card);

const Charts: FC<ChartsProps> = ({ fileId }) => {
	const { data, isLoading, isFetching } = useFetchDataRQ({
		queryKey: [`file-details-${fileId}`],
		queryFn: () => fileApi.getFileDetails(fileId),
	});

	const timeToSeconds = (timeString: any) => {
		if (!timeString || timeString === '') return 0; // Handle empty string
		const [hours, minutes, seconds] = timeString.split(':');
		return +hours * 3600 + +minutes * 60 + parseFloat(seconds);
	};

	const chartOne = {
		labels: data?.data ? data?.data.map((item: Chart_Res) => `${item.from_time} - ${item.to_time}`) : [],
		datasets: [
			{
				label: 'Time To obvious',
				data: data?.data ? data?.data.map((item: Chart_Res) => item.totall_abandoned) : [],
				borderColor: 'blue',
			},
		],
	};

	const chartTow = {
		labels: data?.data ? data?.data.map((item: Chart_Res) => `${item.from_time} - ${item.to_time}`) : [],
		datasets: [
			{
				label: 'SL',
				data: data?.data ? data?.data.map((item: Chart_Res) => item.sl * 100) : [],
				borderColor: 'blue',
				backgroundColor: 'rgba(0, 0, 255, 0.1)',
			},
			{
				label: 'Call Avg Abandon',
				data: data?.data ? data?.data.map((item: Chart_Res) => timeToSeconds(item.callavg_abandom)) : [],
				borderColor: 'orange',
				backgroundColor: 'rgba(255, 165, 0, 0.1)',
			},
			{
				label: 'AHT (Avg Handle Time)',
				data: data?.data
					? data?.data.map((item: Chart_Res) => timeToSeconds(item.callavg_talk_time) + timeToSeconds(item.callavg_after_call_work))
					: [],
				borderColor: 'green',
				backgroundColor: 'rgba(0, 255, 0, 0.1)',
			},
		],
	};

	const chartThree = {
		labels: data?.data ? data?.data.map((item: Chart_Res) => `${item.from_time} - ${item.to_time}`) : [],
		datasets: [
			{
				label: 'Total Answered',
				data: data?.data ? data?.data.map((item: Chart_Res) => item.totall_answered) : [],
				borderColor: 'blue',
				backgroundColor: 'rgba(0, 0, 255, 0.1)',
			},
			{
				label: 'Total Abandoned',
				data: data?.data ? data?.data.map((item: Chart_Res) => item.totall_abandoned) : [],
				borderColor: 'red',
				backgroundColor: 'rgba(255, 0, 0, 0.1)',
			},
			{
				label: 'SL',
				data: data?.data ? data?.data.map((item: Chart_Res) => item.sl * 100) : [],
				borderColor: 'purple',
				backgroundColor: 'rgba(128, 0, 128, 0.1)',
			},
			{
				label: 'SL X Seconds',
				data: data?.data ? data?.data.map((item: Chart_Res) => item.sl_xseconds) : [],
				borderColor: 'orange',
				backgroundColor: 'rgba(255, 165, 0, 0.1)',
			},
		],
	};

	const chartFour = {
		labels: data?.data ? data?.data.map((item: Chart_Res) => `${item.from_time} - ${item.to_time}`) : [],
		datasets: [
			{
				label: 'Total Answered',
				data: data?.data ? data?.data.map((item: Chart_Res) => item.totall_answered) : [],
				borderColor: 'blue',
				backgroundColor: 'rgba(0, 0, 255, 0.1)',
			},
			{
				label: 'Total Abandoned',
				data: data?.data ? data?.data.map((item: Chart_Res) => item.totall_abandoned) : [],
				borderColor: 'red',
				backgroundColor: 'rgba(255, 0, 0, 0.1)',
			},
			{
				label: 'Occupancy (occ)',
				data: data?.data ? data?.data.map((item: Chart_Res) => item.occ * 100) : [], // Assuming occ is a decimal and we convert it to percentage
				borderColor: 'green',
				backgroundColor: 'rgba(0, 255, 0, 0.1)',
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
	} as any;

	if (isLoading) return <BoxWithLoading loading={isLoading}></BoxWithLoading>;

	{
		/* 7 6 5 2 */
	}
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex lg:flex-row sm:flex-col sm-max:flex-col gap-4 wrap '>
				<div className='md:w-1/2 w-full '>
					<Line
						data={chartOne}
						options={{
							...options,
							plugins: {
								title: {
									display: true,
									text: 'Average Time To Abandon (seconds)',
								},
							},
						}}
					/>
				</div>

				<div className='md:w-1/2 w-full '>
					<Line
						data={chartTow}
						options={{
							...options,
							plugins: {
								title: {
									display: true,
									text: 'SL, Call Avg Abandon, AHT',
								},
							},
						}}
					/>
				</div>
			</div>
			<div className='flex lg:flex-row sm:flex-col sm-max:flex-col gap-4 wrap '>
				<div className='md:w-1/2 w-full '>
					<Line
						data={chartThree}
						options={{
							...options,
							plugins: {
								title: {
									display: true,
									text: 'Total Answered, SL, SL X Seconds',
								},
							},
						}}
					/>
				</div>
				<div className='md:w-1/2 w-full '>
					<Line
						data={chartFour}
						options={{
							...options,
							plugins: {
								title: {
									display: true,
									text: 'Total Answered,Total Abandon, Occupancy',
								},
							},
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Charts;
