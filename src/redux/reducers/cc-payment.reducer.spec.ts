import CCPaymentReducer from "./cc-payment.reducer";
import * as types from "./../types";

describe("CC Payment", () => {
	const initialState = {
		loading: false,
		error: null,
	};
	it("should return initial state correctly", () => {
		expect(CCPaymentReducer(undefined, {})).toEqual(initialState);
	});
	it("should handle MAKE_PAYMENT.REQUEST", () => {
		expect(
			CCPaymentReducer(initialState, { type: types.MAKE_PAYMENT.REQUEST })
		).toEqual({ ...initialState, loading: true });
	});
	it("should handle MAKE_PAYMENT.SUCCESS", () => {
		expect(
			CCPaymentReducer(initialState, { type: types.MAKE_PAYMENT.SUCCESS })
		).toEqual({ ...initialState, loading: false });
	});
	it("should handle MAKE_PAYMENT.FAILURE", () => {
		expect(
			CCPaymentReducer(initialState, {
				type: types.MAKE_PAYMENT.FAILURE,
				payload: "error",
			})
		).toEqual({ ...initialState, error: "error" });
	});
	it("should handle PAYMENT_DETAILS", () => {
		expect(
			CCPaymentReducer(initialState, {
				type: types.PAYMENT_DETAILS,
				payload: "payment details",
			})
		).toEqual({ ...initialState, paymentDetails: "payment details" });
	});
});
