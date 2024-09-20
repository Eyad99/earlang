import React, { FC, useCallback, useState } from 'react';
import TextField from '../TextField';

type PasswordFieldProps = {
	onBlur: {
		(e: React.FocusEvent<any>): void;
		<T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
	};
	onChange: {
		(e: React.ChangeEvent<any>): void;
		<T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
			? void
			: (e: string | React.ChangeEvent<any>) => void;
	};
	value?: string;
	touched?: boolean;
	errors?: string;
	name?: string;
	label?: string | any;
};

const PasswordField: FC<PasswordFieldProps> = ({ onBlur, onChange, value, touched, errors, name = 'password', label = 'password' }) => {
	const [passwordVisibility, setPasswordVisibility] = useState(false);

	const togglePasswordVisibility = useCallback(() => {
		setPasswordVisibility((visible) => !visible);
	}, []);

	return (
		<div className='relative'>
			<TextField
				label={label}
				name={name}
				autoComplete='on'
				onBlur={onBlur}
				onChange={onChange}
				value={value}
				type={passwordVisibility ? 'text' : 'password'}
				error={!!touched && !!errors}
				helperText={touched && errors}
				show={passwordVisibility}
				click={togglePasswordVisibility}
			/>
		</div>
	);
};

export default PasswordField;
