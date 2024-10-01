import { KEY_TOKEN_COOKIE, KEY_USER_COOKIE } from '@/variables/constants';
import { SignIn_Req, authApi } from '@/core';
import { useMutateData } from '@/hooks/useMutateData';
import { useNavigate } from 'react-router-dom';
import { LoaderIcon } from 'lucide-react';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PasswordField from '@/components/reusable/fields/PasswordField';
import insightsImg from '@/assets/img/others/insights.png';
import TextField from '@/components/reusable/fields/TextField';
import Cookies from 'js-cookie';
import Default from '@/layouts/auth/types/Default';
import * as yup from 'yup';

function SignIn() {
	const navigate = useNavigate();

	const signInMutate = useMutateData({
		mutationFn: (data: SignIn_Req) => authApi.signIn(data),
		onSuccessFn: ({ data }) => {
			Cookies.set(KEY_TOKEN_COOKIE, data.data.token?.token);
			Cookies.set(
				KEY_USER_COOKIE,
				JSON.stringify({
					id: data?.data?.userId,
					email: data?.data?.email,
					role: data?.data?.Role,
					name: data?.data?.fullname,
					callCenterId: data?.data?.['callcenter.id'],
				})
			);

			switch (data?.data?.Role) {
				case 'superadmin':
					navigate('/admin/dashboard');
					break;
				case 'administrator':
					navigate('/admin/dashboard');
					break;
				case 'customer':
					navigate('/customer/dashboard');
					break;
				case 'staff':
					navigate('/staff/dashboard');
					break;

				default:
					break;
			}
		},
	});

	const initialValues = {
		email: '',
		password: '',
	};

	const handleFormSubmit = (values: any) => {
		signInMutate.mutate(values);
	};

	const formSchema = yup.object().shape({
		email: yup.string().required(`email address is required`),
		password: yup
			.string()
			.matches(/^(?=.{8,})/, `must contain 8 character`)
			.required(`password is required`),
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
					<div className='mb-16 md:mt-12 mt-0 flex  h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start'>
						<div className='md:mt-[10vh] mt-0 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]'>
							<img src={insightsImg} width={300} className='mb-10 m-auto md:hidden' />

							<h3 className='mb-2.5 text-4xl font-bold text-navy-700 dark:text-white'>Sign In</h3>
							<p className='mb-9 ml-1 text-base text-gray-600'>Enter your email and password to sign in!</p>

							<TextField
								label={`email`}
								name='email'
								type='email'
								onBlur={handleBlur}
								value={values.email}
								onChange={handleChange}
								error={!!touched.email && !!errors.email}
								helperText={touched.email && errors.email}
							/>

							<PasswordField
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.password}
								touched={touched.password}
								errors={errors.password}
								label={`password`}
							/>

							<div className='mb-4 flex items-center justify-end px-2'>
								<Link className='text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white' to='/auth/forget-password'>
									Forgot Password?
								</Link>
							</div>

							<Button variant={'blue'} className='w-full mt-4' disabled={signInMutate?.isPending}>
								{signInMutate?.isPending ? (
									<div className='flex gap-2'>
										<span>Sign in</span>
										<LoaderIcon className='animate-spin' />
									</div>
								) : (
									<span>Sign in</span>
								)}
							</Button>

							<div className='mt-4 flex items-center gap-1'>
								<span>Not registered yet?</span>
								<Link className='text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white' to='/auth/sign-up'>
									Create an account
								</Link>
							</div>
						</div>
					</div>
				</form>
			}
		/>
	);
}

export default SignIn;
