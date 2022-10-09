import { CurrencyEnum } from "../../../types/enum";
import { PaymentMethod } from "../../transaction/enum";
import { CoinEnum } from "../../../types/enum";
import { IP2PListingsData, Coin } from "./model";
import { ITableColumn, ITableOption } from "../model";

export const P2PListingOptions: ITableOption[] = [
	{
		name: "Buy",
		isActive: true,
	},
	{
		name: "Sell",
		isActive: false,
	},
];

export const coins: Coin[] = [
	{
		value: CoinEnum.LTC,
		name: "Litecoin",
		image: "/images/test/ltc.png",
	},
	{
		value: CoinEnum.BTC,
		name: "Bitcoin",
		image: "/images/test/btc.png",
	},
	{
		value: CoinEnum.ETH,
		name: "Ethereum",
		image: "/images/test/eth.png",
	},
	{
		value: CoinEnum.DOGE,
		name: "Dogecoin",
		image: "/images/test/doge.png",
	},
	{
		value: CoinEnum.BNB,
		name: "BNB",
		image: "/images/test/bnb.png",
	},
];

export const p2pListingColumns: ITableColumn[] = [
	{
		title: "Advertiser",
		dataIndex: "advertiser",
		key: "advertiser",
		sort: false,
	},
	{
		title: "Price",
		dataIndex: "price",
		key: "price",
		sort: true,
	},
	{
		title: "Limit/Available",
		dataIndex: "available",
		key: "available",
		sort: true,
	},
	{
		title: "Payment",
		dataIndex: "payment",
		key: "payment",
		sort: false,
	},
	{
		title: "Trade",
		dataIndex: "trade",
		key: "trade",
	},
];

export const p2pListingData: IP2PListingsData[] = [
	{
		id: 1,
		advertiser: {
			name: "Philip",
			orders: 423,
			completion: 96.5,
		},
		price: {
			amount: 23450000,
			currency: CurrencyEnum.NAIRA,
		},
		available: {
			coin: CoinEnum.BTC,
			amount: 0.01561197,
			min: 1000,
			max: 366100.69,
		},
		payment: PaymentMethod.BANK_TRANSFER,
		type: CoinEnum.BTC,
		activity: "Buy",
	},
	{
		id: 2,
		advertiser: {
			name: "Philip",
			orders: 423,
			completion: 96.5,
		},
		price: {
			amount: 23450000,
			currency: CurrencyEnum.NAIRA,
		},
		available: {
			coin: CoinEnum.BTC,
			amount: 0.01561197,
			min: 1000,
			max: 366100.69,
		},
		payment: PaymentMethod.BANK_TRANSFER,
		type: CoinEnum.BTC,
		activity: "Buy",
	},
	{
		id: 3,
		advertiser: {
			name: "Philip",
			orders: 423,
			completion: 96.5,
		},
		price: {
			amount: 23450000,
			currency: CurrencyEnum.NAIRA,
		},
		available: {
			coin: CoinEnum.BTC,
			amount: 0.01561197,
			min: 1000,
			max: 366100.69,
		},
		payment: PaymentMethod.BANK_TRANSFER,
		type: CoinEnum.BTC,
		activity: "Buy",
	},
	{
		id: 4,
		advertiser: {
			name: "Philip",
			orders: 423,
			completion: 96.5,
		},
		price: {
			amount: 23450000,
			currency: CurrencyEnum.NAIRA,
		},
		available: {
			coin: CoinEnum.BTC,
			amount: 0.01561197,
			min: 1000,
			max: 366100.69,
		},
		payment: PaymentMethod.BANK_TRANSFER,
		type: CoinEnum.BTC,
		activity: "Sell",
	},
	{
		id: 5,
		advertiser: {
			name: "Philip",
			orders: 423,
			completion: 96.5,
		},
		price: {
			amount: 23450000,
			currency: CurrencyEnum.NAIRA,
		},
		available: {
			coin: CoinEnum.BTC,
			amount: 0.01561197,
			min: 1000,
			max: 366100.69,
		},
		payment: PaymentMethod.BANK_TRANSFER,
		type: CoinEnum.BTC,
		activity: "Sell",
	},
];
