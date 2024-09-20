import { ForgetPassword_Req, ResetPassword_Req, SignIn_Req, SignUp_Req, VerificationCode_Req } from '@/core/models';
import { post, get } from '@/utils/api';

export const authApi = {
	signIn: (data: SignIn_Req) => post(`auth/login/`, data),
	signUp: (data: SignUp_Req) => post('auth/register/', data),
	logout: () => post('auth/logout/'),
	forgetPassword: (data: ForgetPassword_Req) => post('auth/send-reset-password-email/', data),
	verificationCode: (data: VerificationCode_Req) => post('auth/check-reset-code/', data),
	resetPassword: (data: ResetPassword_Req) => post('auth/reset-changepassword/', data),
};
