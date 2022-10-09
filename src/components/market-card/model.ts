import { CoinPairEnum, FlowEnum } from "types/enum";

export interface MarketCardProps {
	data: IMarket;
}

export interface IMarket {
	topGainer: IMarketData;
	topLooser: IMarketData;
	topVolume: IMarketData;
	highlight: IMarketData;
}

export interface IMarketData {
	name?: string;
	coinPair: CoinPairEnum;
	coinPairChange: {
		rate: number;
		flow: FlowEnum;
	};
	price: {
		amount: number;
		rate: number;
		flow: FlowEnum;
	};
	change: {
		rate: number;
		flow: FlowEnum;
	};
	highLow: {
		high: number;
		low: number;
	};
	volume: number;
	marketCap: number;
	img?: string;
}
