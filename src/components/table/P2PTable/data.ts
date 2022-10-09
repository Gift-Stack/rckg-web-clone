import { CoinEnum, FlowEnum } from "../../../types/enum";
import { IP2PTableData } from "./model";
import { ITableColumn } from "../model";

export const p2pTableColumns: ITableColumn[] = [
	{
		title: "Coin",
		dataIndex: "coin",
		key: "coin",
		sort: false,
	},
	{
		title: "Total",
		dataIndex: "total",
		key: "total",
		sort: false,
	},
	{
		title: "Avaliable",
		dataIndex: "avaliable",
		key: "avaliable",
		sort: false,
	},
	{
		title: "Frozen",
		dataIndex: "frozen",
		key: "frozen",
		sort: false,
	},
	{
		title: "BTC Value",
		dataIndex: "btcValue",
		key: "btcValue",
		sort: false,
	},
	{
		title: "",
		dataIndex: "option",
		key: "option",
	},
];

export const p2pTableData: IP2PTableData[] = [
	{
		id: 1,
		coin: {
			title: "Dogecoin",
			value: CoinEnum.DOGE,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 37712573.95,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 2,
		coin: {
			title: "Litecoin",
			value: CoinEnum.LTC,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 37712573.95,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 3,
		coin: {
			title: "BNB",
			value: CoinEnum.BNB,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 4,
		coin: {
			title: "Bitcoin",
			value: CoinEnum.BTC,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 37712573.95,
			flow: FlowEnum.DOWN,
		},
		frozen: {
			amount: 1.0233,
		},
		btcValue: {
			amount: 1.0233,
		},
	},
	{
		id: 5,
		coin: {
			title: "Ethereum",
			value: CoinEnum.ETH,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 6,
		coin: {
			title: "Dogecoin",
			value: CoinEnum.DOGE,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 7,
		coin: {
			title: "Dogecoin",
			value: CoinEnum.DOGE,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 8,
		coin: {
			title: "Litecoin",
			value: CoinEnum.LTC,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 9,
		coin: {
			title: "BNB",
			value: CoinEnum.BNB,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 10,
		coin: {
			title: "Bitcoin",
			value: CoinEnum.BTC,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 11,
		coin: {
			title: "Ethereum",
			value: CoinEnum.ETH,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 12,
		coin: {
			title: "Dogecoin",
			value: CoinEnum.DOGE,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 13,
		coin: {
			title: "Dogecoin",
			value: CoinEnum.DOGE,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 14,
		coin: {
			title: "Dogecoin",
			value: CoinEnum.DOGE,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 15,
		coin: {
			title: "Litecoin",
			value: CoinEnum.LTC,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 16,
		coin: {
			title: "BNB",
			value: CoinEnum.BNB,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 17,
		coin: {
			title: "Bitcoin",
			value: CoinEnum.BTC,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 18,
		coin: {
			title: "Ethereum",
			value: CoinEnum.ETH,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 19,
		coin: {
			title: "Dogecoin",
			value: CoinEnum.DOGE,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 20,
		coin: {
			title: "Dogecoin",
			value: CoinEnum.DOGE,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 21,
		coin: {
			title: "Litecoin",
			value: CoinEnum.LTC,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 22,
		coin: {
			title: "BNB",
			value: CoinEnum.BNB,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 23,
		coin: {
			title: "Bitcoin",
			value: CoinEnum.BTC,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 24,
		coin: {
			title: "Ethereum",
			value: CoinEnum.ETH,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 25,
		coin: {
			title: "Dogecoin",
			value: CoinEnum.DOGE,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 26,
		coin: {
			title: "Dogecoin",
			value: CoinEnum.DOGE,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 27,
		coin: {
			title: "Dogecoin",
			value: CoinEnum.DOGE,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 28,
		coin: {
			title: "Litecoin",
			value: CoinEnum.LTC,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 29,
		coin: {
			title: "BNB",
			value: CoinEnum.BNB,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 30,
		coin: {
			title: "Bitcoin",
			value: CoinEnum.BTC,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 31,
		coin: {
			title: "Ethereum",
			value: CoinEnum.ETH,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 32,
		coin: {
			title: "Dogecoin",
			value: CoinEnum.DOGE,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 33,
		coin: {
			title: "Dogecoin",
			value: CoinEnum.DOGE,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 34,
		coin: {
			title: "Litecoin",
			value: CoinEnum.LTC,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 35,
		coin: {
			title: "BNB",
			value: CoinEnum.BNB,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 36,
		coin: {
			title: "Bitcoin",
			value: CoinEnum.BTC,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 37,
		coin: {
			title: "Ethereum",
			value: CoinEnum.ETH,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 38,
		coin: {
			title: "Dogecoin",
			value: CoinEnum.DOGE,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 39,
		coin: {
			title: "Dogecoin",
			value: CoinEnum.DOGE,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 40,
		coin: {
			title: "Dogecoin",
			value: CoinEnum.DOGE,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 41,
		coin: {
			title: "Litecoin",
			value: CoinEnum.LTC,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 42,
		coin: {
			title: "BNB",
			value: CoinEnum.BNB,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 43,
		coin: {
			title: "Bitcoin",
			value: CoinEnum.BTC,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 44,
		coin: {
			title: "Ethereum",
			value: CoinEnum.ETH,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 45,
		coin: {
			title: "Dogecoin",
			value: CoinEnum.DOGE,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 46,
		coin: {
			title: "Dogecoin",
			value: CoinEnum.DOGE,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 47,
		coin: {
			title: "Litecoin",
			value: CoinEnum.LTC,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 48,
		coin: {
			title: "BNB",
			value: CoinEnum.BNB,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 49,
		coin: {
			title: "Bitcoin",
			value: CoinEnum.BTC,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 50,
		coin: {
			title: "Ethereum",
			value: CoinEnum.ETH,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 51,
		coin: {
			title: "Dogecoin",
			value: CoinEnum.DOGE,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
	{
		id: 52,
		coin: {
			title: "Dogecoin",
			value: CoinEnum.DOGE,
		},
		total: {
			amount: 0.000345,
		},
		avaliable: {
			amount: 9.6,
		},
		frozen: {
			amount: 0.0,
		},
		btcValue: {
			amount: 0.0,
		},
	},
];
