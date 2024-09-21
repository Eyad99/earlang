import { Users_Res } from "../users";

export interface Files_Res {}

export interface Files_Req {
	period_in_m: number;
	tat_in_s: number;
	aht_in_s: number;
	sla: number;
	file: Array<any>;
}

export interface Files_By_User_Res {
	id: number;
	user: Users_Res;
	callcenter: {
		id: number;
		user: number;
		name: string;
		location: string | null;
	};

	period_in_m: number;
	tat_in_s: number;
	aht_in_s: number;
	sla: number;
	xlfile: {
		id: number;
		xlfile: string;
		callcenterxls: number;
		created_at: string;
	}[];
}
