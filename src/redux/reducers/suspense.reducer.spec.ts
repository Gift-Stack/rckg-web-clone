import SuspenseReducer from "./suspense.reducer";
import * as types from "../types";

describe("SuspenseReducer", () => {
	const initialState = false;
	it("should return  inital state", () => {
		expect(SuspenseReducer(initialState, {})).toEqual(initialState);
	});

	it("should handle SUSPEND", () => {
		expect(
			SuspenseReducer(initialState, { type: types.SUSPEND, payload: true })
		).toEqual(true);
	});
});
