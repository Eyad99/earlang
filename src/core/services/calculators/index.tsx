import { Earlang_Calculator_Max_Calls, Earlang_Calculator_Normal } from '@/core/models';
import { post } from '@/utils/api';

export const calculatorApi = {
	earlangNormal: (data: Earlang_Calculator_Normal) => post(`api/erlangc/`, data),
	earlangMaxCalls: (data: Earlang_Calculator_Max_Calls) => post(`api/erlangc2/`, data),
};
