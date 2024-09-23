import React, { FC } from 'react';
import ChartLister from './lister';
import Charts from './charts';

interface ChartProps {
	fileId: string;
}

const Chart: FC<ChartProps> = ({ fileId }) => {
	return (
		<div className='flex flex-col gap-4'>
			<Charts fileId={fileId} />
			<ChartLister fileId={fileId} />
		</div>
	);
};

export default Chart;
