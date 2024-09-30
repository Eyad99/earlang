import { useFetchDataRQ } from '@/hooks/useFetchDataRQ';
import { dashboardApi } from '@/core';
import StatissticsCardSkeleton from '@/utils/skeletons/statisstics-card-skeleton';
import VStatisticsCard from '@/components/views/dashboards/v-statistics-card';
import { Gauge, ChartColumn, FolderSync, Files, Users, Percent } from 'lucide-react';
import { useParams } from 'react-router-dom';

const StatisticsCard = () => {
	const { callCenterId } = useParams();
	const {
		data: statsCallCenterByIdData,
		isLoading: statsCallCenterByIdLoading,
		isFetching: statsCallCenterByIdFetching,
	} = useFetchDataRQ({
		queryKey: ['statsCallCenters', callCenterId],
		queryFn: () => dashboardApi.statsCallCenters(callCenterId),
		enableCondition: callCenterId ? true : false,
	});

	if (callCenterId ? statsCallCenterByIdLoading : false) return <StatissticsCardSkeleton numberCell={9} />;

	return (
		<VStatisticsCard
			items={[
				{ name: 'Offered Calls', value: statsCallCenterByIdData?.data?.total_offered ?? 0, icon: <ChartColumn strokeWidth={2.5} /> },
				{ name: 'Answered Calls', value: statsCallCenterByIdData?.data?.total_answered ?? 0, icon: <FolderSync strokeWidth={2.5} /> },
				{ name: 'Abandoned Calls', value: statsCallCenterByIdData?.data?.total_abandoned ?? 0, icon: <ChartColumn strokeWidth={2.5} /> },
				{
					name: 'Average Service Level',
					value: (statsCallCenterByIdData?.data?.avg_sl_percentage ?? 0 * 100).toFixed(2) + '%',
					icon: <Gauge strokeWidth={2.5} />,
				},
				{
					name: 'Average Service Level',
					value: (statsCallCenterByIdData?.data?.avg_sl_seconds ?? 0).toFixed(2) + '%',
					icon: <Gauge strokeWidth={2.5} />,
				},
				{ name: 'Max Agents', value: statsCallCenterByIdData?.data?.max_agents ?? 0, icon: <ChartColumn strokeWidth={2.5} /> },
				{ name: 'Avg Asa', value: statsCallCenterByIdData?.data?.avg_asa.toFixed(2) ?? 0, icon: <Percent strokeWidth={2.5} /> },
				{
					name: 'Avg Occupency',
					value: (statsCallCenterByIdData?.data?.avg_occ ?? 0 * 100).toFixed(2) + '%',
					icon: <Percent strokeWidth={2.5} />,
				},
				{
					name: 'Avg Pw',
					value: (statsCallCenterByIdData?.data?.avg_pw ?? 0 * 100).toFixed(2) + '%',
					icon: <Percent strokeWidth={2.5} />,
				},
			]}
		/>
	);
};

export default StatisticsCard;
