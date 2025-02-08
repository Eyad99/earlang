import { InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

export interface TextAreaFieldProps {
	label?: string;
	error?: boolean;
	helperText?: string | any;
	placeholder?: string;
	disabled?: boolean | false;
}

const TextAreaField: React.FC<InputProps | TextAreaFieldProps> = ({ label, error, helperText, placeholder, disabled, ...props }: any) => {
	return (
		<div className={'mb-2'}>
			<div className='grid w-full items-center gap-1.5'>
				{label && (
					<Label htmlFor={label} className={`ml-1.5 text-sm font-bold capitalize text-navy-700 dark:text-white`}>
						{label}
					</Label>
				)}

				<Textarea
					className={`   rounded-xl border bg-white/0    ${error ? 'resize-none !border-red-500' : 'resize-none'} `}
					disabled={disabled}
					placeholder={placeholder}
					{...props}
				/>
			</div>
			{error && <Label className='ml-1.5 text-red-500'>{helperText}</Label>}
		</div>
	);
};

export default TextAreaField;
