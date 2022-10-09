import BuyCryptoPaymentMethods from "./BuyCryptoPaymentMethods";
import { screen, render, fireEvent } from "@testing-library/react";

describe("BuyCryptoPaymentMethods", () => {
	it("should render correctly", () => {
		render(
			<BuyCryptoPaymentMethods
				showPaymentMethods={true}
				amount={500}
				handlePaymentContinue={() => null}
			/>
		);
		expect(
			screen.getByTestId("buy-crypto-payment-methods")
		).toBeInTheDocument();
	});
	it("should render if showPaymentMethods is false", () => {
		render(
			<BuyCryptoPaymentMethods
				showPaymentMethods={false}
				handlePaymentContinue={() => null}
				amount={1000}
			/>
		);
		expect(screen.queryByTestId("buy-crypto-payment-methods")).toBeNull();
	});
	it("should render amount correctly", () => {
		render(
			<BuyCryptoPaymentMethods
				showPaymentMethods={true}
				amount={1000}
				handlePaymentContinue={() => null}
			/>
		);
		expect(screen.getByTestId("crypto-payment-amount").innerHTML).toBe("$1000");
	});
	it("should call handlePaymentContinue handler once which clicked", () => {
		const handlePaymentContinue = jest.fn();
		render(
			<BuyCryptoPaymentMethods
				showPaymentMethods={true}
				amount={1000}
				handlePaymentContinue={() => handlePaymentContinue()}
			/>
		);
		const buttonEl = screen.getByTestId("crypto-payment-button");
		fireEvent.click(buttonEl);
		expect(handlePaymentContinue).toHaveBeenCalledTimes(1);
	});
});
