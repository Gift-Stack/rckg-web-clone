import PublicReducer from "./publics.reducer";
import * as types from "../types";
describe("Public Reducer", () => {
	const initialState = {
		loading: false,
		countries: [],
		error: null,
	};
	const countries = ["nigeria", "ghana"];
	it("should return default state", () => {
		expect(PublicReducer(undefined, {})).toEqual(initialState);
	});
	it("should handle COUNTRIES.REQUEST", () => {
		expect(
			PublicReducer(initialState, { type: types.COUNTRIES.REQUEST })
		).toEqual({
			...initialState,
			loading: true,
		});
	});
	it("should handle COUNTRIES.SUCCESS", () => {
		expect(
			PublicReducer(initialState, {
				type: types.COUNTRIES.SUCCESS,
				payload: countries,
			})
		).toEqual({
			...initialState,
			countries,
		});
	});
	it("should handle COUNTRIES.FAILURE", () => {
		expect(
			PublicReducer(initialState, {
				type: types.COUNTRIES.FAILURE,
				payload: "failed operation",
			})
		).toEqual({
			...initialState,
			error: "failed operation",
		});
	});
});
