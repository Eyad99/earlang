import CallStats from './call-stats';
import StatisticsCard from './statistics-card';

const Dashboard = () => {
	return (
		<div className='flex flex-col gap-4'>
			<StatisticsCard />
			<div className='grid grid-cols-2 gap-5 md:grid-cols-2 sm:grid-cols-1 sm-max:grid-cols-1'>
				<CallStats />
			</div>
		</div>
	);
};

export default Dashboard;
