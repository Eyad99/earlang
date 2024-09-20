export interface Files_Res {}

export interface Files_Req {
	period_in_m: number;
	tat_in_s: number;
	aht_in_s: number;
	sla: number;
	file: Array<any>;
}
