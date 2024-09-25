import { useFetchDataRQ } from '@/hooks/useFetchDataRQ';
import { dashboardApi } from '@/core';
import StatissticsCardSkeleton from '@/utils/skeletons/statisstics-card-skeleton';
import VStatisticsCard from '@/components/views/dashboards/v-statistics-card';

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
				{ name: 'Service Level', value: statsData?.data?.average_sl_percentage * 100 + '%' },
				{ name: 'Abandons', value: statsData?.data?.total_abandoned },
				{ name: 'Answers', value: statsData?.data?.total_answered },
				{ name: 'Offers', value: statsData?.data?.total_offered },
			].concat([
				{ name: 'Call Centers', value: countsData?.data?.all_callcenter_count },
				{ name: 'Files', value: countsData?.data?.all_file_count },
				{ name: 'Staff', value: countsData?.data?.all_staff_count },
			])}
		/>
	);
};

export default StatisticsCard;
