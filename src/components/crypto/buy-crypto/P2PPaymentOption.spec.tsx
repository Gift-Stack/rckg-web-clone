import { render, screen, fireEvent } from "@testing-library/react";
import P2PPaymentOption from "./P2PPaymentOption";

describe("P2PPaymentOption", () => {
	it("should render correctly", () => {
		const cryptoAmount = 0.00123;
		const cryptoName = "LINK";
		render(
			<P2PPaymentOption
				selectedMethod={"Fiat"}
				setSelectedMethod={() => {}}
				title={"Bank Transfer"}
				cryptoAmount={cryptoAmount}
				cryptoName={cryptoName}
			/>
		);
		expect(screen.getByTestId("p2p-payment-option")).toBeInTheDocument();
	});
	it("should render amount and title correctly", () => {
		const cryptoAmount = 0.00123;
		const cryptoName = "LINK";
		render(
			<P2PPaymentOption
				selectedMethod={"Fiat"}
				setSelectedMethod={() => {}}
				title={"Bank Transfer"}
				cryptoAmount={cryptoAmount}
				cryptoName={cryptoName}
			/>
		);
		expect(screen.getByTestId("payment-option-title").innerHTML).toBe(
			"Bank Transfer"
		);
		expect(screen.getByTestId("crypto-amount").innerHTML).toBe(
			`${cryptoAmount} ${cryptoName}`
		);
	});

	it("should call setSelectedMethod once", () => {
		const setSelectedMethod = jest.fn();
		render(
			<P2PPaymentOption
				selectedMethod={"Fiat"}
				setSelectedMethod={() => setSelectedMethod()}
				title={"Bank Transfer"}
				cryptoAmount={0}
				cryptoName={""}
			/>
		);
		const buttonEl = screen.getByTestId("p2p-payment-option-select-button");
		fireEvent.click(buttonEl);
		expect(setSelectedMethod).toHaveBeenCalledTimes(1);
	});
});
