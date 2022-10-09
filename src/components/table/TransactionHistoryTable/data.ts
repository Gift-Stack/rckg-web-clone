import { TransactionStatus } from "../../transaction/enum";
import { CoinEnum, CoinPairEnum } from "../../../types/enum";
import {
	ITransactionHistoryTableData,
	ITransactionHistoryTableConvertData,
} from "./model";
import { ITableColumn, ITableOption } from "../model";

export const transactionHistoryTableOptions: ITableOption[] = [
	{
		name: "Crypto",
		isActive: true,
	},
	// {
	// 	name: "Fiat",
	// 	isActive: false,
	// },
	// {
	// 	name: "Transfer",
	// 	isActive: false,
	// },
	{
		name: "Convert",
		isActive: false,
	},
];

export const transactionHistoryTableConvertColumns: ITableColumn[] = [
	{
		title: "Date",
		dataIndex: "date",
		key: "date",
		sort: false,
	},
	{
		title: "Pair",
		dataIndex: "pair",
		key: "pair",
		sort: false,
	},
	{
		title: "Type",
		dataIndex: "type",
		key: "type",
		sort: false,
	},
	{
		title: "From",
		dataIndex: "from",
		key: "from",
		sort: false,
	},
	{
		title: "To",
		dataIndex: "to",
		key: "to",
		sort: false,
	},
	{
		title: "Price",
		dataIndex: "price",
		key: "price",
		sort: false,
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "status",
		sort: false,
	},
];

export const transactionHistoryTableColumns: ITableColumn[] = [
	{
		title: "Asset",
		dataIndex: "asset",
		key: "asset",
	},
	{
		title: "Type",
		dataIndex: "type",
		key: "type",
	},
	{
		title: "Time",
		dataIndex: "time",
		key: "time",
	},
	{
		title: "Amount",
		dataIndex: "amount",
		key: "amount",
	},
	{
		title: "Destination",
		dataIndex: "destination",
		key: "destination",
	},
	{
		title: "TxID",
		dataIndex: "txID",
		key: "txID",
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "status",
	},
];

export const transactionHistoryTableData: ITransactionHistoryTableData[] = [
	{
		id: 1,
		asset: CoinEnum.DOGE,
		type: "Deposit",
		time: new Date().toISOString(),
		amount: 23.123456,
		destination: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		txID: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		status: TransactionStatus.SUCCESSFUL,
	},
	{
		id: 2,
		asset: CoinEnum.BTC,
		type: "Deposit",
		time: new Date().toISOString(),
		amount: 23.123456,
		destination: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		txID: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		status: TransactionStatus.FAILED,
	},
	{
		id: 3,
		asset: CoinEnum.LTC,
		type: "Deposit",
		time: new Date().toISOString(),
		amount: 23.123456,
		destination: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		txID: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		status: TransactionStatus.PENDING,
	},
	{
		id: 4,
		asset: CoinEnum.LTC,
		type: "Deposit",
		time: new Date().toISOString(),
		amount: 23.123456,
		destination: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		txID: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		status: TransactionStatus.SUCCESSFUL,
	},
	{
		id: 5,
		asset: CoinEnum.DOGE,
		type: "Deposit",
		time: new Date().toISOString(),
		amount: 23.123456,
		destination: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		txID: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		status: TransactionStatus.FAILED,
	},
	{
		id: 6,
		asset: CoinEnum.BNB,
		type: "Deposit",
		time: new Date().toISOString(),
		amount: 23.123456,
		destination: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		txID: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		status: TransactionStatus.SUCCESSFUL,
	},
	{
		id: 7,
		asset: CoinEnum.DOGE,
		type: "Deposit",
		time: new Date().toISOString(),
		amount: 23.123456,
		destination: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		txID: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		status: TransactionStatus.SUCCESSFUL,
	},
	{
		id: 8,
		asset: CoinEnum.BNB,
		type: "Deposit",
		time: new Date().toISOString(),
		amount: 23.123456,
		destination: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		txID: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		status: TransactionStatus.PENDING,
	},
	{
		id: 9,
		asset: CoinEnum.BTC,
		type: "Deposit",
		time: new Date().toISOString(),
		amount: 23.123456,
		destination: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		txID: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		status: TransactionStatus.SUCCESSFUL,
	},
	{
		id: 10,
		asset: CoinEnum.DOGE,
		type: "Deposit",
		time: new Date().toISOString(),
		amount: 23.123456,
		destination: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		txID: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		status: TransactionStatus.SUCCESSFUL,
	},
	{
		id: 11,
		asset: CoinEnum.DOGE,
		type: "Deposit",
		time: new Date().toISOString(),
		amount: 23.123456,
		destination: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		txID: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		status: TransactionStatus.SUCCESSFUL,
	},
	{
		id: 12,
		asset: CoinEnum.DOGE,
		type: "Deposit",
		time: new Date().toISOString(),
		amount: 23.123456,
		destination: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		txID: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		status: TransactionStatus.SUCCESSFUL,
	},
	{
		id: 13,
		asset: CoinEnum.DOGE,
		type: "Deposit",
		time: new Date().toISOString(),
		amount: 23.123456,
		destination: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		txID: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		status: TransactionStatus.SUCCESSFUL,
	},
	{
		id: 14,
		asset: CoinEnum.DOGE,
		type: "Deposit",
		time: new Date().toISOString(),
		amount: 23.123456,
		destination: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		txID: "1AnimEmYAmQdZdz9xQ7dE7wLrEoCHTVQkL",
		status: TransactionStatus.SUCCESSFUL,
	},
];

