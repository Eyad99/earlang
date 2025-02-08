import { useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { Maximize } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import ExportChartAsMultiTypes from '../charts/export-chart-as-multi-types';
import EControlledDialog from '@/components/reusable/dialog/controlled-dialog';
import ForecastTable from './table';
import moment from 'moment';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ForecastResults = ({ data, forecast, type, loading }: { data: any; forecast: any; type: string; loading: boolean }) => {
	const currentYear = new Date().getFullYear();
	const currentMonth = +moment().format('MM');
	const currentDay = +moment().format('DD');

	const chartRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	const lineData = {
		labels:
			type === 'Year'
				? data.map((item: any) => moment(item.Year).format('YYYY'))
				: type === 'Three Month'
				? data.map((item: any) => moment(item.Quarter).format('L'))
				: type === 'Month'
				? data.map((item: any) => moment(item.Month).format('L'))
				: type === 'Week'
				? data.map((item: any) => moment(item?.['Week Starting']).format('L'))
				: type === 'Day'
				? data.map((item: any) => moment(item?.Day).format('L'))
				: type === 'Interval Of Days'
				? data.map((item: any) => moment(item?.Day).format('L'))
				: '',
		datasets: [
			{
				label: `Forecast (${
					type === 'Year'
						? 'Yearly'
						: type === 'Three Month'
						? 'Three Months'
						: type === 'Month'
						? 'Monthly'
						: type === 'Week'
						? 'Weekly'
						: type === 'Day'
						? 'Daily'
						: type === 'Interval Of Days'
						? 'Daily'
						: ''
				})`,
				data: data.map((item: any) => item.Contacts),
				segment: {
					borderColor: (ctx: any) => {
						const year = +lineData.labels[ctx.p1DataIndex]; // Get the year for the current segment
						const itemYear = +lineData.labels[ctx.p1DataIndex].substr(6); //11/18/2024
						const itemMonth = +lineData.labels[ctx.p1DataIndex].substr(0, 2);
						const itemDay = +lineData.labels[ctx.p1DataIndex].substr(3, 2);

						return (
							type === 'Year'
								? year > currentYear
								: type === 'Three Month'
								? itemYear > currentYear || (itemMonth > currentMonth && itemYear <= currentYear)
								: type === 'Month'
								? itemYear > currentYear || (itemMonth > currentMonth && itemYear >= currentYear)
								: type === 'Week'
								? itemYear > currentYear || (itemMonth > currentMonth && itemDay > currentDay && itemYear >= currentYear)
								: type === 'Day'
								? itemYear > currentYear || (itemMonth > currentMonth && itemDay > currentDay && itemYear >= currentYear)
								: type === 'Interval Of Days'
								? itemYear > currentYear || (itemMonth > currentMonth && itemDay > currentDay && itemYear >= currentYear)
								: ''
						)
							? 'green'
							: 'blue';
					},
				},
				backgroundColor: 'rgba(0, 0, 255, 0.1)',
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: 'Date',
				},
			},
			y: {
				title: {
					display: true,
					text: 'Number Of Calls',
				},
			},
		},
	};

	const exportFormats = [
		{
			key:
				type === 'Year'
					? 'Year'
					: type === 'Three Month'
					? 'Quarter'
					: type === 'Month'
					? 'Month'
					: type === 'Week'
					? 'Week Starting'
					: type === 'Day'
					? 'Day'
					: type === 'Interval Of Days'
					? 'Day'
					: '',
			value: '',
		},
		{ key: 'Number Of Calls', value: '' },
		{ key: 'Growth Rate', value: '' },
	];

	const formatData = (key: string, formating: string) => ({
		[key]: data?.map((item: any) => moment(item[key]).format(formating)),
		'Number Of Calls': data?.map((item: any) => item?.Contacts),
		'Growth Rate': data?.map((item: any) => item?.['Growth Rate']),
	});

	const renderExportButton = () => (
		<ExportChartAsMultiTypes
			chartRef={chartRef}
			statements={{
				labels: data,
				datasets: (() => {
					switch (type) {
						case 'Year':
							return formatData('Year', 'YYYY');
						case 'Three Month':
							return formatData('Quarter', 'L');
						case 'Month':
							return formatData('Month', 'L');
						case 'Week':
							return formatData('Week Starting', 'L');
						case 'Day':
							return formatData('Day', 'L');
						default:
							return {};
					}
				})(),
			}}
			format={exportFormats}
			removeFirstCallByDefault={true}
			fileName={`Forecast (${
				type === 'Year'
					? 'Yearly'
					: type === 'Three Month'
					? 'Three Months'
					: type === 'Month'
					? 'Monthly'
					: type === 'Week'
					? 'Weekly'
					: type === 'Day'
					? 'Daily'
					: type === 'Interval Of Days'
					? 'Daily'
					: ''
			})`}
		/>
	);

	function renderTitle() {
		return (
			<h2 className='text-lg font-bold text-navy-700 dark:text-white'>
				Forecast (
				{type == 'Year'
					? 'Yearly'
					: type == 'Three Month'
					? 'Three Months'
					: type == 'Month'
					? 'Monthly'
					: type == 'Week'
					? 'Weekly'
					: type == 'Day'
					? 'Daily'
					: ''}
				)
			</h2>
		);
	}

	if (loading)
		return (
			<div className=' rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white '>
				<Skeleton className='h-[300px] rounded-xl bg-[#E9EDF5]' />
			</div>
		);

	return (
		<div className='flex flex-col gap-4'>
			<ForecastTable data={forecast} type={type} />

			<EControlledDialog
				isOpen={isOpen}
				setOpen={setIsOpen}
				contentClassName='!max-w-[1200px] sm:max-w-fit sm-max:max-w-fit'
				dialogBody={
					<div>
						<div className='flex justify-between'>
							{renderTitle()}
							<div className='flex gap-2 items-center'>{renderExportButton()}</div>
						</div>
						<Line data={lineData} options={options} ref={chartRef} />
					</div>
				}
			/>

			<div className=' p-[20px] flex flex-col gap-4 col-span-1 md:col-span-1 sm:col-span-2 sm-max:col-span-2 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none  transform transition-transform duration-500 hover:translate-y-[-10px] hover:shadow-[0_0_40px_rgba(8,21,66,0.05)] '>
				<div className='flex justify-between'>
					{renderTitle()}
					<div className='flex gap-2 items-center'>
						<Maximize className='cursor-pointer' onClick={() => setIsOpen(true)} />
						{renderExportButton()}
					</div>
				</div>
				<Line data={lineData} options={options} ref={chartRef} />
			</div>
		</div>
	);
};

export default ForecastResults;
