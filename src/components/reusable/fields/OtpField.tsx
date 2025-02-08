import React, { FC, Fragment } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { OTPInputProps } from 'input-otp';

interface InputOtpProps {
	maxLength: number;
	groupNumber?: number;
	slotNumberForEachGroup: number;
	classNameInputGroup?: string;
	classNameInputSlot?: string;
	separator?: boolean;
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
}

const OtpField: FC<InputOtpProps> = ({
	maxLength,
	classNameInputGroup,
	classNameInputSlot,
	groupNumber = 1,
	slotNumberForEachGroup,
	separator = false,
	onBlur,
	onChange,
	value,
}) => {
	const slots = Array.from({ length: slotNumberForEachGroup }, (_, i) => i + 1);

	return (
		<InputOTP maxLength={maxLength} onChange={onChange} onBlur={onBlur} value={value}>
			{Array.from({ length: groupNumber }).map((_, groupIndex) => (
				<Fragment key={groupIndex}>
					<InputOTPGroup className={classNameInputGroup} key={groupIndex}>
						{slots.map((slot) => (
							<InputOTPSlot className={classNameInputSlot} index={slot - 1} key={slot} />
						))}
					</InputOTPGroup>
					{separator && <InputOTPSeparator />}
				</Fragment>
			))}
		</InputOTP>
	);
};

export default OtpField;
