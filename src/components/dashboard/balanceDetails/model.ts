import { BoxFillState, BoxOutlineState } from "components/box/enum";
import { Actions, Tags } from "components/card/model";
import { ReactElement } from "react";
import { CurrencyEnum } from "types/enum";

export interface BalanceDetailsProps {
	cardActions: Actions[];
	cardTags: Tags[];
	wallets: Wallet[];
	btcBalance?: any;
	usdtBalance?: any;
}

export interface BalanceDetailsUIProps {
	icon: ReactElement;
	value: string;
	showTotalBalance: boolean;
	onClick: () => void;
	wallets: Wallet[];
	btcBalance?: any;
	usdtBalance?: any;
}

export interface BalanceVisibilityProps {
	value?: string;
	icon: ReactElement;
	onClick: () => void;
}

export interface LabelProps {
	fill: BoxFillState;
	outline: BoxOutlineState;
	currency: CurrencyEnum;
	amount: number;
}

export interface Wallet {
	id: number;
	currency: CurrencyEnum;
	amount: number;
	percentage: number;
	color: string;
}

export interface DataSetProps {
	labels: string[];
	datasets: Set[];
}

interface Set {
	backgroundColor: string[];
	hoverBackgroundColor: string[];
	data: number[];
	borderWidth: number;
	cutout: number;
	radius: number;
}
