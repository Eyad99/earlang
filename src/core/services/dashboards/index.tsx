import { get } from '@/utils/api';

export const dashboardApi = {
	// admin Statistics
	stats: () => get(`api/dashboard-stats/`),
	counts: () => get(`api/counts/`),
	callStats: () => get(`api/call-stats-chart/`),
	countFilesAllCallCenters: () => get(`api/counts-file-callcenter/`),
};
