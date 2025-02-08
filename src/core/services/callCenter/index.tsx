import { CallCenter_C_Req, CallCenter_U_Req } from '@/core/models';
import { destroy, get, patch, post } from '@/utils/api';

export const callCenterApi = {
	callCenterById: (callCenterId: string | undefined) => get(`auth/callcenter/${callCenterId}/`),
	addCallCenter: (data: CallCenter_C_Req) => post(`auth/callcenters/add/`, data),
	updateCallCenter: (data: CallCenter_U_Req, callCenterId: string | undefined) => patch(`auth/update-callcenter/${callCenterId}/`, data),
	deleteCallCenter: (callCenterId: string | undefined) => destroy(`auth/callcenters/remove/${callCenterId}/`),
};
