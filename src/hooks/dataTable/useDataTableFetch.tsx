import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FilterQuery, dataTableApi } from '@/core';
import { DEFULT_ITEMS_PER_PAGE } from '@/variables/constants';

export type useDataTableFetchProps = {
	queryKey: string;
	url: string | undefined;
	page: number;
	search: string;
	filter?: FilterQuery;
	filterByDate?: Date;
	setTotalPages: (n: number) => void;
	setPage?: (n: number) => void;
	searchKey?: string;
};

export function useDataTableFetch({
	queryKey,
	url = '',
	page,
	search,
	filter,
	filterByDate,
}: // setTotalPages,
// setPage,
// searchKey,
useDataTableFetchProps) {
	const data = useQuery({
		queryKey: [queryKey, page, search, filter, filterByDate],
		queryFn: async () => {
			const info = {
				// page: page,
				// pageSize: DEFULT_ITEMS_PER_PAGE,
				// ...(search && { [searchKey]: search }),
				// ...(filterByDate && { date: filterByDate }),
				// ...(filter && Object.fromEntries(Object.keys(filter).map((el: any) => [filter[el].queryParamName, filter[el].value]))),
			};

			const res = await dataTableApi.getData(url, info);
			// if (res.data.meta) {
			// 	setTotalPages(res.data.meta.totalPages);
			// 	setPage(res.data.meta.currentPage);
			// }
			console.log('resssss', res);
			return res.data.data as any[];
		},
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData, // use isPlaceholderData
		select: (data: any) => {
			return data;
		},
	});
	if (data.isError) {
		toast.error(data?.error?.message);
	}

	return data;
}
