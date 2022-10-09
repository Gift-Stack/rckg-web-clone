import { CurrencyEnum } from "types/enum";
import { TransactionType, AccountType } from "./enum";
import { Tags } from "components/card/model";

export interface Transaction {
	id: number;
	narration: string;
	date: string;
	amount: number;
	currency: CurrencyEnum;
	user?: User;
	transactionType: TransactionType;
	accountType: AccountType;
}

export interface TransactionHistoryUIProps {
	narration: string;
	transactionType: TransactionType;
	accountType: AccountType;
	date: string;
	amount: number;
	currency: CurrencyEnum;
	user?: User;
	underline: boolean;
}

export interface User {
	id: number;
	firstName?: string;
	lastName?: string;
	walletId?: string;
}

export interface TransactionProps {
	depositTransactions: Transaction[];
	withdrawalTransactions: Transaction[];
	[key: string]: any;
	cardTags: Tags[];
}
