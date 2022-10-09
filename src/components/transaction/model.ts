import { ReactElement } from "react";
import { CurrencyEnum } from "types/enum";
import { PaymentType, TransactionTabState } from "./enum";

export interface TransactionSwitchProps {
	handleSwitch: Function;
	switchItem: any[];
	active: string;
}

export interface ITransactionSelectItem {
	id: number;
	item: ReactElement;
	selected: boolean;
	[key: string]: any;
}

export interface TransactionSelectProps {
	selectItems: ITransactionSelectItem[];
	label: string;
	placeholder: string;
	toggle: boolean;
	setToggle: (bool: boolean) => void;
	selectedItem: (index: number) => void;
	rootCss?: string;
	labelRootCss?: string;
	labelChildCss?: string;
	buttonRootCss?: string;
	itemCss?: string;
	showSearch?: boolean;
	handleSearch?: (e?: any) => void;
	searchText?: string;
	searchPlaceholder?: string;
}

export interface TransactionSelectItemProps {
	items: ITransactionSelectItem[];
	handleSelected: (id: number) => void;
	itemCss?: string;
	handleSearch?: (e?: any) => void;
	searchText?: string;
	showSearch?: boolean;
	searchPlaceholder?: string;
}

export interface ITransactionTip {
	id: number;
	tip: string;
}

export interface ITransactionTab {
	name: string;
	isActive: boolean;
}

export interface IPaymentType {
	id: number;
	name: PaymentType;
	payment: string;
}

export interface TransactionRadioProps {
	currency: CurrencyEnum;
	name: string;
	value: string;
	paymentType: string;
	paymentTypeEnum: PaymentType;
	onChange: (value: string) => void;
}

export interface TransactionInputProps {
	name: string;
	type: string;
	label: string;
	extras?: string;
	value?: any;
	onChange: (value: string) => void;
	handleExtras?: () => void;
}

export interface TransactionTabProps {
	tabClick: (value: string) => void;
	value: string;
	variant?: TransactionTabState;
	[key: string]: any;
}

export interface TransactionTipsProps {
	tips: ITransactionTip[];
	[key: string]: any;
}
