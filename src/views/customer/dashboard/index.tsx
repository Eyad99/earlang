import CallStats from './call-stats';
import CountFilesAllStaffs from './count-files-all-staffs';
import DemonstratingOffered from './demonstrating-offered';
import StatisticsCard from './statistics-card';

const Dashboard = () => {
	return (
		<div className='flex flex-col gap-4'>
			{/* <StatisticsCard /> */}
			<div className='grid grid-cols-1'>
				<DemonstratingOffered />
			</div>
			<div className='grid gap-5 md:grid-cols-2 grid-cols-1'>
				<CallStats />
				<CountFilesAllStaffs />
			</div>
		</div>
	);
};

export default Dashboard;
