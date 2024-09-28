import CallStats from './call-stats';
import CountFilesAllStaffs from './count-files-all-staffs';
import DemonstratingOffered from './demonstrating-offered';
import StatisticsCard from './statistics-card';

const Dashboard = () => {
	return (
		<div className='flex flex-col gap-4'>
			<StatisticsCard />
			<div className='grid grid-cols-2 gap-5 md:grid-cols-2 sm:grid-cols-1 sm-max:grid-cols-1'>
				<CallStats />
				<CountFilesAllStaffs />
				<DemonstratingOffered />
			</div>
		</div>
	);
};

export default Dashboard;
