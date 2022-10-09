import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import TransactionSwitch from "./TransactionSwitch";

describe("TransactionSwitch", () => {
	it("renders properly", async () => {
		const handleSetActive = jest.fn();
		render(
			<TransactionSwitch
				handleSwitch={(value: string) => handleSetActive(value)}
				switchItem={["Deposit Crypto", "Deposit Fiat"]}
				active={"Deposit Crypto"}
			/>
		);

		const switch_ = screen.getByTestId("transaction-switch");
		const singleswitch_ = screen.getByTestId("transaction-switch-1");
		act(() => {
			fireEvent.click(singleswitch_);
		});
		expect(switch_).toBeInTheDocument();
		expect(singleswitch_).toBeInTheDocument();
		expect(handleSetActive).toHaveBeenCalled();
	});
});
