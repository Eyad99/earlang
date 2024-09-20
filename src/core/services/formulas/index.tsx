import { Formula_Five, Formula_Four, Formula_One, Formula_Three, Formula_Tow } from '@/core/models';
import { post } from '@/utils/api';

export const formulaApi = {
	formulaOne: (data: Formula_One) => post(`api/formula1/`, data),
	formulaTow: (data: Formula_Tow) => post(`api/formula2/`, data),
	formulaThree: (data: Formula_Three) => post(`api/formula3/`, data),
	formulaFour: (data: Formula_Four) => post(`api/formula4/`, data),
	formulaFive: (data: Formula_Five) => post(`api/formula5/`, data),
};
