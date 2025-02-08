export interface Interval {
	Forecasted_Contacts: number;
	From_Time: string;
	To_Time: string;
	Growth_Rate?: string;
	Weighted_Moving_Average?: string;
	Forecasted_Aht?: string;
}

export interface Year_Forecast_Res {
	forecast_results: { Year: string | Date; Contacts: number; 'Growth Rate': string };
	next_year_forecast: { Year: string | Date; Contacts: number; 'Growth Rate': string };
}

export interface Three_Month_Forecast_Res {
	forecast_results: { Quarter: string | Date; Contacts: number; 'Growth Rate': string };
	next_week_forecast: { Quarter: string | Date; Contacts: number; 'Growth Rate': string }[];
}

export interface Month_Forecast_Res {
	forecast_results: { Month: string | Date; Contacts: number; 'Growth Rate': string };
	next_week_forecast: { Month: string | Date; Contacts: number; 'Growth Rate': string }[];
}

export interface Week_Forecast_Res {
	forecast_results: { 'Week Starting': string | Date; Contacts: number; 'Growth Rate': string };
	next_week_forecast: { 'Week Starting': string | Date; Contacts: number; 'Growth Rate': string }[];
}

export interface Day_Forecast_Res {
	forecast_results: {
		Day: string | Date;
		Day_Name: string;
		Contacts: number;
		'Growth Rate': string;
	};
	next_week_forecast: {
		Day: string | Date;
		Day_Name: string;
		Contacts: number;
		'Growth Rate': string;
	}[];
}

export interface Interval_Of_Days_Forecast_Res {
	daily_forecast: {
		Day: string | Date;
		Day_Name: string;
		Contacts: number;
		'Growth Rate': string;
		Intervals: Interval[];
	};
	next_week_forecast: {
		Day: string | Date;
		Day_Name: string;
		Contacts: number;
		'Growth Rate': string;
		Intervals: Interval[];
	}[];
}

export interface Forecast_Req {
	file: [];
	desc: string;
}
