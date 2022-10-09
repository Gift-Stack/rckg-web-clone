import { fireEvent, render, screen } from "@testing-library/react";
import SpotTradingAssets from ".";
import { AssetsButtonSize, AssetsButtonState } from "./enum";

describe("SpotTradingAssets", () => {
	it("renders properly", async () => {
		render(<SpotTradingAssets />);

		const assets = screen.getByTestId("rg-spot-trading-assets");
		const card = screen.getByTestId("rg-card");
		const container = screen.getByTestId("rg-assets-buttons-container");
		const buttons = screen.getByTestId("rg-assets-buttons");
		expect(assets.children.length).toBe(1);
		expect(card).toBeInTheDocument();
		expect(assets.innerHTML).toContain(card.innerHTML);
		expect(container.children.length).toBe(2);
		expect(buttons.children.length).toBe(2);
		expect(buttons.children[0].innerHTML).toContain("Deposit");
		expect(buttons.children[0].innerHTML).toContain(
			`${AssetsButtonState.DEFAULT} ${AssetsButtonSize.xxs}`
		);
		expect(buttons.children[1].innerHTML).toContain("Withdraw");
		expect(buttons.children[1].innerHTML).toContain(
			`${AssetsButtonState.DEFAULT} ${AssetsButtonSize.xxs}`
		);
	});
});
