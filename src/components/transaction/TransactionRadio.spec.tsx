import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { CurrencyEnum } from "../../types/enum";
import { PaymentType } from "./enum";
import TransactionRadio from "./TransactionRadio";

describe("TransactionRadio", () => {
	it("renders properly", async () => {
		const handlePaymentType = jest.fn();
		render(
			<TransactionRadio
				currency={CurrencyEnum.USDT}
				name={"paymentType"}
				value={PaymentType.CARD}
				paymentType={"Visa / Mastercard"}
				paymentTypeEnum={PaymentType.CARD}
				onChange={handlePaymentType}
			/>
		);

		const radio = screen.getByTestId("transaction-radio");
		const field = screen.getByTestId("transaction-radio-field");
		act(() => {
			fireEvent.click(field);
		});
		expect(radio).toBeInTheDocument();
		expect(handlePaymentType).toHaveBeenCalled();
		expect(field.getAttribute("type")).toEqual("radio");
		expect(field.getAttribute("name")).toEqual("paymentType");
	});

	it("renders payment type ADVANCE", async () => {
		const handlePaymentType = jest.fn();
		render(
			<TransactionRadio
				currency={CurrencyEnum.USDT}
				name={"paymentType"}
				value={PaymentType.ADVANCE}
				paymentType={"Advance Cash"}
				paymentTypeEnum={PaymentType.ADVANCE}
				onChange={handlePaymentType}
			/>
		);

		const radio = screen.getByTestId("transaction-radio");
		expect(radio).toBeInTheDocument();
		expect(radio.innerHTML).toContain("Advance Cash");
		expect(radio.innerHTML).toContain(PaymentType.ADVANCE);
	});

	it("renders payment type P2P", async () => {
		const handlePaymentType = jest.fn();
		render(
			<TransactionRadio
				currency={CurrencyEnum.USDT}
				name={"paymentType"}
				value={PaymentType.P2P}
				paymentType={"P2P Bank Transfer"}
				paymentTypeEnum={PaymentType.P2P}
				onChange={handlePaymentType}
			/>
		);

		const radio = screen.getByTestId("transaction-radio");
		expect(radio).toBeInTheDocument();
		expect(radio.innerHTML).toContain("P2P Bank Transfer");
		expect(radio.innerHTML).toContain(PaymentType.P2P);
	});
});
