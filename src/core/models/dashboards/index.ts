export interface Stats_Res {
	total_offered: number;
	total_answered: number;
	total_abandoned: number;
	average_sl_percentage: number;
}

export interface Counts_Res {
	all_callcenter_count: number;
	all_staff_count: number;
	all_file_count: number;
}

export interface Call_Stats_Res {
	labels: Array<string | number>;
	datasets: {
		[key: string]: Array<string | number>;
	};
}

export interface Count_Files_ALL_CallCenter_Res {
	name: string;
	xlfile_count: number;
}

export interface Stats_CallCenter_Res {
	total_offered: number;
	total_answered: number;
	total_abandoned: number;
	avg_sl_percentage: number;
	avg_sl_seconds: number;
	max_agents: number;
	avg_asa: number;
	avg_occ: number;
	avg_pw: number;
}
