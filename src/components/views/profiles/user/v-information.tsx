import FormBuilder from '@/components/formBuilder';
import Card from '@/components/reusable/card';
import { FC } from 'react';

interface VInformationProps {
	formBuilderArgs: any;
}
const VInformation: FC<VInformationProps> = ({ formBuilderArgs }) => {
	return (
		<Card extra={'w-full !p-5'}>
			{/* Header */}
			<div className='w-full px-[8px]'>
				<h4 className='text-xl font-bold text-navy-700 dark:text-white'>Account Settings</h4>
				<p className='mt-1 text-base text-gray-600'>Here you can change user account information</p>
			</div>

			<FormBuilder {...formBuilderArgs} />
		</Card>
	);
};

export default VInformation;
