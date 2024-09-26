import { KEY_TOKEN_COOKIE, KEY_USER_COOKIE } from '@/variables/constants';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ResetPassword_Req, authApi } from '@/core';
import { useMutateData } from '@/hooks/useMutateData';
import { LoaderIcon } from 'lucide-react';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import PasswordField from '@/components/reusable/fields/PasswordField';
import insightsImg from '@/assets/img/others/insights.png';
import Default from '@/layouts/auth/types/Default';
import Cookies from 'js-cookie';
import * as yup from 'yup';

function ResetPassword() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const emailInQueryParam = searchParams.get('email');

	const resetPasswordMutate = useMutateData({
		mutationFn: (data: ResetPassword_Req) => authApi.resetPassword(data),
		onSuccessFn: ({ data }) => {
			Cookies.set(KEY_TOKEN_COOKIE, data.data.token?.token);
			Cookies.set(
				KEY_USER_COOKIE,
				JSON.stringify({ id: data?.data?.userId, email: data?.data?.email, role: data?.data?.Role, name: data?.data?.fullname })
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
		email: emailInQueryParam,
		password: '',
		password2: '',
	};

	const handleFormSubmit = (values: any) => {
		resetPasswordMutate.mutate(values);
	};

	const formSchema = yup.object().shape({
		password: yup
			.string()
			.matches(/^(?=.{8,})/, `must contain 8 character`)
			.required(`password is required`),
		password2: yup
			.string()
			.matches(/^(?=.{8,})/, `must contain 8 character`)
			.oneOf([yup.ref('password')], `passwords must match`)
			.required(`confirm password is required`),
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
							<h3 className='mb-2.5 text-4xl font-bold text-navy-700 dark:text-white'>Reset Password</h3>
							<p className='mb-9 ml-1 text-base text-gray-600'>Enter your password to unlock your account!</p>

							<PasswordField
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.password}
								touched={touched.password}
								errors={errors.password}
								label={`password`}
							/>

							<PasswordField
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.password2}
								touched={touched.password2}
								errors={errors.password2}
								label={`confirm password`}
								name={`password2`}
							/>

							<Button variant={'blue'} className='w-full mt-4' disabled={resetPasswordMutate?.isPending}>
								{resetPasswordMutate?.isPending ? (
									<div className='flex gap-2'>
										<span>reset password</span>
										<LoaderIcon className='animate-spin' />
									</div>
								) : (
									<span>reset password</span>
								)}
							</Button>
						</div>
					</div>
				</form>
			}
		/>
	);
}

export default ResetPassword;
