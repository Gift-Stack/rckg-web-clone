import { CoinPairEnum } from "types/enum";
import { RateState, ValueState } from "./enum";

export interface SwitcherTradeValueProps {
	rate: string;
	value: number;
	valueChange?: string;
	rateState?: RateState;
	valueState?: ValueState;
}

export interface CoinPairSwitcherProps {
	coins: Coin[];
	[key: string]: any;
}

export interface TradeValue {
	id: number;
	rate: string;
	value: number;
	valueChange?: string;
}

export interface Coin {
	id: number;
	totalTradeValue: number;
	coinPair: CoinPairEnum | any;
	tradeValues: TradeValue[];
}
