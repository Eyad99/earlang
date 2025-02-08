export interface Formula_One {
	calls_answered: number | string;
	total_calls: number | string;
}

export interface Formula_Tow {
	calls_answered: number | string;
	abandoned_calls: number | string;
	total_calls_abandoned: number | string;
	total_calls_answered: number | string;
}

export interface Formula_Three {
	total_calls_answered_in_time: number | string;
	total_calls_abandoned: number | string;
	total_calls_answered: number | string;
}

export interface Formula_Four {
	total_calls_answered_in_time_p: number | string;
	total_calls_abandoned_after_time: number | string;
	total_calls_answered: number | string;
}

export interface Formula_Five {
	total_calls_answered_within_time_p: number | string;
	calls_abandoned_within_shorter_time: number | string;
	total_calls_answered: number | string;
	total_calls_abandoned: number | string;
}
