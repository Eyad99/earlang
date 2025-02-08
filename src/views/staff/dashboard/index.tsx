import CallStats from './call-stats';
import StatisticsCard from './statistics-card';

const Dashboard = () => {
	return (
		<div className='flex flex-col gap-4'>
			{/* <StatisticsCard /> */}
			<div className='grid  gap-5  grid-cols-1'>
				<CallStats />
			</div>
		</div>
	);
};

export default Dashboard;
