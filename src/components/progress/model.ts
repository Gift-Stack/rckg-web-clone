import { ProgressActiveState, ProgressInactiveState } from "./enum";

export interface ProgressItem {
	id: number;
	title: string;
	info?: string;
}

export interface ProgressProps {
	items: ProgressItem[];
	activeIndex: number;
	active?: ProgressActiveState;
	inactive?: ProgressInactiveState;
	[key: string]: any;
}

export interface ActiveProgressProps {
	length: number;
	state: ProgressActiveState;
}

export interface ProgressTitleProps {
	title: string;
	activeIndex: number;
	length: number;
}
