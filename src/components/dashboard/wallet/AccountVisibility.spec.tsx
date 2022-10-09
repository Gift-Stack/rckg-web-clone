import { act, fireEvent, render, screen } from "@testing-library/react";
import { CancelEye } from "../../../assets";
import AccountVisibility from "./AccountVisibility";

describe("AccountVisibility", () => {
	it("renders AccountVisibility for balance details properly", async () => {
		const handleClick = jest.fn();
		render(
			<AccountVisibility
				value={"Hide Balance"}
				icon={<CancelEye />}
				onClick={handleClick}
			/>
		);
		const balance = await screen.getByTestId("rg-account-visibility");
		act(() => {
			fireEvent.click(balance);
		});
		expect(balance.innerHTML).toContain("Hide Balance");
		expect(handleClick).toHaveBeenCalled();
	});

	it("renders AccountVisibility for balance details properly", async () => {
		render(
			<AccountVisibility
				value={"Show Balance"}
				icon={<CancelEye />}
				onClick={() => {}}
			/>
		);
		const balance = await screen.getByTestId("rg-account-visibility");
		expect(balance.innerHTML).toContain("Show Balance");
	});
});
