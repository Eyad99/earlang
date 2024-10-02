import { Input, InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import EyeToggleButton from './PasswordField/EyeToggleButton';

export interface TextFieldProps {
	label?: string;
	error?: boolean;
	helperText?: string | any;
	placeholder?: string;
	disabled?: boolean | false;
	show?: boolean;
	click?: () => void;
	divClassName?: string;
}

const TextField: React.FC<InputProps | TextFieldProps> = ({
	label,
	error,
	helperText,
	placeholder,
	disabled,
	show,
	click,
	divClassName = 'mb-2',
	...props
}: any) => {
	return (
		<div className={divClassName}>
			<div className='grid w-full items-center gap-1.5'>
				{label && (
					<Label htmlFor={label} className={`ml-1.5 text-sm font-bold capitalize text-navy-700 dark:text-white`}>
						{label}
					</Label>
				)}

				<div className='relative'>
					<Input
						className={`flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
							error ? '!border-red-500' : ''
						} `}
						disabled={disabled}
						placeholder={placeholder}
						{...props}
					/>

					{(props?.type == 'password' || show) && (
						<div className='absolute top-[12%] left-[88%]'>
							<EyeToggleButton show={show} click={click} />
						</div>
					)}
				</div>
			</div>
			{error && <Label className='ml-1.5 text-red-500'>{helperText}</Label>}
		</div>
	);
};

export default TextField;
