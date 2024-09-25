import Card from '@/components/reusable/card';
import Charts from '@/components/views/files/chart/charts';
import ChartLister from '@/components/views/files/chart/lister';
import { fileApi } from '@/core/services/files';
import { useFetchDataRQ } from '@/hooks/useFetchDataRQ';
import withLoading from '@/hooks/withLoader';
import React from 'react';
import { useParams } from 'react-router-dom';

const BoxWithLoading = withLoading(Card);
const Report = () => {
	const { fileId } = useParams();

	const { data, isLoading, isFetching } = useFetchDataRQ({
		queryKey: [`file-report-${fileId}`],
		queryFn: () => fileApi.getFileDetails(fileId),
	});

	if (isLoading) return <BoxWithLoading loading={isLoading} size={32}></BoxWithLoading>;

	return (
		<div className='flex flex-col gap-6'>
			<Charts data={data?.data} />
			<ChartLister fileId={fileId} />
		</div>
	);
};

export default Report;
