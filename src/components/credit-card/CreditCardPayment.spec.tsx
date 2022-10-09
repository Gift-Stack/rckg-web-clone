import { act, fireEvent, screen } from "@testing-library/react";
import customRender from "../../../__mocks__/customRender";
import CreditCardPayment from "./CreditCardPayment";

describe("CreditCardPayment", () => {
	it("should render correctly", () => {
		customRender(<CreditCardPayment />, {
			ccPayment: { paymentDetails: 5000 },
		});
		const CCContainerEl = screen.getByTestId("cc-payment-container");
		const CCPaymentSubheadingEl = screen.getByTestId("cc-payment-subheading");
		const CCCancelButton = screen.getByTestId("cc-cancel-button");
		const CCNextButton = screen.getByTestId("cc-next-button");

		expect(CCContainerEl).toBeInTheDocument();
		expect(CCPaymentSubheadingEl).toBeInTheDocument();
		expect(CCCancelButton).toBeInTheDocument();
		expect(CCNextButton).toBeInTheDocument();
	});
});
