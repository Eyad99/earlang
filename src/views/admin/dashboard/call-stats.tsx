import { useFetchDataRQ } from '@/hooks/useFetchDataRQ';
import { dashboardApi } from '@/core';
import CountFilesAllCallCentersSkeleton from '@/utils/skeletons/count-files-all-call-centers-skeleton';
import VCallStats from '@/components/views/dashboards/v-call-stats';

const CallStats = () => {
	const { data, isLoading, isFetching } = useFetchDataRQ({
		queryKey: ['callStats'],
		queryFn: () => dashboardApi.callStats(),
	});

	if (isLoading) return <CountFilesAllCallCentersSkeleton />;
	return <VCallStats statements={data?.data} />;
};

export default CallStats;
