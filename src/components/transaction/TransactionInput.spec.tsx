import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import TransactionInput from "./TransactionInput";

describe("MobileLoginActivityTable", () => {
	it("renders properly", async () => {
		const onAddressInput = jest.fn();
		render(
			<TransactionInput
				name={"address"}
				type={"text"}
				label={"Address"}
				onChange={(value) => onAddressInput(value)}
			/>
		);

		const input = screen.getByTestId("transaction-input");
		const field = screen.getByTestId("transaction-input-field");
		act(() => {
			fireEvent.change(field, { target: { value: "25gdvfwjsgg" } });
		});
		expect(input).toBeInTheDocument();
		expect(onAddressInput).toHaveBeenCalled();
		expect(field.getAttribute("type")).toEqual("text");
		expect(field.getAttribute("name")).toEqual("address");
	});

	it("has extras props", async () => {
		const onAddressInput = jest.fn();
		render(
			<TransactionInput
				name={"amount"}
				type={"number"}
				label={"Amount"}
				extras={"MAX"}
				onChange={(value) => onAddressInput(value)}
			/>
		);

		const input = screen.getByTestId("transaction-input");
		const field = screen.getByTestId("transaction-input-field");
		expect(input.innerHTML).toContain("MAX");
		expect(field.getAttribute("type")).toEqual("number");
		expect(field.getAttribute("name")).toEqual("amount");
	});
});
