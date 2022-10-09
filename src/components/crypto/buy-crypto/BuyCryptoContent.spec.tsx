import { render, screen, fireEvent } from "@testing-library/react";
import BuyCryptoContent from "./BuyCryptoContent";

describe("BuyCryptoContent", () => {
	it("should render correctly", () => {
		render(
			<BuyCryptoContent
				handleContinue={() => {}}
				showBuy={true}
				setAmount={() => null}
			/>
		);
		const containerEl = screen.getByTestId("buy-crypto-content");
		expect(containerEl).toBeInTheDocument();
	});
	it("should render continue button", () => {
		render(
			<BuyCryptoContent
				handleContinue={() => {}}
				showBuy={true}
				setAmount={(amount: number) => null}
			/>
		);
		const continueButtonEl = screen.getByTestId("continue-button");
		expect(continueButtonEl).toBeInTheDocument();
	});
	it("should call handle continue handle correctly", () => {
		const handleContinue = jest.fn();
		render(
			<BuyCryptoContent
				handleContinue={() => handleContinue()}
				showBuy={true}
				setAmount={() => null}
			/>
		);
		const continueButtonEl = screen.getByTestId("continue-button");
		fireEvent.click(continueButtonEl);
		expect(handleContinue).toHaveBeenCalledTimes(1);
	});
	it("should not when showBuy is false", () => {
		render(
			<BuyCryptoContent
				showBuy={false}
				handleContinue={() => {}}
				setAmount={() => null}
			/>
		);
		expect(screen.queryByTestId("buy-crypto-content")).toBeNull();
	});

	it("should switch crypto correctly", () => {
		const setAmount = jest.fn();
		render(
			<BuyCryptoContent
				showBuy={true}
				handleContinue={() => {}}
				setAmount={() => setAmount()}
			/>
		);
		const switchEl = screen.getByTestId("switch-crypto-button");
		fireEvent.click(switchEl);
		expect(setAmount).toHaveBeenCalledTimes(1);
	});
});
