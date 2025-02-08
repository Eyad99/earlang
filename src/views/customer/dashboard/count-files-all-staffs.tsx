import VCountFilesAllStaffs from '@/components/views/dashboards/v-count-files-all-staffs';

const CountFilesAllStaffs = () => {
	return (
		<VCountFilesAllStaffs
			statements={[
				{ name: 'eyad', xlfile_count: 2 },
				{ name: 'fadi', xlfile_count: 20 },
				{ name: 'hadi', xlfile_count: 12 },
				{ name: 'deaa', xlfile_count: 4 },
				{ name: 'nadia', xlfile_count: 55 },
				{ name: 'lubna', xlfile_count: 1 },
			]}
		/>
	);
};

export default CountFilesAllStaffs;
