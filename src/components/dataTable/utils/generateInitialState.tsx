import { FilterQuery, SelectArray } from '@/core';

export const GenerateInitialState = (selectArray: SelectArray): FilterQuery => {
	const initialState: FilterQuery = {};
	Object.values(selectArray).forEach((item) => {
		Object.keys(item).forEach((key) => {
			return (initialState[key] = { queryParamName: key, value: undefined });
		});
	});
	return initialState;
};
