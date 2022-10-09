import { fireEvent, render, screen } from "@testing-library/react";
import { CurrencyEnum } from "../../../types/enum";
import TransactionHistory from ".";
import { AccountType, TransactionType } from "./enum";
import { Transaction } from "./model";
import { Tags } from "../../card/model";

const cardTags: Tags[] = [
	{
		name: "Crypto Deposits",
		isActive: true,
	},
	{
		name: "Crypto Withdrawals",
		isActive: false,
	},
];

const depositTransactions: Transaction[] = [
	{
		id: 1,
		narration: "BTC Sent",
		date: new Date(Date.now()).toISOString(),
		amount: 0.0035,
		currency: CurrencyEnum["BTC"],
		user: {
			id: 1,
			walletId: "3GJ6a83dJ8h3kJKMjNpTxtpGxGAp",
		},
		transactionType: TransactionType["DEBIT"],
		accountType: AccountType["BTC_WALLET"],
	},
	{
		id: 2,
		narration: "Funded Naira Wallet",
		date: new Date(Date.now()).toISOString(),
		amount: 320000,
		currency: CurrencyEnum["NAIRA"],
		transactionType: TransactionType["CREDIT"],
		accountType: AccountType["NAIRA_WALLET"],
	},
	{
		id: 3,
		narration: "BTC Received",
		date: new Date(Date.now()).toISOString(),
		amount: 0.0035,
		currency: CurrencyEnum["BTC"],
		user: {
			id: 2,
			firstName: "John",
			lastName: "Ogu",
		},
		transactionType: TransactionType["CREDIT"],
		accountType: AccountType["BTC_WALLET"],
	},
];

const withdrawalTransactions: Transaction[] = [
	{
		id: 1,
		narration: "BTC Sent",
		date: new Date(Date.now()).toISOString(),
		amount: 0.0035,
		currency: CurrencyEnum["BTC"],
		user: {
			id: 1,
			walletId: "3GJ6a83dJ8h3kJKMjNpTxtpGxGAp",
		},
		transactionType: TransactionType["DEBIT"],
		accountType: AccountType["BTC_WALLET"],
	},
	{
		id: 2,
		narration: "BTC Sent",
		date: new Date(Date.now()).toISOString(),
		amount: 0.0035,
		currency: CurrencyEnum["BTC"],
		user: {
			id: 1,
			walletId: "3GJ6a83dJ8h3kJKMjNpTxtpGxGAp",
		},
		transactionType: TransactionType["DEBIT"],
		accountType: AccountType["BTC_WALLET"],
	},
	{
		id: 3,
		narration: "BTC Sent",
		date: new Date(Date.now()).toISOString(),
		amount: 0.0035,
		currency: CurrencyEnum["BTC"],
		user: {
			id: 1,
			walletId: "3GJ6a83dJ8h3kJKMjNpTxtpGxGAp",
		},
		transactionType: TransactionType["DEBIT"],
		accountType: AccountType["BTC_WALLET"],
	},
];

describe("TransactionHistory", () => {
	it("renders TransactionHistory component Properly", async () => {
		render(
			<TransactionHistory
				depositTransactions={depositTransactions}
				withdrawalTransactions={withdrawalTransactions}
				cardTags={cardTags}
			/>
		);

		const transactionHistory = await screen.getByTestId("rg-transactions");
		const card = await screen.getByTestId("rg-card");
		const transactionHistoryUI = await screen.getAllByTestId(
			"rg-transactionHistoryUI"
		);
		const tag = await screen.getAllByTestId("rg-tag");
		fireEvent.click(tag[1]);

		expect(transactionHistory.innerHTML).toContain(card.innerHTML);
		expect(transactionHistoryUI.length).toBe(3);
	});
});
