export interface SignIn_Req {
	username: string;
	password: string;
}

export interface SignUp_Req {
	customer: string;
	email: string;
	password: string;
	password2: string;
}

export interface ForgetPassword_Req {
	email: string;
}

export interface VerificationCode_Req {
	email: string;
	code: string;
}

export interface ResetPassword_Req {
	email: string;
	password: string;
	password2: string;
	fullname: string;
}

export interface Profile_Res {
	id: number;
	email: string;
	fullname: string;
	profile_image: string;
	role: string;
}

export interface Profile_Req {
	fullname: string;
}
export interface Profile_Image_Req {
	profile_image: string;
}
