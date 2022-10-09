import { TransactionStatus } from "components/transaction/enum";
import { CoinEnum } from "types/enum/coinEnum";
import { ITableData } from "../model";

export interface TransactionTableProps extends MetaProps {
	children: JSX.Element;
	cssClass: string;
	title: string;
	allHistory?: string;
}

export interface MobileTransactionTableProps {
	dataSource: ITableData[];
	pageSize: number;
}

export interface ITransactionTableData {
	id: number;
	coin: CoinEnum;
	date_time: string;
	deposit_amount: number;
	destination: string;
	tx_id: string;
	status: TransactionStatus;
}

export interface IDepositHistoryItem {
	address: string;
	addressTag: string;
	amount: string;
	coin: string;
	confirmTimes: string;
	insertTime: string;
	network: string;
	status: number;
	transferType: any;
	txId: string;
	unlockConfirm: number;
	walletType: number;
	asset: "BTC";
	createdBy: null;
	createdOn: "2022-01-21T14:38:10.023Z";
	deletedBy: null;
	deletedOn: null;
	id: "bbd7d08f-58c1-46e3-a641-f0e3172ea4ad";
	sourceAddress: "3Kzbw8fav1CahGeuQYqufpPXs9oSuuoLby";
	updatedBy: any;
	updatedOn: any;
	userId: "fe6ab2bb-a59b-4d18-9654-fe8b636f7aaf";
}

export interface IDepositHistory {
	items: IDepositHistoryItem[];
	meta: {
		currentPage: number;
		itemCount: number;
		itemsPerPage: number;
		totalItems: number;
		totalPages: number;
	};
}
