import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { TradeSwitch } from "./TradeSwitch";

describe("TradeSwitch", () => {
	it("renders properly", async () => {
		const setActive = jest.fn();
		render(
			<TradeSwitch
				handleSwitch={setActive}
				switchItem={["BUY", "SELL"]}
				active={"BUY"}
			/>
		);

		const trade_switch = screen.getByTestId("trade-switch");
		act(() => {
			fireEvent.click(trade_switch.children[0]);
		});
		expect(trade_switch).toBeInTheDocument();
		expect(trade_switch.children.length).toBe(2);
		expect(trade_switch.className).toContain("flex trade_switch");
		expect(trade_switch.children[0].className).toContain(
			"bg-active trade_switch__active"
		);
		expect(trade_switch.children[1].className).toContain(
			"bg-gray-600 trade_switch__notActive"
		);
		expect(setActive).toHaveBeenCalled();
	});

	it("renders properly with second button active", async () => {
		const setActive = jest.fn();
		render(
			<TradeSwitch
				handleSwitch={setActive}
				switchItem={["BUY", "SELL"]}
				active={"SELL"}
			/>
		);

		const trade_switch = screen.getByTestId("trade-switch");
		act(() => {
			fireEvent.click(trade_switch.children[1]);
		});
		expect(trade_switch.children[1].className).toContain(
			"bg-orange trade_switch__active"
		);
		expect(trade_switch.children[0].className).toContain(
			"bg-gray-600 trade_switch__notActive"
		);
		expect(setActive).toHaveBeenCalled();
	});
});
