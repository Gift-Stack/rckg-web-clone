import { fireEvent, render, screen } from "@testing-library/react";
import { CoinPairEnum } from "../../../types/enum";
import CoinPairSwitcherOption from "./CoinPairSwitcherOption";

const coinPairs: string[] = [CoinPairEnum.BTC_USDT, CoinPairEnum.BTC_ETH];

describe("CoinPairSwitcherOption Component", () => {
	it.todo("renders CoinPairSwitcherOption as expected");
	it.todo("confirm the second select option is selected");
	// it("renders CoinPairSwitcherOption as expected", async () => {
	// 	const handleChange = jest.fn();
	// 	// render(<CoinPairSwitcherOption onSwitch={handleChange} />);
	// 	const select = await screen.getByTestId("rg-cpso-select");
	// 	let options = screen.getAllByTestId("rg-cpso-select-option");
	// 	expect((select as HTMLSelectElement).value).toBe(CoinPairEnum.BTC_USDT);
	// 	expect(options.length).toBe(2);
	// 	expect((options[0] as HTMLOptionElement).selected).toBeTruthy();
	// 	expect((options[1] as HTMLOptionElement).selected).toBeFalsy();
	// });

	// it("confirm the second select option is selected", async () => {
	// 	const handleChange = jest.fn();
	// 	// render(<CoinPairSwitcherOption onSwitch={handleChange} />);
	// 	const select = await screen.getByTestId("rg-cpso-select");
	// 	let options = screen.getAllByTestId("rg-cpso-select-option");
	// 	expect(options.length).toBe(2);
	// 	fireEvent.change(select, { target: { value: CoinPairEnum.BTC_ETH } });
	// 	expect((options[0] as HTMLOptionElement).selected).toBeFalsy();
	// 	expect((options[1] as HTMLOptionElement).selected).toBeTruthy();
	// });
});
