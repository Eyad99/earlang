import { ForgetPassword_Req, VerificationCode_Req, authApi } from '@/core';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutateData } from '@/hooks/useMutateData';
import { LoaderIcon } from 'lucide-react';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import insightsImg from '@/assets/img/others/insights.png';
import OtpField from '@/components/reusable/fields/OtpField';
import Default from '@/layouts/auth/types/Default';
import * as yup from 'yup';

function VerificationCode() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const emailInQueryParam = searchParams.get('email');

	const verificationCodeMutate = useMutateData({
		mutationFn: (data: VerificationCode_Req) => authApi.verificationCode(data),
		onSuccessFn: () => {
			navigate(`/auth/reset-password?email=${emailInQueryParam}`);
		},
	});

	const forgetPasswordMutate = useMutateData({
		mutationFn: (data: ForgetPassword_Req) => authApi.forgetPassword(data),
	});

	const initialValues = {
		email: emailInQueryParam,
		reset_code: '',
	};

	const handleFormSubmit = (values: any) => {
		verificationCodeMutate.mutate(values);
	};

	const formSchema = yup.object().shape({
		reset_code: yup.string().required(`code is required`),
	});

	const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
		initialValues,
		onSubmit: handleFormSubmit,
		validationSchema: formSchema,
	});

	const handleFillCode = (event: number) => {
		setFieldValue('reset_code', event);
	};

	const handleResendCode = () => {
		forgetPasswordMutate.mutate({ email: emailInQueryParam });
	};

	return (
		<Default
			maincard={
				<form onSubmit={handleSubmit}>
					<div className='mb-16 md:mt-12 mt-0 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start'>
						<div className='md:mt-[10vh] mt-0 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]'>
							<img src={insightsImg} width={300} className='mb-10 m-auto md:hidden' />
							<h3 className='mb-2.5 text-4xl font-bold text-navy-700 dark:text-white'>2-Step Verification</h3>
							<p className='mb-9 ml-1 text-base text-gray-600'>Enter your 2-Step Verification email code to unlock!</p>

							<OtpField
								maxLength={4}
								slotNumberForEachGroup={4}
								classNameInputGroup='flex items-center justify-center w-full'
								classNameInputSlot='w-20 h-20 text-2xl'
								onChange={(event: any) => handleFillCode(event)}
								onBlur={handleBlur}
							/>

							{!!touched.reset_code && !!errors.reset_code && (
								<Label className='flex items-center justify-center w-full ml-1.5 text-red-500'>
									{touched.reset_code && errors.reset_code}
								</Label>
							)}

							<Button variant={'blue'} className='w-full mt-4' disabled={verificationCodeMutate?.isPending}>
								{verificationCodeMutate?.isPending ? (
									<div className='flex gap-2'>
										<span>submit</span>
										<LoaderIcon className='animate-spin' />
									</div>
								) : (
									<span>submit</span>
								)}
							</Button>

							<div className='mt-4 flex items-center justify-center gap-1'>
								<span>Haven't received it?</span>
								<span className='text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white'>
									{forgetPasswordMutate?.isPending ? (
										<div className='flex gap-2'>
											<span>Resend a new code</span>
											<LoaderIcon className='animate-spin w-4' />
										</div>
									) : (
										<span onClick={handleResendCode} className='cursor-pointer'>
											{' '}
											Resend a new code
										</span>
									)}
								</span>
							</div>
						</div>
					</div>
				</form>
			}
		/>
	);
}

export default VerificationCode;
