import { CoinPairEnum, FlowEnum } from "../../types/enum";
import { IMarket } from "./model";

export const marketData: IMarket = {
	topGainer: {
		coinPair: CoinPairEnum.DOGE_BTC,
		coinPairChange: {
			rate: 5,
			flow: FlowEnum.UP,
		},
		price: {
			amount: 0.18353,
			rate: 10,
			flow: FlowEnum.UP,
		},
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 37712573.95,
		marketCap: 37712573.95,
	},
	topLooser: {
		coinPair: CoinPairEnum.LTC_BTC,
		coinPairChange: {
			rate: 11,
			flow: FlowEnum.DOWN,
		},
		price: {
			amount: 0.18353,
			rate: 10,
			flow: FlowEnum.UP,
		},
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 37712573.95,
		marketCap: 37712573.95,
	},
	topVolume: {
		coinPair: CoinPairEnum.ETH_BTC,
		coinPairChange: {
			rate: 11,
			flow: FlowEnum.DOWN,
		},
		price: {
			amount: 0.18353,
			rate: 10,
			flow: FlowEnum.UP,
		},
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 37712573.95,
		marketCap: 37712573.95,
	},
	highlight: {
		coinPair: CoinPairEnum.BNB_BTC,
		coinPairChange: {
			rate: 1,
			flow: FlowEnum.UP,
		},
		price: {
			amount: 0.18353,
			rate: 10,
			flow: FlowEnum.UP,
		},
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 37712573.95,
		marketCap: 37712573.95,
	},
};
