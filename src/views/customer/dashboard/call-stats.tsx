import { useFetchDataRQ } from '@/hooks/useFetchDataRQ';
import { dashboardApi } from '@/core';
import CountFilesAllCallCentersSkeleton from '@/utils/skeletons/count-files-all-call-centers-skeleton';
import VCallStats from '@/components/views/dashboards/v-call-stats';

const CallStats = () => {
	// const { data, isLoading, isFetching } = useFetchDataRQ({
	// 	queryKey: ['callStats'],
	// 	queryFn: () => dashboardApi.callStats(),
	// });

	// if (isLoading) return <CountFilesAllCallCentersSkeleton />;
	return (
		<VCallStats
			statements={{
				labels: ['2024-09-17T00:00:00Z', '2024-09-22T00:00:00Z', '2024-09-23T00:00:00Z', '2024-09-24T00:00:00Z', '2024-09-25T00:00:00Z'],
				datasets: {
					agents: [37.36805555555556, 37.145833333333336, 35.143229166666664, 34.3125, 34.3125],
					service_level: [0.8549725840131744, 0.8583682681895977, 0.5393330671968369, 0.4126706888353842, 0.4126706888353842],
					average_speed_of_answer: [28.139190585438172, 18.347182909185424, 94.89176504220059, 123.26133245633294, 123.261332456333],
					occupancy: [0.6239315620543718, 0.6255845473971866, 0.7316717709127208, 0.7749413835400666, 0.7749413835400666],
				},
			}}
		/>
	);
};

export default CallStats;
