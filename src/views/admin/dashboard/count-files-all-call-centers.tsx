import VCountFilesAllCallCenters from '@/components/views/dashboards/v-count-files-all-call-centers';
import { useFetchDataRQ } from '@/hooks/useFetchDataRQ';
import { dashboardApi } from '@/core';
import CountFilesAllCallCentersSkeleton from '@/utils/skeletons/count-files-all-call-centers-skeleton';

const CountFilesAllCallCenters = () => {
	const { data, isLoading, isFetching } = useFetchDataRQ({
		queryKey: ['countFilesAllCallCenters'],
		queryFn: () => dashboardApi.countFilesAllCallCenters(),
	});

	if (isLoading) return <CountFilesAllCallCentersSkeleton />;
	return <VCountFilesAllCallCenters statements={data?.data} />;
};

export default CountFilesAllCallCenters;
