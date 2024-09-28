import { useFetchDataRQ } from '@/hooks/useFetchDataRQ';
import { dashboardApi } from '@/core';
import StatissticsCardSkeleton from '@/utils/skeletons/statisstics-card-skeleton';
import VStatisticsCard from '@/components/views/dashboards/v-statistics-card';
import { ChartColumn, Files, FolderSync, Gauge, Headset, Users } from 'lucide-react';

const StatisticsCard = () => {
	const {
		data: statsData,
		isLoading: statsLoading,
		isFetching: statsFetching,
	} = useFetchDataRQ({
		queryKey: ['stats'],
		queryFn: () => dashboardApi.stats(),
	});

	const {
		data: countsData,
		isLoading: countsLoading,
		isFetching: countsFetching,
	} = useFetchDataRQ({
		queryKey: ['counts'],
		queryFn: () => dashboardApi.counts(),
	});

	if (statsLoading) return <StatissticsCardSkeleton />;

	return (
		<VStatisticsCard
			items={[
				{ name: 'Offered Calls', value: statsData?.data?.total_offered, icon: <ChartColumn strokeWidth={2.5} /> },
				{ name: 'Answered Calls', value: statsData?.data?.total_answered, icon: <FolderSync strokeWidth={2.5} /> },
				{ name: 'Abandoned Calls', value: statsData?.data?.total_abandoned, icon: <ChartColumn strokeWidth={2.5} /> },
				{ name: 'Average Service Level', value: statsData?.data?.average_sl_percentage * 100 + '%', icon: <Gauge strokeWidth={2.5} /> },
			].concat([
				{ name: 'Call Centers (Clients)', value: countsData?.data?.all_callcenter_count, icon: <Headset strokeWidth={2.5} /> },
				{ name: 'Total Call Centers (Staffs)', value: countsData?.data?.all_staff_count, icon: <Users strokeWidth={2.5} /> },
				{ name: 'Uploaded Files', value: countsData?.data?.all_file_count, icon: <Files strokeWidth={2.5} /> },
			])}
		/>
	);
};

export default StatisticsCard;
