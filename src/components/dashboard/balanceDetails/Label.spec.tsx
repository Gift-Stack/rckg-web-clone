import { render, screen } from "@testing-library/react";
import { CurrencyEnum } from "../../../types/enum";
import { BoxFillState, BoxOutlineState } from "../../box/enum";
import Label from "./Label";

describe("Label", () => {
	it("renders Label for balance details properly", async () => {
		render(
			<Label
				fill={BoxFillState.GREEN}
				outline={BoxOutlineState.NONE}
				currency={CurrencyEnum["USDT"]}
				amount={288.491536}
			/>
		);
		const label = await screen.getByTestId("rg-labelUI");
		const box = await screen.getByTestId("rg-box");
		expect(label.innerHTML).toContain("288.491536");
		expect(label.innerHTML).toContain("USDT");
		expect(box).toBeInTheDocument();
		expect(box.className).toContain(BoxFillState.GREEN);
		expect(box.className).toContain(BoxOutlineState.NONE);
	});

	it("box has yellow background color and currency displays BTC", async () => {
		render(
			<Label
				fill={BoxFillState.SECONDARY}
				outline={BoxOutlineState.NONE}
				currency={CurrencyEnum["BTC"]}
				amount={0.00747186}
			/>
		);
		const label = await screen.getByTestId("rg-labelUI");
		const box = await screen.getByTestId("rg-box");
		expect(label.innerHTML).toContain("0.00747186");
		expect(label.innerHTML).toContain("BTC");
		expect(box.className).toContain(BoxFillState.SECONDARY);
	});

	it("box has pink background color and currency displays ETH", async () => {
		render(
			<Label
				fill={BoxFillState.PINK}
				outline={BoxOutlineState.NONE}
				currency={CurrencyEnum["ETH"]}
				amount={0.00747186}
			/>
		);
		const label = await screen.getByTestId("rg-labelUI");
		const box = await screen.getByTestId("rg-box");
		expect(label.innerHTML).toContain("0.00747186");
		expect(label.innerHTML).toContain("ETH");
		expect(box.className).toContain(BoxFillState.PINK);
	});
});
