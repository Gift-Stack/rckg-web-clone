import { fireEvent, render, screen } from "@testing-library/react";
import { Coin } from "./model";
import CoinPairSwitcher from ".";
import { CoinPairEnum } from "../../../types/enum";

const coins: Coin[] = [
	{
		id: 1,
		totalTradeValue: 45900.63,
		coinPair: CoinPairEnum.BTC_USDT,
		tradeValues: [
			{
				id: 1,
				rate: "24h Change",
				value: 2886.71,
				valueChange: "+6.7%",
			},
			{
				id: 2,
				rate: "24h High",
				value: 46700,
			},
			{
				id: 3,
				rate: "24h Low",
				value: 42779,
			},
			{
				id: 4,
				rate: "24h Volume(BTC)",
				value: 74122.41,
			},
			{
				id: 5,
				rate: "24h Volume(USDT)",
				value: 3556882200.49,
			},
		],
	},
	{
		id: 2,
		totalTradeValue: 45900.63,
		coinPair: CoinPairEnum.BTC_ETH,
		tradeValues: [
			{
				id: 1,
				rate: "24h Change",
				value: 2886.71,
				valueChange: "+6.7%",
			},
			{
				id: 2,
				rate: "24h High",
				value: 46700,
			},
			{
				id: 3,
				rate: "24h Low",
				value: 42779,
			},
			{
				id: 4,
				rate: "24h Volume(BTC)",
				value: 74122.41,
			},
			{
				id: 5,
				rate: "24h Volume(USDT)",
				value: 3556882200.49,
			},
		],
	},
];

describe("CoinPairSwitcher Component", () => {
	it.todo("renders CoinPairSwitcher component Properly");
	// it("renders CoinPairSwitcher component Properly", async () => {
	// 	render(<CoinPairSwitcher coins={coins} />);
	// 	const cps = await screen.getByTestId("rg-coinpair-switcher");
	// 	const card = await screen.getByTestId("rg-card");
	// 	const switcherTradeValue = await screen.getAllByTestId(
	// 		"rg-switcher-trade-value"
	// 	);
	// 	const select = await screen.getAllByTestId("rg-cpso-select");
	// 	let options = await screen.getAllByTestId("rg-cpso-select-option");
	// 	expect(cps.textContent).toContain("$");
	// 	expect(cps.textContent).toContain("45,900.63");
	// 	expect(cps.children.length).toBe(1);
	// 	expect(cps.innerHTML).toContain(card.innerHTML);
	// 	expect(switcherTradeValue.length).toBe(9);
	// 	expect((select[0] as HTMLSelectElement).value).toBe(CoinPairEnum.BTC_USDT);
	// 	expect(options.length).toBe(4);
	// 	expect((options[0] as HTMLOptionElement).selected).toBeTruthy();
	// 	expect((options[1] as HTMLOptionElement).selected).toBeFalsy();
	// });

	it.todo("confirm currency changed when the select option value changes");
	// it("confirm currency changed when the select option value changes", async () => {
	// 	render(<CoinPairSwitcher coins={coins} />);
	// 	const cps = await screen.getByTestId("rg-coinpair-switcher");
	// 	const select = await screen.getAllByTestId("rg-cpso-select");
	// 	let options = await screen.getAllByTestId("rg-cpso-select-option");
	// 	fireEvent.change(select[0], { target: { value: CoinPairEnum.BTC_ETH } });
	// 	expect((options[0] as HTMLOptionElement).selected).toBeFalsy();
	// 	expect((options[1] as HTMLOptionElement).selected).toBeTruthy();
	// 	expect((select[0] as HTMLSelectElement).value).toBe(CoinPairEnum.BTC_ETH);
	// 	expect(cps.textContent).toContain("ETH");
	// });
});
