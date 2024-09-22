// export interface DataTableProps<T> {
export interface DataTableProps {
	fetchUrl: string  ;
	queryKey: string;
	columns: { header: string; accessor: string; formatter?: any }[];
	actions?: TableActions;
	selectArray?: SelectArray;
	searchKey?: string;
 	filterByDate?: boolean;
}

interface ActionDetails {
	text?: string;
	component?: any;
	dialogTitle?: string;
	size?: string;
	api?: string;
	assignTo?: string;
	colorScheme?: string;
	maxW?: string;
	scrollBehavior?: 'inside' | 'outside';
}

export interface TableActions {
	[key: string]: ActionDetails;
}

export interface SelectOption {
	id: string;
	name: string | undefined;
}

interface SelectArrayItem {
	[key: string]: SelectOption[];
}

export interface SelectArray {
	[key: number]: SelectArrayItem;
}

interface FilterFields {
	queryParamName: string;
	value: string | undefined;
}

export interface FilterQuery {
	[key: string]: FilterFields;
}

export interface SelectType {
	queryParamName: string;
	value: string | any;
}

export interface Params {
	page?: number;
	pageSize?: number;
	search?: string;
	status?: string;
	branchId?: string;
}
