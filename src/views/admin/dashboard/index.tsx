import StatisticsCard from './statistics-card';
import CountFilesAllCallCenters from './count-files-all-call-centers';
import CallStats from './call-stats';

const Dashboard = () => {
	return (
		<div className='flex flex-col gap-4'>
			<StatisticsCard />
			<div className='grid grid-cols-2 gap-5 md:grid-cols-2 sm:grid-cols-1 sm-max:grid-cols-1'>
				<CallStats />
				<CountFilesAllCallCenters />
			</div>
		</div>
	);
};

export default Dashboard;
