import { ReactElement } from "react";

export interface Link {
	title: string;
	uri: string;
}
export interface HeaderProps {
	options: Link[];
	pathname: any;
	button1?: ReactElement;
	button2?: ReactElement;
	button3?: ReactElement;
	btcBalance?: any;
	usdtBalance?: any;
}

export interface AccountCardProps {
	title: string;
	btc: number;
	button1?: ReactElement;
	button2?: ReactElement;
	button3?: ReactElement;
}

export interface AccountDetailsUIProps {
	icon: ReactElement;
	value: string;
	pathname: any;
	showTotalBalance: boolean;
	options: Link[];
	onClick: () => void;
	button1?: ReactElement;
	button2?: ReactElement;
	button3?: ReactElement;
	btcBalance?: any;
	usdtBalance?: any;
}

export interface AccountVisibilityProps {
	value: string;
	icon: ReactElement;
	onClick: () => void;
}
export interface NavProps {
	links: Link[];
}
