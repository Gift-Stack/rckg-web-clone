import { act, fireEvent, render, screen } from "@testing-library/react";
import { CancelEye } from "../../../assets";
import BalanceVisibility from "./BalanceVisibiity";

describe("BalanceVisibility", () => {
	it("renders BalanceVisibility for balance details properly", async () => {
		const handleClick = jest.fn();
		render(
			<BalanceVisibility
				value={"Hide Balance"}
				icon={<CancelEye />}
				onClick={handleClick}
			/>
		);
		const balance = await screen.getByTestId("rg-balance-visibility");
		act(() => {
			fireEvent.click(balance);
		});
		expect(balance.innerHTML).toContain("Hide Balance");
		expect(handleClick).toHaveBeenCalled();
	});

	it("renders BalanceVisibility for balance details properly", async () => {
		render(
			<BalanceVisibility
				value={"Show Balance"}
				icon={<CancelEye />}
				onClick={() => {}}
			/>
		);
		const balance = await screen.getByTestId("rg-balance-visibility");
		expect(balance.innerHTML).toContain("Show Balance");
	});
});
