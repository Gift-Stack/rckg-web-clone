import { render, screen } from "@testing-library/react";
import { CurrencyEnum } from "../../../types/enum";
import {
	currencyFormatter,
	formatToCurrency,
	getDate,
} from "../../../constants";
import { AccountType, TransactionType } from "./enum";
import TransactionHistoryUI from "./TransactionHistoryUI";

describe("TransactionHistoryUI", () => {
	it("renders TransactionHistoryUI Properly with all possible data", async () => {
		render(
			<TransactionHistoryUI
				narration={"BTC Sent"}
				date={new Date(Date.now()).toISOString()}
				amount={0.0035}
				currency={CurrencyEnum["BTC"]}
				user={{ id: 1, walletId: "3GJ6a83dJ8h3kJKMjNpTxtpGxGAp" }}
				transactionType={TransactionType["DEBIT"]}
				accountType={AccountType["BTC_WALLET"]}
				underline={true}
			/>
		);
		const transactionHistoryUI = await screen.getByTestId(
			"rg-transactionHistoryUI"
		);
		const amount = await screen.getByText(`${0.0035}${CurrencyEnum["BTC"]}`);
		expect(transactionHistoryUI.className).toContain("border-b");
		expect(transactionHistoryUI.className).toContain("border-neutral-100");
		expect(transactionHistoryUI.textContent).toContain(
			"3GJ6a83dJ8h3kJKMjNpTxtpGxGAp"
		);
		expect(transactionHistoryUI.textContent).toContain(CurrencyEnum["BTC"]);
		expect(transactionHistoryUI.textContent).toContain(
			getDate(new Date(Date.now()).toISOString())
		);
		expect(amount.className).toContain("text-error-main");
	});

	it("TransactionHistoryUI does not have underline", async () => {
		render(
			<TransactionHistoryUI
				narration={"BTC Sent"}
				date={new Date(Date.now()).toISOString()}
				amount={0.0035}
				currency={CurrencyEnum["BTC"]}
				user={{ id: 1, walletId: "3GJ6a83dJ8h3kJKMjNpTxtpGxGAp" }}
				transactionType={TransactionType["DEBIT"]}
				accountType={AccountType["BTC_WALLET"]}
				underline={false}
			/>
		);
		const transactionHistoryUI = await screen.getByTestId(
			"rg-transactionHistoryUI"
		);
		expect(transactionHistoryUI.className).not.toContain("border-b");
		expect(transactionHistoryUI.className).not.toContain("border-neutral-100");
	});

	it("TransactionHistoryUI renders a Naira Transaction, does not have a user object and transaction type is debit", async () => {
		render(
			<TransactionHistoryUI
				narration={"Funded Naira Wallet"}
				date={new Date(Date.now()).toISOString()}
				amount={320000}
				currency={CurrencyEnum["NAIRA"]}
				transactionType={TransactionType["CREDIT"]}
				accountType={AccountType["NAIRA_WALLET"]}
				underline={true}
			/>
		);
		const transactionHistoryUI = await screen.getByTestId(
			"rg-transactionHistoryUI"
		);
		const amount = await screen.getByText(
			`${currencyFormatter(CurrencyEnum["NAIRA"])}${formatToCurrency(
				320000,
				2
			)}`
		);
		expect(transactionHistoryUI.textContent).toContain(
			currencyFormatter(CurrencyEnum["NAIRA"])
		);

		expect(amount.className).toContain("text-credit");
	});

	it("TransactionUI display user names for accountType BTC_WALLET", async () => {
		render(
			<TransactionHistoryUI
				narration={"BTC Received"}
				date={new Date(Date.now()).toISOString()}
				amount={320000}
				currency={CurrencyEnum["BTC"]}
				user={{
					id: 2,
					firstName: "John",
					lastName: "Ogu",
				}}
				transactionType={TransactionType["CREDIT"]}
				accountType={AccountType["BTC_WALLET"]}
				underline={true}
			/>
		);
		const transactionHistoryUI = await screen.getByTestId(
			"rg-transactionHistoryUI"
		);
		expect(transactionHistoryUI.textContent).toContain("John");
	});
});
