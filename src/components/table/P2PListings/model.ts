import { CoinEnum, CoinPairEnum } from "types/enum";
import { ITableOption } from "../model";
import { PaymentMethod } from "components/transaction/enum";

export interface P2PListingProps extends MetaProps {
	children: JSX.Element;
	cssClass: string;
	title?: string;
	tableOptions?: ITableOption[];
	handleOption?: (value: string) => void;
}

export interface MobileP2PListingProps {
	data: IP2PListingsData[];
	trade: (value: IP2PListingsData) => void;
}

export interface Coin {
	name: string;
	image?: string;
	value: CoinEnum;
}

export interface IP2PListingsData {
	id: number;
	advertiser: {
		name: string;
		orders: number;
		completion: number;
	};
	price: {
		amount: number;
		currency: string;
	};
	available: {
		coin: CoinEnum;
		amount: number;
		min: number;
		max: number;
	};
	payment: PaymentMethod;
	type: CoinEnum;
	activity: string;
}
