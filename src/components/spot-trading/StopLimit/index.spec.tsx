import { fireEvent, render, screen } from "@testing-library/react";
import { Formik } from "formik";
import { act } from "react-dom/test-utils";
import StopLimit from ".";
import customRender from "../../../../__mocks__/customRender";

describe("Limit", () => {
	it("renders properly", async () => {
		// const handleSubmit = jest.fn();
		// const setValues = jest.fn();
		// const setTradeRate = jest.fn();
		// customRender(
		// 	<Formik initialValues={{ mobile_number: "" }} onSubmit={handleSubmit}>
		// 		{(formik) => {
		// 			return (
		// 				<StopLimit
		// 					btnState={"BUY"}
		// 					setValues={setValues}
		// 					setTradeRate={setTradeRate}
		// 				/>
		// 			);
		// 		}}
		// 	</Formik>,
		// 	{}
		// );
		// const trade_stop_limit = await screen.getByTestId("rg-trade-stop-limit");
		// act(() => {
		// 	fireEvent.submit(trade_stop_limit);
		// });
		// expect(trade_stop_limit).toBeInTheDocument();
		// expect(trade_stop_limit.children.length).toBe(5);
	});
});
