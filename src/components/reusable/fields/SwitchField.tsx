import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FormikErrors } from 'formik';

export interface SwitchFieldProps {
	label?: string;
	error?: boolean;
	checked?: boolean;
	onChange?: (files: any) => Promise<void> | Promise<FormikErrors<any>>;
	helperText?: string | any;
	divClassName?: string;
}

const SwitchField: React.FC<SwitchFieldProps> = ({ label, error, checked, onChange, helperText, divClassName = 'mb-2' }: any) => {
	return (
		<div className={divClassName}>
			<div className='grid w-full items-center gap-1.5'>
				{label && (
					<Label htmlFor={label} className={`ml-1.5 text-sm font-bold capitalize text-navy-700 dark:text-white`}>
						{label}
					</Label>
				)}

				<Switch checked={checked} onCheckedChange={onChange} />
			</div>
			{error && <Label className='ml-1.5 text-red-500'>{helperText}</Label>}
		</div>
	);
};

export default SwitchField;
