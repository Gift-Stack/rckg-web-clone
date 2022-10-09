import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BnbBtc, BtcBtc, DodgeBtc, EthBtc, LtcBtc } from "../../../assets";
import { CoinEnum } from "../../../types/enum";
import { coinSelectItems, networkSelectItems } from "../data";
import { ITransactionSelectItem, ITransactionTip } from "../model";
import WithdrawCrypto from "./WithdrawCrypto";

const coinSelectData: ITransactionSelectItem[] = coinSelectItems.map((c) => {
	return {
		id: c.id,
		item: (
			<>
				<div className="flex items-center transaction-select-item text-neutral-400">
					<span>
						{c.name === CoinEnum.DOGE ? (
							<DodgeBtc />
						) : CoinEnum.LTC ? (
							<LtcBtc />
						) : CoinEnum.BNB ? (
							<BnbBtc />
						) : CoinEnum.BTC ? (
							<BtcBtc />
						) : (
							<EthBtc />
						)}
					</span>
					<span className="font-normal ml-3 block truncate">{c.name}</span>
				</div>
			</>
		),
		selected: false,
		name: c.name,
	};
});

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

const transactionTips: ITransactionTip[] = [
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

describe("WithdrawCrypto", () => {
	it("renders properly", async () => {
		const setCoinSelectToggle = jest.fn();
		const setNetworkSelectToggle = jest.fn();
		const handleSelectedItem = jest.fn();
		const setAddress = jest.fn();
		const setAmount = jest.fn();
		render(
			<WithdrawCrypto
				coinSelectToggle={true}
				setCoinSelectToggle={(bool) => setCoinSelectToggle(!bool)}
				coinSelectData={coinSelectData}
				coinSelectLabel={"Coin"}
				coinSelectPlaceholder={"Select Coin"}
				networkSelectToggle={true}
				setNetworkSelectToggle={(bool) => setNetworkSelectToggle(!bool)}
				networkSelectData={networkSelectData}
				networkSelectLabel={"Network"}
				networkSelectPlaceholder={"Select Network"}
				tips={transactionTips}
				selectedItem={(index: number, select: string) =>
					handleSelectedItem(index, select)
				}
				amount={""}
				onAddressInput={(value) => setAddress(value)}
				onAmountInput={(value) => setAmount(value)}
				availableCoinBalance={0}
			/>
		);

		const container = screen.getByTestId("transaction-withdraw-crypto");
		const selectButton = screen.getAllByTestId("transaction-select-button");
		const itemList = screen.getAllByTestId("transaction-select-item-list");
		const field = screen.getAllByTestId("transaction-input-field");
		act(() => {
			fireEvent.click(selectButton[0]);
			fireEvent.click(selectButton[1]);
			fireEvent.click(itemList[1]);
			fireEvent.click(itemList[9]);
			fireEvent.change(field[0], { target: { value: "25gdvfwjsgg" } });
			fireEvent.change(field[1], { target: { value: 200 } });
		});
		expect(container).toBeInTheDocument();
		expect(handleSelectedItem).toHaveBeenCalled();
		expect(setCoinSelectToggle).toHaveBeenCalled();
		expect(setNetworkSelectToggle).toHaveBeenCalled();
		expect(setAddress).toHaveBeenCalled();
		expect(setAmount).toHaveBeenCalled();
	});
});
