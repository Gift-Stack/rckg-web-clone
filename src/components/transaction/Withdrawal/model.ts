import { CurrencyEnum } from "types/enum";
import {
	IPaymentType,
	ITransactionSelectItem,
	ITransactionTab,
	ITransactionTip,
} from "../model";

export interface WithdrawCryptoProps {
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
	tips: ITransactionTip[];
	showTips?: boolean;
	selectedItem: (index: number, select: string) => void;
	onAddressInput: (value: string) => void;
	amount: string;
	onAmountInput: (value: string) => void;
	availableCoinBalance: number;
	showSearch?: boolean;
	searchPlaceholder?: string;
	searchText?: string;
	handleSearch?: (arg?: any) => void;
	selectedCoinInfo?: any;
}

export interface WithdrawFiatProps {
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
