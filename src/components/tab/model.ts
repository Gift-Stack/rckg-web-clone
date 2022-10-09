export interface TabProps {
	name: string[];
	tabIndex: number;
	openTab: number;
	setOpenTab: (index: number) => void;
}

export interface TabsItem {
	id: number;
	name: string[];
}

export interface TabsProps {
	tabs: TabsItem[];
	opened: (index: number) => void;
	openTab: number;
	width?: string;
	[key: string]: any;
}
