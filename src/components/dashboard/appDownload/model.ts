import { AppIcon } from "./enum";

export interface StoreProps {
	name: string;
	icon: AppIcon;
	url: string;
	index?: number;
	handleClick: Function;
}

export interface App {
	id: number;
	name: string;
	icon: AppIcon;
	url: string;
}

export interface AppDownloadProps {
	apps: [App, App];

	[key: string]: any;

	handleClick: Function;
}
