import ProfileReducer, { initialState } from "./profile.reducer";
import * as types from "../types";

describe("Profile Reducer", () => {
	// handle similar request cases
	it("should return default state", () => {
		expect(ProfileReducer(undefined, { type: "", payload: "" })).toEqual(
			initialState
		);
	});
	it.each([
		{ type: types.FETCH_PROFILE.REQUEST },
		{ type: types.UPDATE_PROFILE.REQUEST },
	])("should handle $type", ({ type }) => {
		expect(ProfileReducer(initialState, { type, payload: "" })).toEqual({
			...initialState,
			loading: true,
		});
	});
	//handle similar success cases
	it.each([
		{ type: types.FETCH_PROFILE.SUCCESS, payload: initialState },
		{ type: types.UPDATE_PROFILE.SUCCESS, payload: initialState },
	])("should handle $type", ({ type, payload }) => {
		expect(ProfileReducer(initialState, { type, payload })).toEqual({
			...initialState,
			loading: false,
		});
	});
	// handle similar failed operation
	it.each([
		{ type: types.FETCH_PROFILE.FAILURE, payload: "error" },
		{ type: types.UPDATE_PROFILE.FAILURE, payload: "error" },
	])("should handle $type", ({ type, payload }) => {
		expect(ProfileReducer(initialState, { type, payload })).toEqual({
			...initialState,
			loading: false,
			error: payload,
		});
	});
});
