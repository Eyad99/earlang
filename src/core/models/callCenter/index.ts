import { Users_Res } from '../users';

export interface CallCenter_Res {
	id: string;
	user: Users_Res;
	plan: {
		id: number;
		name: string;
	};
	economice: {
		id: number;
		name: string;
	};
	name: string;
	business_type: string;
	location: string;
	number_of_seats: number;
	number_of_agents: number;
	number_of_supers: number;
	number_of_tls: number;
	total_no_agents: number;
	staff_dedicated_QA: string;
	staff_dedicated_scheduling: string;
	staff_dedicated_training: string;
	it_staff_available: string;
	Working_hours: number;
	Working_days: number;
	number_of_skill_groups: number;
	list_of_skill_groups: string;
	notices: string;
}

export interface CallCenter_C_Req {
	name: string;
	business_type: string;
	location: string;
	number_of_seats: number;
	number_of_agents: number;
	number_of_supers: number;
	number_of_tls: number;
	total_no_agents: number;
	staff_dedicated_QA: string;
	staff_dedicated_scheduling: string;
	staff_dedicated_training: string;
	it_staff_available: string;
	Working_hours: number;
	Working_days: number;
	number_of_skill_groups: number;
	list_of_skill_groups: string;
	notices: string;
}

export interface CallCenter_U_Req extends CallCenter_C_Req {}
