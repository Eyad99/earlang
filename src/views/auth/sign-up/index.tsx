import { SignUp_Req, authApi } from '@/core';
import { useMutateData } from '@/hooks/useMutateData';
import { useNavigate } from 'react-router-dom';
import { LoaderIcon } from 'lucide-react';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PasswordField from '@/components/reusable/fields/PasswordField';
import insightsImg from '@/assets/img/others/insights.png';
import TextField from '@/components/reusable/fields/TextField';
import Default from '@/layouts/auth/types/Default';
import * as yup from 'yup';

function SignUp() {
	const navigate = useNavigate();

	const signUpMutate = useMutateData({
		mutationFn: (data: SignUp_Req) => authApi.signUp(data),
		onSuccessFn: () => {
			navigate('/auth/sign-in');
		},
	});

	const initialValues = {
		fullname: '',
		callcenter: '',
		email: '',
		password: '',
		password2: '',
	};

	const handleFormSubmit = (values: any) => {
		signUpMutate.mutate(values);
	};

	const formSchema = yup.object().shape({
		fullname: yup.string().required(`name is required`),
		callcenter: yup.string().required(`call center is required`),
		email: yup.string().required(`email address is required`),
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

							<h3 className='mb-2.5 text-4xl font-bold text-navy-700 dark:text-white'>Sign Up</h3>
							<p className='mb-9 ml-1 text-base text-gray-600'>Enter your email and password to sign up!</p>

							<TextField
								label={`name`}
								placeholder={`Name`}
								name='fullname'
								type='text'
								onBlur={handleBlur}
								value={values.fullname}
								onChange={handleChange}
								error={!!touched.fullname && !!errors.fullname}
								helperText={touched.fullname && errors.fullname}
							/>

							<TextField
								label={`call center`}
								placeholder={`Call Center`}
								name='callcenter'
								type='text'
								onBlur={handleBlur}
								value={values.callcenter}
								onChange={handleChange}
								error={!!touched.callcenter && !!errors.callcenter}
								helperText={touched.callcenter && errors.callcenter}
							/>

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

							<PasswordField
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.password}
								touched={touched.password}
								errors={errors.password}
								label={`password`}
								name={`password`}
								placeholder={`Password`}
							/>

							<PasswordField
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.password2}
								touched={touched.password2}
								errors={errors.password2}
								label={`confirm password`}
								name={`password2`}
								placeholder={`Confirm Password`}
							/>

							<Button variant={'blue'} className='w-full mt-4' disabled={signUpMutate?.isPending}>
								{signUpMutate?.isPending ? (
									<div className='flex gap-2'>
										<span>Sign Up</span>
										<LoaderIcon className='animate-spin' />
									</div>
								) : (
									<span>Sign Up</span>
								)}
							</Button>

							<div className='mt-4 flex items-center justify-center gap-1'>
								<span>Already a member?</span>
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

export default SignUp;
