import { Users_Res } from '../users';

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

export interface Chart_Res {
	datecalavg: string;
	from_time: string;
	to_time: string;
	totall_Offered: number;
	totall_answered: number;
	totall_abandoned: number;
	sl_xpercentage: number;
	sl_xseconds: number;
	callavg_talk_time: string;
	callavg_after_call_work: string;
	callavg_abandom: string;
	aggent_scheduled: number;
	aggent_logged_in: number;
	aggent_available: number;
	agents: number;
	sl: number;
	sl_target: number;
	asa: number;
	imm_answ: number;
	pw: number;
	occ: number;
	max_call: number;
	created_at: string;
}
