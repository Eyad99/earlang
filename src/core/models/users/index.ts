export interface Users_Res {
	id: number;
	fullname: string;
	email: string;
	role: string;
	profile_image: string;
}

export interface Update_Role_To_User {
	role: string;
}

export interface CallCenter_Res {
	id: number;
	user: Users_Res;
	name: string;
	location: string | null;
	number_of_seats: number | null;
	number_of_agents: number | null;
	number_of_supers: number | null;
	number_of_tls: number | null;
	total_no_agents: number | null;
	staff_dedicated_QA: string | null;
	staff_dedicated_scheduling: string | null;
	staff_dedicated_training: string | null;
	it_staff_available: boolean | null;
	Working_hours: number | null;
	Working_days: number | null;
	number_of_skill_groups: number | null;
	list_of_skill_groups: number | null;
	notices: string | null;
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
