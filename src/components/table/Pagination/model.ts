export interface PaginationProps {
	pages: number;
	pageSize: number;
	rowsLength: number;
	_activeIndex?: number;
	_setActiveIndex: (index: number) => void;
	showPageSize: boolean;
	expand: boolean;
	handleExpand: Function;
}

export interface PageSizeProps {
	start: number;
	end: number;
	length: number;
}

export interface SingleNavProps {
	next: () => void;
	prev: () => void;
}