export const transactionHistoryTableConvertData: ITransactionHistoryTableConvertData[] =
	[
		{
			id: 1,
			date: new Date().toISOString(),
			pair: CoinPairEnum.DOGE_BTC,
			type: "Market",
			from: {
				value: CoinEnum.DOGE,
				amount: 23,
			},
			to: {
				value: CoinEnum.BTC,
				amount: 0.23,
			},
			price: {
				value1: "1 USDT = 0.02345 DOGE",
				value2: "1 DOGE = 0.02345 DOGE",
			},
			status: TransactionStatus.SUCCESSFUL,
		},
		{
			id: 2,
			date: new Date().toISOString(),
			pair: CoinPairEnum.DOGE_BTC,
			type: "Market",
			from: {
				value: CoinEnum.DOGE,
				amount: 23,
			},
			to: {
				value: CoinEnum.BTC,
				amount: 0.23,
			},
			price: {
				value1: "1 USDT = 0.02345 DOGE",
				value2: "1 DOGE = 0.02345 DOGE",
			},
			status: TransactionStatus.SUCCESSFUL,
		},
		{
			id: 3,
			date: new Date().toISOString(),
			pair: CoinPairEnum.DOGE_BTC,
			type: "Market",
			from: {
				value: CoinEnum.DOGE,
				amount: 23,
			},
			to: {
				value: CoinEnum.BTC,
				amount: 0.23,
			},
			price: {
				value1: "1 USDT = 0.02345 DOGE",
				value2: "1 DOGE = 0.02345 DOGE",
			},
			status: TransactionStatus.SUCCESSFUL,
		},
		{
			id: 4,
			date: new Date().toISOString(),
			pair: CoinPairEnum.DOGE_BTC,
			type: "Market",
			from: {
				value: CoinEnum.DOGE,
				amount: 23,
			},
			to: {
				value: CoinEnum.BTC,
				amount: 0.23,
			},
			price: {
				value1: "1 USDT = 0.02345 DOGE",
				value2: "1 DOGE = 0.02345 DOGE",
			},
			status: TransactionStatus.SUCCESSFUL,
		},
		{
			id: 5,
			date: new Date().toISOString(),
			pair: CoinPairEnum.DOGE_BTC,
			type: "Market",
			from: {
				value: CoinEnum.DOGE,
				amount: 23,
			},
			to: {
				value: CoinEnum.BTC,
				amount: 0.23,
			},
			price: {
				value1: "1 USDT = 0.02345 DOGE",
				value2: "1 DOGE = 0.02345 DOGE",
			},
			status: TransactionStatus.SUCCESSFUL,
		},
	];
