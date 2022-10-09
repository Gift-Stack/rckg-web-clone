import { Tags } from "components/card/model";

export interface ActivityUIProps {
	activity: string;
	date: string;
	address: string;
	underline: boolean;
}

export interface LoggedInDevicesUIProps {
	device: string;
	date: string;
	address: string;
	underline: boolean;
}

export interface Activity {
	id: number;
	activity: string;
	date: string;
	address: string;
}

export interface Devices {
	id: number;
	device: string;
	date: string;
	address: string;
}

export interface LoginTrackerProps {
	activities: Activity[];
	devices: Devices[];
	cardTags: Tags[];
	[key: string]: any;
}
