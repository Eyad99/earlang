export interface Setting_Res {
	id: number;
	count_files: number;
	count_users: number;
}

export interface Setting_Req {
	count_files: number;
	count_users: number;
}

export interface Update_Setting_Req extends Setting_Req {
	id: number;
}
