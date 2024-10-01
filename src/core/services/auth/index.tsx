import {
	CallCenter_Profile_Req,
	ForgetPassword_Req,
	ResetPassword_Req,
	SignIn_Req,
	SignUp_Req,
	User_Profile_Image_Req,
	User_Profile_Req,
	VerificationCode_Req,
} from '@/core/models';
import { post, get, patch, put } from '@/utils/api';

export const authApi = {
	signIn: (data: SignIn_Req) => post(`auth/login/`, data),
	signUp: (data: SignUp_Req) => post('auth/register/', data),
	logout: () => post('auth/logout/'),
	forgetPassword: (data: ForgetPassword_Req) => post('auth/send-reset-password-email/', data),
	verificationCode: (data: VerificationCode_Req) => post('auth/check-reset-code/', data),
	resetPassword: (data: ResetPassword_Req) => post('auth/reset-changepassword/', data),

	callCenterProfile: (callCenterId: string) => get(`auth/callcenter/${callCenterId}/`),
	updateCallCenterProfile: (data: CallCenter_Profile_Req, callCenterId: string) => patch(`auth/update-callcenter/${callCenterId}/`, data),
	userProfile: () => get(`auth/user/my-profile/`),
	updateUserProfile: (data: User_Profile_Req) => put(`auth/user/my-profile/update/`, data),
	updateUserImage: (data: User_Profile_Image_Req) => put(`auth/user/update-image/`, data),
};
