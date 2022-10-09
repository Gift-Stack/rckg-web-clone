import { CoinPairEnum, FlowEnum } from "../../../types/enum";
import { IMarketTableData } from "./model";
import { ITableFilter, ITableOption, ITableColumn } from "../model";

export const marketTableFilters: ITableFilter[] = [
	{
		name: "Favourites",
		isActive: false,
	},
	{
		name: "Spot Markets",
		isActive: true,
	},
	{
		name: "Newly Listed",
		isActive: false,
	},
	{
		name: "All Cryptos",
		isActive: false,
	},
];

export const marketTableOptions: ITableOption[] = [
	{
		name: "USDT",
		isActive: true,
	},
	{
		name: "BTC",
		isActive: false,
	},
	{
		name: "BNB",
		isActive: false,
	},
	{
		name: "ETH",
		isActive: false,
	},
	{
		name: "FIAT",
		isActive: false,
	},
	{
		name: "ALTS",
		isActive: false,
	},
];

export const marketTableColumns: ITableColumn[] = [
	{
		title: "Market",
		dataIndex: "market",
		key: "market",
		sort: true,
	},
	{
		title: "Price",
		dataIndex: "price",
		key: "price",
		sort: true,
	},
	{
		title: "24h Change",
		dataIndex: "change",
		key: "change",
		sort: true,
	},
	{
		title: "24h High / Low",
		dataIndex: "high_low",
		key: "high_low",
	},
	{
		title: "24h Volume",
		dataIndex: "volume",
		key: "volume",
		sort: true,
	},
	{
		title: "Market Cap",
		dataIndex: "market_cap",
		key: "market_cap",
		sort: true,
	},
	{
		title: "",
		dataIndex: "option",
		key: "option",
	},
];

export const marketTableData: IMarketTableData[] = [
	{
		id: 1,
		coinPair: CoinPairEnum.DOGE_BTC,
		price: 0.000345,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 2,
		coinPair: CoinPairEnum.LTC_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 3,
		coinPair: CoinPairEnum.BNB_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 4,
		coinPair: CoinPairEnum.BTC_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 5,
		coinPair: CoinPairEnum.ETH_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.DOWN,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 6,
		coinPair: CoinPairEnum.DOGE_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.DOWN,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 7,
		coinPair: CoinPairEnum.DOGE_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.DOWN,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 8,
		coinPair: CoinPairEnum.LTC_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.DOWN,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 9,
		coinPair: CoinPairEnum.BNB_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 10,
		coinPair: CoinPairEnum.BTC_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 11,
		coinPair: CoinPairEnum.ETH_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 12,
		coinPair: CoinPairEnum.DOGE_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 13,
		coinPair: CoinPairEnum.DOGE_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 14,
		coinPair: CoinPairEnum.DOGE_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 15,
		coinPair: CoinPairEnum.LTC_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 16,
		coinPair: CoinPairEnum.BNB_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 17,
		coinPair: CoinPairEnum.BTC_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 18,
		coinPair: CoinPairEnum.ETH_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.DOWN,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 19,
		coinPair: CoinPairEnum.DOGE_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.DOWN,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 20,
		coinPair: CoinPairEnum.DOGE_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.DOWN,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 21,
		coinPair: CoinPairEnum.LTC_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.DOWN,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 22,
		coinPair: CoinPairEnum.BNB_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 23,
		coinPair: CoinPairEnum.BTC_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 24,
		coinPair: CoinPairEnum.ETH_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 25,
		coinPair: CoinPairEnum.DOGE_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 26,
		coinPair: CoinPairEnum.DOGE_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 27,
		coinPair: CoinPairEnum.DOGE_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 28,
		coinPair: CoinPairEnum.LTC_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 29,
		coinPair: CoinPairEnum.BNB_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 30,
		coinPair: CoinPairEnum.BTC_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 31,
		coinPair: CoinPairEnum.ETH_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.DOWN,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 32,
		coinPair: CoinPairEnum.DOGE_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.DOWN,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 33,
		coinPair: CoinPairEnum.DOGE_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.DOWN,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 34,
		coinPair: CoinPairEnum.LTC_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.DOWN,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 35,
		coinPair: CoinPairEnum.BNB_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 36,
		coinPair: CoinPairEnum.BTC_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 37,
		coinPair: CoinPairEnum.ETH_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 38,
		coinPair: CoinPairEnum.DOGE_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 39,
		coinPair: CoinPairEnum.DOGE_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 40,
		coinPair: CoinPairEnum.DOGE_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 41,
		coinPair: CoinPairEnum.LTC_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 42,
		coinPair: CoinPairEnum.BNB_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 43,
		coinPair: CoinPairEnum.BTC_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 44,
		coinPair: CoinPairEnum.ETH_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.DOWN,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 45,
		coinPair: CoinPairEnum.DOGE_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.DOWN,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 46,
		coinPair: CoinPairEnum.DOGE_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.DOWN,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 47,
		coinPair: CoinPairEnum.LTC_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.DOWN,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 48,
		coinPair: CoinPairEnum.BNB_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 49,
		coinPair: CoinPairEnum.BTC_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 50,
		coinPair: CoinPairEnum.ETH_BTC,
		price: 0.03434,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 51,
		coinPair: CoinPairEnum.DOGE_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
	{
		id: 52,
		coinPair: CoinPairEnum.DOGE_BTC,
		price: 0.0238,
		change: {
			rate: 9.6,
			flow: FlowEnum.UP,
		},
		highLow: {
			high: 1.0233,
			low: 1.0007,
		},
		volume: 390.81,
		marketCap: 37712573.95,
	},
];
