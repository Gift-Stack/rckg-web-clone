import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { USDT } from "../../../assets";
import { CurrencyEnum } from "../../../types/enum";
import { currencySelectItems, networkSelectItems } from "../data";
import { PaymentType } from "../enum";
import {
	IPaymentType,
	ITransactionSelectItem,
	ITransactionTab,
} from "../model";
import WithdrawFiat from "./WithdrawFiat";

const currencySelectData: ITransactionSelectItem[] = currencySelectItems.map(
	(c) => {
		return {
			id: c.id,
			item: (
				<>
					<div className="flex items-center transaction-select-item text-neutral-400">
						<span>
							{c.name === CurrencyEnum.USDT ? (
								<USDT />
							) : CurrencyEnum.NAIRA ? (
								<USDT />
							) : (
								<USDT />
							)}
						</span>
						<span className="font-normal ml-3 block truncate">{c.name}</span>
					</div>
				</>
			),
			selected: false,
			name: c.name,
		};
	}
);

const networkSelectData: ITransactionSelectItem[] = networkSelectItems.map(
	(n) => {
		return {
			id: n.id,
			item: (
				<>
					<div className="flex items-center transaction-select-item text-neutral-400">
						<span className="font-normal ml-3 block truncate">{n.name}</span>
					</div>
				</>
			),
			selected: false,
			name: n.name,
		};
	}
);

const transactionTabs: ITransactionTab[] = [
	{
		name: "Recommended",
		isActive: true,
	},
	{
		name: "Other Payments",
		isActive: false,
	},
];

export const paymentTypes: IPaymentType[] = [
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

describe("DepositFiat", () => {
	it("renders properly", async () => {
		const setCurrencySelectToggle = jest.fn();
		const setNetworkSelectToggle = jest.fn();
		const handleSelectedItem = jest.fn();
		const filterTransactionTabs = jest.fn();
		const handlePaymentType = jest.fn();
		render(
			<WithdrawFiat
				currencySelectToggle={true}
				setCurrencySelectToggle={(bool) => setCurrencySelectToggle(!bool)}
				currencySelectData={currencySelectData}
				currencySelectLabel={"Currency"}
				currencySelectPlaceholder={"Select Currency"}
				networkSelectToggle={true}
				setNetworkSelectToggle={(bool) => setNetworkSelectToggle(!bool)}
				networkSelectData={networkSelectData}
				networkSelectLabel={"Network"}
				networkSelectPlaceholder={"Select Network"}
				transactionTabs={transactionTabs}
				handleTransactionTabs={(value) => filterTransactionTabs(value)}
				selectedItem={(index: number, select: string) =>
					handleSelectedItem(index, select)
				}
				currency={CurrencyEnum.NAIRA}
				paymentTypes={paymentTypes}
				handlePaymentType={(value: string) => handlePaymentType(value)}
			/>
		);

		const container = screen.getByTestId("transaction-withdraw-fiat");
		const selectButton = screen.getAllByTestId("transaction-select-button");
		const itemList = screen.getAllByTestId("transaction-select-item-list");
		const tabs = screen.getAllByTestId("rg-transaction-tab");
		const radioFields = screen.getAllByTestId("transaction-radio-field");
		act(() => {
			fireEvent.click(selectButton[0]);
			fireEvent.click(selectButton[1]);
			fireEvent.click(itemList[1]);
			fireEvent.click(itemList[6]);
			fireEvent.click(tabs[1]);
			fireEvent.click(radioFields[0]);
		});
		expect(container).toBeInTheDocument();
		expect(setCurrencySelectToggle).toHaveBeenCalled();
		expect(setNetworkSelectToggle).toHaveBeenCalled();
		expect(handleSelectedItem).toHaveBeenCalled();
		expect(filterTransactionTabs).toHaveBeenCalled();
		expect(handlePaymentType).toHaveBeenCalled();
	});

	it("does not render Transaction radio", async () => {
		const setCurrencySelectToggle = jest.fn();
		const setNetworkSelectToggle = jest.fn();
		const handleSelectedItem = jest.fn();
		const filterTransactionTabs = jest.fn();
		const handlePaymentType = jest.fn();
		render(
			<WithdrawFiat
				currencySelectToggle={true}
				setCurrencySelectToggle={(bool) => setCurrencySelectToggle(!bool)}
				currencySelectData={currencySelectData}
				currencySelectLabel={"Currency"}
				currencySelectPlaceholder={"Select Currency"}
				networkSelectToggle={true}
				setNetworkSelectToggle={(bool) => setNetworkSelectToggle(!bool)}
				networkSelectData={networkSelectData}
				networkSelectLabel={"Network"}
				networkSelectPlaceholder={"Select Network"}
				transactionTabs={transactionTabs}
				handleTransactionTabs={(value) => filterTransactionTabs(value)}
				selectedItem={(index: number, select: string) =>
					handleSelectedItem(index, select)
				}
				currency={CurrencyEnum.NAIRA}
				paymentTypes={[]}
				handlePaymentType={(value: string) => handlePaymentType(value)}
			/>
		);

		const radioContainer = screen.getByTestId(
			"transaction-withdraw-fiat-radio"
		);
		expect(radioContainer.children.length).toBe(0);
	});
});
