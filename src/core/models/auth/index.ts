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

export interface User_Profile_Res {
	id: number;
	email: string;
	fullname: string;
	profile_image: string;
	role: string;
}

export interface User_Profile_Req {
	fullname: string;
}
export interface User_Profile_Image_Req {
	profile_image: string;
}

export interface CallCenter_Profile_Res extends CallCenter_Profile_Req {
	user: User_Profile_Res;
}

export interface CallCenter_Profile_Req {
	name: string;
	location: string;
	number_of_seats: number;
	number_of_agents: number;
	number_of_supers: number;
	number_of_tls: number;
	total_no_agents: number;
	staff_dedicated_QA: string;
	staff_dedicated_scheduling: string;
	staff_dedicated_training: string;
	it_staff_available: boolean;
	Working_hours: number;
	Working_days: number;
	number_of_skill_groups: number;
	list_of_skill_groups: number;
	notices: string;
	business_type: string;
}
