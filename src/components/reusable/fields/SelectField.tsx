import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { FC, Fragment } from 'react';

interface SelectFieldProps {
	name: string;
	value?: string | undefined;
	label?: string;
	elements?: [] | any;
	disabled?: boolean;
	errors?: any;
	error?: any;
	helperText?: any;
	triggerClassName?: string;
	placeholder?: string;
	onChange: any;
}

const SelectField: FC<SelectFieldProps> = ({
	name,
	value,
	label,
	elements,
	errors,
	error,
	helperText,
	disabled,
	triggerClassName,
	placeholder,
	onChange,
}) => {
	return (
		<Fragment>
			{label && (
				<Label htmlFor={label} className={`ml-1.5 text-sm font-bold capitalize text-navy-700 dark:text-white`}>
					{label}
				</Label>
			)}
			<Select name={name} value={value} onValueChange={onChange}>
				<SelectTrigger className={`${triggerClassName} ${error ? 'border-red-500' : ''}`}>
					<SelectValue className='text-themeBoldGrey' placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{elements.map((item: any) => (
						<SelectItem key={item.id} value={item.name}>
							{item.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			{error && <Label className='ml-1.5 text-red-500'>{errors}</Label>}
		</Fragment>
	);
};

export default SelectField;
