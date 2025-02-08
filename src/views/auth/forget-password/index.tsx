import { ForgetPassword_Req, authApi } from '@/core';
import { useMutateData } from '@/hooks/useMutateData';
import { useNavigate } from 'react-router-dom';
import { LoaderIcon } from 'lucide-react';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import insightsImg from '@/assets/img/others/insights.png';
import TextField from '@/components/reusable/fields/TextField';
import Default from '@/layouts/auth/types/Default';
import * as yup from 'yup';

function ForgetPassword() {
	const navigate = useNavigate();

	const forgetPasswordMutate = useMutateData({
		mutationFn: (data: ForgetPassword_Req) => authApi.forgetPassword(data),
		onSuccessFn: ({ data, variables }) => {
			console.log('data', data);
			navigate(`/auth/verification-code?email=${variables.email}`);
		},
	});

	const initialValues = {
		email: '',
	};

	const handleFormSubmit = (values: any) => {
		forgetPasswordMutate.mutate(values);
	};

	const formSchema = yup.object().shape({
		email: yup.string().required(`email address is required`),
	});

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues,
		onSubmit: handleFormSubmit,
		validationSchema: formSchema,
	});

	return (
		<Default
			maincard={
				<form onSubmit={handleSubmit}>
					<div className='mb-16 md:mt-12 mt-0 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start'>
						<div className='md:mt-[10vh] mt-0 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]'>
							<img src={insightsImg} width={300} className='mb-10 m-auto md:hidden' />
							<h3 className='mb-2.5 text-4xl font-bold text-navy-700 dark:text-white'>Forgot your password?</h3>
							<p className='mb-9 ml-1 text-base text-gray-600'>
								No problem. Just let us know your email address and we'll email you a password reset link that will allow you to choose a
								new one.
							</p>

							<TextField
								label={`email`}
								placeholder={`Email`}
								name='email'
								type='email'
								onBlur={handleBlur}
								value={values.email}
								onChange={handleChange}
								error={!!touched.email && !!errors.email}
								helperText={touched.email && errors.email}
							/>

							<Button variant={'blue'} className='w-full mt-4' disabled={forgetPasswordMutate?.isPending}>
								{forgetPasswordMutate?.isPending ? (
									<div className='flex gap-2'>
										<span>Reset Password</span>
										<LoaderIcon className='animate-spin' />
									</div>
								) : (
									<span>Reset Password</span>
								)}
							</Button>

							<div className='mt-4 flex items-center justify-center gap-1'>
								<span>Return To</span>
								<Link className='text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white' to='/auth/sign-in'>
									Sign in
								</Link>
							</div>
						</div>
					</div>
				</form>
			}
		/>
	);
}

export default ForgetPassword;
