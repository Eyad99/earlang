export interface Users_Res {
	id: number;
	fullname: string;
	email: string;
	role: string;
	profile_image: string;
	is_active: boolean;
}

export interface Update_Role_To_User {
	role: string;
}

export interface Staff_Res {
	id: number;
	user: Users_Res;
	callcenter: {
		id: number;
		user: number;
		name: string;
		location: string | null;
	};
	created_at: string;
	updated_at: string;
}

export interface Staff_Req {
	email: string;
	fullname: string;
	password: string;
	password2: string;
}
