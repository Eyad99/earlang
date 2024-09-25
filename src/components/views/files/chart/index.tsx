import { FC, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import downloadFile from '@/utils/helpers/downloadFile';
import ChartLister from './lister';
import Charts from './charts';

interface ChartProps {
	fileId: string;
	fileUrl: string;
}

const Chart: FC<ChartProps> = ({ fileId, fileUrl }) => {
	console.log('fileId', fileId);
	const [listMode, setListMode] = useState(false);

	return (
		<div>
			<div className='flex items-center space-x-2'>
				<Switch id='airplane-mode' checked={listMode} onCheckedChange={(checked: boolean) => setListMode(checked)} />
				<Label htmlFor={listMode ? 'Chart' : 'Lister'}>{listMode ? 'Chart' : 'Lister'}</Label>
				<Button
					variant={'link'}
					className='text-blueSecondary/90'
					onClick={() => {
						downloadFile(fileUrl);
					}}
				>
					Download
				</Button>
			</div>
			{/* {!listMode ? <ChartLister fileId={fileId} /> : <Charts fileId={fileId} />} */}
		</div>
	);
};

export default Chart;
