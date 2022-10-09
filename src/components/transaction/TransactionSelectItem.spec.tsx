import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { CoinEnum } from "../../types/enum";
import { ITransactionSelectItem } from "./model";
import { coinSelectItems } from "./data";
import { BnbBtc, BtcBtc, DodgeBtc, EthBtc, LtcBtc } from "../../assets";
import TransactionSelectItem from "./TransactionSelectItem";

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

describe("TransactionSelectItem", () => {
	it("renders properly", async () => {
		const handleSelected = jest.fn();
		render(
			<TransactionSelectItem
				items={data}
				handleSelected={(id) => handleSelected(id)}
			/>
		);

		const item = screen.getByTestId("transaction-select-item");
		const itemList = screen.getAllByTestId("transaction-select-item-list");
		act(() => {
			fireEvent.click(itemList[0]);
		});
		expect(item).toBeInTheDocument();
		expect(itemList.length).toBe(5);
		expect(handleSelected).toHaveBeenCalled();
	});
});
