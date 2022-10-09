import { TabsItem } from "components/tab/model";
import { CurrencyEnum } from "types/enum";

export interface LimitValueProps {
	amount1: string;
	amount2: string;
	price: string;
}

export interface LimitProps {
	btnState: string;
	onSubmit: (values: LimitValueProps) => void;
	setTradeRate: (rate: number) => void;
}

export interface MarketValueProps {
	amount1: string;
	amount2: string;
	price: string;
}

export interface MarketProps {
	btnState: string;
	setValues: (values: MarketValueProps) => void;
	setTradeRate: (rate: number) => void;
}

export interface StopLimitValueProps {
	amount1: string;
	amount2: string;
	price: string;
}

export interface StopLimitProps {
	btnState: string;
	setValues: (values: StopLimitValueProps) => void;
	setTradeRate: (rate: number) => void;
}

export interface TradeInputProps {
	label?: string;
	availablePrice?: number;
	availablePriceCurrency?: CurrencyEnum;
	convertedPrice?: number;
	convertedPriceCurrency?: CurrencyEnum;
	placeholder: string;
	name?: string;
	type?: string;
	[key: string]: any;
}

export interface TradeSwitchProps {
	handleSwitch: Function;
	switchItem: any[];
	active: string;
}

export interface TradeProps {
	tradeTab: TabsItem;
	[key: string]: any;
}
