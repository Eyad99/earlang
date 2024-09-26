import { useFetchDataRQ } from '@/hooks/useFetchDataRQ';
import { dashboardApi } from '@/core';
import StatissticsCardSkeleton from '@/utils/skeletons/statisstics-card-skeleton';
import VStatisticsCard from '@/components/views/dashboards/v-statistics-card';
import { Gauge, ChartColumn, FolderSync, Files, Users } from 'lucide-react';

const StatisticsCard = () => {
	// const {
	// 	data: statsData,
	// 	isLoading: statsLoading,
	// 	isFetching: statsFetching,
	// } = useFetchDataRQ({
	// 	queryKey: ['stats'],
	// 	queryFn: () => dashboardApi.stats(),
	// });

	// const {
	// 	data: countsData,
	// 	isLoading: countsLoading,
	// 	isFetching: countsFetching,
	// } = useFetchDataRQ({
	// 	queryKey: ['counts'],
	// 	queryFn: () => dashboardApi.counts(),
	// });

	// if (statsLoading) return <StatissticsCardSkeleton />;

	return (
		<VStatisticsCard
			items={[
				{ name: 'Service Level', value: 80 + '%', icon: <Gauge strokeWidth={2.5} /> },
				{ name: 'Abandons', value: 15, icon: <ChartColumn strokeWidth={2.5} /> },
				{ name: 'Answers', value: 155, icon: <FolderSync strokeWidth={2.5} /> },
				{ name: 'Offers', value: 15, icon: <ChartColumn strokeWidth={2.5} /> },
			].concat([
				{ name: 'Files', value: 200, icon: <Files strokeWidth={2.5} /> },
				{ name: 'Staffs', value: 20, icon: <Users strokeWidth={2.5} /> },
			])}
		/>
	);
};

export default StatisticsCard;
