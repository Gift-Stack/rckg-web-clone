import { CoinPairEnum, CurrencyEnum, FlowEnum } from "types/enum";
import { ITableAction, ITableOption } from "../model";
import { OrderStatus } from "./enum";

export interface OrderListTableContainerProps extends MetaProps {
	children: JSX.Element;
	cssClass: string;
	tableOptions?: ITableOption[];
	handleOption?: (value: string) => void;
	tableActions?: ITableAction[];
	handleDownload?: () => void;
	handleAction?: (value: string) => void;
	filter?: () => void;
}

export interface MobileOrderListTableProps {
	allOrders: IOrder[];
	pageSize?: number;
	handleCopyAddress: (value: string) => void;
	handleParty: (value: IOrder) => void;
	handleAction: (type: string, value: IOrder) => void;
}

export interface IOrderListTableData {
	id: number;
	coinPair: CoinPairEnum;
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
}

export interface OrderListTableProps {
	allOrders: IOrder[];
	pageSize?: number;
	handleCopyAddress: (value: string) => void;
	handleParty: (value: IOrder) => void;
	handleAction: (type: string, value: IOrder) => void;
	setCoin: (value: string) => void;
	setOrderType: (value: string) => void;
	setStatus: (value: string) => void;
}

export interface OrderTypeProps {
	type: OrderStatus;
	date: string;
	address: string;
	copyAddress: (value: string) => void;
}

export interface OrderDetailsProps {
	order: IOrder;
	party: (value: IOrder) => void;
	action: (type: string, value: IOrder) => void;
}

export interface IOrder {
	id: number;
	type: OrderStatus;
	date: string;
	address: string;
	coin: CurrencyEnum;
	flatAmount: number;
	price: number;
	cryptoAmount: number;
	counterparty: string;
	status: {
		paymentStatus: string;
		time: string;
	};
}

export interface OrderProps {
	order: IOrder;
	handleCopy: (value: string) => void;
	handleParty: (value: IOrder) => void;
	handleAction: (type: string, value: IOrder) => void;
}

export interface MobileOrderProps {
	order: IOrder;
	handleCopy: (value: string) => void;
	handleParty: (value: IOrder) => void;
	handleAction: (type: string, value: IOrder) => void;
}
