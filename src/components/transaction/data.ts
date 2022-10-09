import { CurrencyEnum } from "../../types/enum";
import { CoinEnum } from "../../types/enum/coinEnum";
import { PaymentType } from "./enum";
import { IPaymentType, ITransactionTab, ITransactionTip } from "./model";

export const transactionTips: ITransactionTip[] = [
	{
		id: 1,
		tip: "Please make sure you send only LINK to this deposit address.",
	},
	{
		id: 2,
		tip: "Ensure the network is LINK.",
	},
	{
		id: 3,
		tip: "The minimum deposit is 0.0001 LINK.",
	},
];

export const coinSelectItems = [
	{
		id: 1,
		name: CoinEnum.DOGE,
	},
	{
		id: 2,
		name: CoinEnum.LTC,
	},
	{
		id: 3,
		name: CoinEnum.ETH,
	},
	{
		id: 4,
		name: CoinEnum.BNB,
	},
	{
		id: 5,
		name: CoinEnum.BTC,
	},
];

export const networkSelectItems = [
	{
		id: 1,
		name: "Network 1",
	},
	{
		id: 2,
		name: "Network 2",
	},
	{
		id: 3,
		name: "Network 3",
	},
	{
		id: 4,
		name: "Network 4",
	},
	{
		id: 5,
		name: "Network 5",
	},
];

export const currencySelectItems = [
	{
		id: 1,
		name: CurrencyEnum.NAIRA,
	},
	{
		id: 2,
		name: CurrencyEnum.USDT,
	},
];

export const depositTransactionTabs: ITransactionTab[] = [
	{
		name: "Recommended",
		isActive: true,
	},
	{
		name: "Other Payments",
		isActive: false,
	},
];

export const depositPaymentTypes: IPaymentType[] = [
	{
		id: 1,
		name: PaymentType.CARD,
		payment: "Visa / Mastercard",
	},
	{
		id: 2,
		name: PaymentType.P2P,
		payment: "P2P Bank Transfer",
	},
	{
		id: 3,
		name: PaymentType.ADVANCE,
		payment: "Advance Cash",
	},
];
