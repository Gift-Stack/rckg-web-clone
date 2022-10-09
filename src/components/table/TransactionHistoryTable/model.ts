import { CoinEnum, CoinPairEnum } from "types/enum";
import { ITableOption } from "../model";
import { TransactionStatus } from "components/transaction/enum";

export interface TransactionHistoryTableProps extends MetaProps {
	children: JSX.Element;
	cssClass: string;
	title?: string;
	tableOptions?: ITableOption[];
	handleOption?: (value: string) => void;
}

export interface MobileTransactionHistoryTableProps {
	isConvert: boolean;
	isDataDeposit?: boolean;
	data: ITransactionHistoryTableData[];
	convertData: ITransactionHistoryTableConvertData[];
	fetchCoinImage: (value1:any, value2:any) => any;
	allCoins: any;
	showPagination?: boolean;
	showPageSize?: boolean;
	pageSize?: number;
	setCurrentPage?: any;
	totalPages?: any;
}

export interface ITransactionHistoryTableData {
	id: number;
	asset: CoinEnum;
	type: string;
	time: string;
	amount: number;
	destination: string;
	txID: string;
	status: TransactionStatus;
}

export interface ITransactionHistoryTableConvertData {
	id: number;
	date: string;
	pair: CoinPairEnum;
	type: string;
	from: {
		value: CoinEnum;
		amount: number;
	};
	to: {
		value: CoinEnum;
		amount: number;
	};
	price: {
		value1: string;
		value2: string;
	};
	status: TransactionStatus;
}
