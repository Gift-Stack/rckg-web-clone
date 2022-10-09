import { render, screen } from "@testing-library/react";
import { RateState, ValueState } from "./enum";
import SwitcherTradeValue from "./SwitcherTradeValue";

describe("SwictherTradeValue Component", () => {
	it("renders SwictherTradeValue as expected", async () => {
		render(
			<SwitcherTradeValue
				rate={"24h Change"}
				value={2886.71}
				valueChange={"+6.7%"}
				rateState={RateState.DEFAULT}
				valueState={ValueState.GREEN}
			/>
		);
		const switcherTradeValue = await screen.getByTestId(
			"rg-switcher-trade-value"
		);
		expect(switcherTradeValue.textContent).toContain("24h Change");
		expect(switcherTradeValue.querySelectorAll("p")[0].className).toContain(
			RateState.DEFAULT
		);
		expect(switcherTradeValue.querySelectorAll("p")[1].className).toContain(
			ValueState.GREEN
		);
		expect(switcherTradeValue.textContent).toContain("2,886.71");
	});

	it("confirm that SwitcherTradeValue renders default Properties", async () => {
		render(<SwitcherTradeValue rate={"24h High"} value={46700} />);
		const switcherTradeValue = await screen.getByTestId(
			"rg-switcher-trade-value"
		);
		expect(switcherTradeValue.textContent).toContain("24h High");
		expect(switcherTradeValue.querySelectorAll("p")[0].className).toContain(
			RateState.DEFAULT
		);
		expect(switcherTradeValue.querySelectorAll("p")[1].className).toContain(
			ValueState.DEFAULT
		);
		expect(switcherTradeValue.textContent).toContain("46,700.00");
	});
});
