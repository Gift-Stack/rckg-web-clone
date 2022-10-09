import { IconTypes, SettingActionState, Status } from "./enum";

export interface SettingProp {
	name: string;
	icon: IconTypes;
	state: SettingActionState;
	status: Status;
	onClick: (value: Status) => void;
}

export interface AllSettings {
	id: number;
	name: string;
	icon: IconTypes;
	state: SettingActionState;
	status: Status;
}

export interface SecuritySettingsProps {
	allSettings: AllSettings[];
	[key: string]: any;
}
