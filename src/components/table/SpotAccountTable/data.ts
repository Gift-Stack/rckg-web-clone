import { CoinEnum, FlowEnum } from "../../../types/enum";
import { ISpotAccountTableData } from "./model";
import { ITableColumn } from "../model";

export const spotAccountTableColumns: ITableColumn[] = [
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
		title: "In Order",
		dataIndex: "inOrder",
		key: "inOrder",
		sort: false,
	},
	{
		title: "USDT Value",
		dataIndex: "usdt",
		key: "usdt",
		sort: false,
	},
	{
		title: "",
		dataIndex: "option",
		key: "option",
	},
];

export const spotAccountTableData: ISpotAccountTableData[] = [
	{
		asset: CoinEnum.DOGE,
		free: "0.000345",
		locked: "0.000345",
	},
];
