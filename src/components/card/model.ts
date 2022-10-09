export interface Actions {
	name: string;
	isActive: boolean;
	link?: string;
}

export interface Tags {
	name: string;
	isActive: boolean;
	link?: string;
	actions?: any;
}
