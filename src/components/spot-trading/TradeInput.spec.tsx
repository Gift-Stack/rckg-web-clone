import { fireEvent, render, screen } from "@testing-library/react";
import { Formik } from "formik";
import { act } from "react-dom/test-utils";
import { CurrencyEnum } from "../../types/enum";
import TradeInput from "./TradeInput";

describe("TradeInput", () => {
	it.todo("Trade input");
	// it("renders properly", async () => {
	// 	const mockSubmitFn = jest.fn()
	// 	render(
	// 		<Formik
	// 			initialValues={{ price: "" }}
	// 			onSubmit={mockSubmitFn}
	// 		>
	// 			{(formik) => {
	// 				return (
	// 					<TradeInput
	// 						label={"Available"}
	// 						availablePrice={0.00012345}
	// 						availablePriceCurrency={CurrencyEnum.BTC}
	// 						convertedPrice={0.00012345}
	// 						convertedPriceCurrency={CurrencyEnum.USDT}
	// 						placeholder={"Price"}
	// 						type={"tel"}
	// 						name={"price"}
	// 						formik={formik}
	// 						onChange={formik.handleChange}
	// 						value={formik.values.price}
	// 						autoComplete="off"
	// 					/>
	// 				);
	// 			}}
	// 		</Formik>
	// 	);

	// 	const trade_input = screen.getByTestId("trade-input");
	// 	const input = screen.getByTestId("trade-input-input");
	//     act(() => {
	// 		fireEvent.change(input, { target: { value: "123" } });
	// 	});
	// 	expect(input).toHaveProperty("value", "123");
	// 	expect(input).toHaveProperty("type", "tel");
	// 	expect(trade_input.children.length).toBe(2);
	// 	expect(trade_input.innerHTML).toContain("0.00012345");
	// 	expect(trade_input.innerHTML).toContain(CurrencyEnum.BTC);
	// 	expect(trade_input.innerHTML).toContain(CurrencyEnum.USDT);
	// });
});
