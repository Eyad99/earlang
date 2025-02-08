import { Forecast_Req } from '@/core';
import { get, post } from '@/utils/api';

export const forecastApi = {
	yearForecast: (file: string) => post(`api/forcasting-xls-year/`, file, { headers: { formData: true } }),
	threeMonthForecast: (file: string) => post(`api/forcasting-xls-3month/`, file, { headers: { formData: true } }),
	monthForecast: (file: string) => post(`api/forcasting-xls-month/`, file, { headers: { formData: true } }),
	weekForecast: (file: string) => post(`api/forcasting-xls-week/`, file, { headers: { formData: true } }),
	dayForecast: (file: string) => post(`api/forcasting-xls-day/`, file, { headers: { formData: true } }),
	intervalOfDayForecast: (file: string) => post(`api/forcasting_strongs_IntervalDay/`, file, { headers: { formData: true } }),

	createForecast: (data: Forecast_Req) => post(`api/forcasting/addfile/`, data, { headers: { formData: true } }),
	getVolumeForecast: (id: string) => get(`api/forcasting_wight_IntervalDay/${id}/`),
	getAhtForecast: (id: string) => get(`api/forcasting_wight_Aht_IntervalDay/${id}/`),
	getResultVolumForecast: (id: string) => get(`api/forcasting_result_wight_IntervalDay/${id}/`),
	changeWeightByVolumeForecast: (id: string, data: number[]) => post(`api/forcasting_change_wight_IntervalDay/${id}/`, data),
	changeWeightByAhtForecast: (id: string, data: number[]) => post(`api/forcasting_change_wight_Interval_Aht_Day/${id}/`, data),
 };
