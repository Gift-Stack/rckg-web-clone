import { render, screen, fireEvent } from "@testing-library/react";
import CreditCardPaymentOption from "./CreditCardPaymentOption";

describe("CreditCardPaymentOption", () => {
	it("should render correctly", () => {
		const cryptoAmount = 0.00123;
		const cryptoName = "LINK";
		render(
			<CreditCardPaymentOption
				selectedMethod={"Fiat"}
				setSelectedMethod={() => {}}
				cryptoAmount={cryptoAmount}
				cryptoName={cryptoName}
			/>
		);
		expect(
			screen.getByTestId("credit-card-payment-option")
		).toBeInTheDocument();
		expect(screen.getByTestId("payment-option-title").innerHTML).toBe(
			"Visa / Mastercard"
		);
		expect(screen.getByTestId("crypto-amount").innerHTML).toBe(
			`${cryptoAmount} ${cryptoName}`
		);
	});
	it("should call setSelectedMethod once", () => {
		const setSelectedMethod = jest.fn();
		render(
			<CreditCardPaymentOption
				selectedMethod={"Mobile Money"}
				setSelectedMethod={() => setSelectedMethod()}
				cryptoAmount={0}
				cryptoName={""}
			/>
		);
		const buttonEl = screen.getByTestId("select-credit-payment-option");
		fireEvent.click(buttonEl);
		expect(setSelectedMethod).toHaveBeenCalledTimes(1);
	});
});
