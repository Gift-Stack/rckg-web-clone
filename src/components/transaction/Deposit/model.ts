import { CurrencyEnum } from "types/enum";
import {
	IPaymentType,
	ITransactionSelectItem,
	ITransactionTab,
	ITransactionTip,
} from "../model";

export interface DepositCryptoProps {
	coinSelectToggle: boolean;
	setCoinSelectToggle: (bool: boolean) => void;
	coinSelectData: ITransactionSelectItem[];
	coinSelectLabel: string;
	coinSelectPlaceholder: string;
	networkSelectToggle: boolean;
	setNetworkSelectToggle: (bool: boolean) => void;
	networkSelectData: ITransactionSelectItem[];
	networkSelectLabel: string;
	networkSelectPlaceholder: string;
	address?: null | string;
	tips: ITransactionTip[];
	selectedItem: (index: number, select: string) => void;
	handleCopy: (value: string) => void;
	showSearch?: boolean;
	handleSearch?: (e?: any) => void;
	searchText?: string;
	selectedCoinInfo?: any;
	selectedNetwork?: any;
	searchPlaceholder?: string;
}

export interface DepositFiatProps {
	currencySelectToggle: boolean;
	setCurrencySelectToggle: (bool: boolean) => void;
	currencySelectData: ITransactionSelectItem[];
	currencySelectLabel: string;
	currencySelectPlaceholder: string;
	networkSelectToggle: boolean;
	setNetworkSelectToggle: (bool: boolean) => void;
	networkSelectData: ITransactionSelectItem[];
	networkSelectLabel: string;
	networkSelectPlaceholder: string;
	transactionTabs: ITransactionTab[];
	handleTransactionTabs: (value: string) => void;
	selectedItem: (index: number, select: string) => void;
	currency: CurrencyEnum;
	paymentTypes: IPaymentType[];
	handlePaymentType: (value: string) => void;
}
