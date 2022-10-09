import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { CoinEnum, CurrencyEnum } from "../../types/enum";
import { PaymentType } from "./enum";
import { ITransactionSelectItem } from "./model";
import TransactionSelect from "./TransactionSelect";
import { coinSelectItems } from "./data";
import { BnbBtc, BtcBtc, DodgeBtc, EthBtc, LtcBtc } from "../../assets";

const data: ITransactionSelectItem[] = coinSelectItems.map((c) => {
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

describe("TransactionSelect", () => {
	it("renders properly", async () => {
		const setCoinSelectToggle = jest.fn();
		const selectedItem = jest.fn();
		render(
			<TransactionSelect
				toggle={true}
				setToggle={setCoinSelectToggle(true)}
				selectItems={data}
				label={"Coin"}
				placeholder={"Select Coin"}
				selectedItem={(index: number) => selectedItem(index, "Coin")}
			/>
		);

		const select = screen.getByTestId("transaction-select");
		const item = screen.getByTestId("transaction-select-item");
		const itemList = screen.getAllByTestId("transaction-select-item-list");
		act(() => {
			fireEvent.click(select);
			fireEvent.click(itemList[0]);
		});
		expect(select).toBeInTheDocument();
		expect(item).toBeInTheDocument();
		expect(itemList.length).toBe(5);
		expect(setCoinSelectToggle).toHaveBeenCalled();
		expect(selectedItem).toHaveBeenCalled();
	});
});
