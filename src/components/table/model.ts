import { ReactElement } from "react";
import { TableFilterState, TableOptionState, TableSortState } from "./enum";

export interface ITableFilter {
	name: string;
	isActive: boolean;
}

export interface ITableOption {
	name: string;
	isActive: boolean;
}

export interface ITableColumn {
	title: string;
	dataIndex: string;
	key: string;
	sort?: boolean;
	sortState?: TableSortState;
}

export interface ITableData {
	key: string | number;
	sn?: number;
	[key: string]: any;
}

export interface TableProps extends MetaProps {
	columns: ITableColumn[];
	dataSource: ITableData[];
	pageSize?: number;
	showPagination?: boolean;
	showPageSize?: boolean;
	setCurrentPage?: (value: number) => void;
	totalPages?: number;
	[key: string]: any;
}

export interface SearchFilterProps {
	placeholder: string;
	cssClass?: string;
	handleSearch: (value: string) => void;
}

export interface TableFilterProps {
	actionClick: (value: string) => void;
	value: string;
	variant?: TableFilterState;
	[key: string]: any;
}

export interface TableOptionProps {
	optionClick: (value: string) => void;
	value: string;
	variant?: TableOptionState;
	[key: string]: any;
}

export interface TableSelectProps {
	options: string[];
	label: string;
	value?: string;
	placeholder: string;
	onChange: (pair: string) => void;
	[key: string]: any;
	cssClass?: string;
}

export interface ITableAction {
	name: string;
	action?: ReactElement;
}

export interface TableDateRangePickerProps {
	getInitial: (value: string) => void;
	getFinal: (value: string) => void;
}
