import { useFetchDataRQ } from '@/hooks/useFetchDataRQ';
import { dashboardApi } from '@/core';
import StatissticsCardSkeleton from '@/utils/skeletons/statisstics-card-skeleton';
import VStatisticsCard from '@/components/views/dashboards/v-statistics-card';

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
				{ name: 'Service Level', value: 80 + '%' },
				{ name: 'Abandons', value: 15 },
				{ name: 'Answers', value: 122 },
				{ name: 'Offers', value: 1 },
			].concat([
				{ name: 'Files', value: 200 },
				{ name: 'Staff', value: 20 },
			])}
		/>
	);
};

export default StatisticsCard;
