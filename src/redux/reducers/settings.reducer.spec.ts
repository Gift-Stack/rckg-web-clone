import SettingsReducer, { initialState } from "./settings.reducer";
import * as types from "../types";
describe("Settings Reducer", () => {
	const requestCases = [
		{ type: types.GET_ALL_SETTINGS.REQUEST },
		{ type: types.TOGGLE_SMS_AUTH.REQUEST },
		{ type: types.TOGGLE_EMAIL_AUTH.REQUEST },
		{ type: types.GET_ALL_LOGIN_ACTIVITIES.REQUEST },
	];
	const successCases = [
		{ type: types.GET_ALL_SETTINGS.SUCCESS },
		{ type: types.TOGGLE_SMS_AUTH.SUCCESS },
		{ type: types.TOGGLE_EMAIL_AUTH.SUCCESS },
	];
	const failureCases = [
		{ type: types.GET_ALL_SETTINGS.FAILURE },
		{ type: types.TOGGLE_SMS_AUTH.FAILURE },
		{ type: types.TOGGLE_EMAIL_AUTH.FAILURE },
		{ type: types.GET_ALL_LOGIN_ACTIVITIES.FAILURE },
	];
	it("should return initial state", () => {
		expect(SettingsReducer(undefined, { type: "", payload: "" })).toEqual(
			initialState
		);
	});
	// handle request cases
	it.each(requestCases)("should handle $type", ({ type }) => {
		expect(SettingsReducer(initialState, { type, payload: "" })).toEqual({
			...initialState,
			loading: true,
		});
	});

	it("should handle GET_ALL_LOGIN_ACTIVITIES.SUCCESS", () => {
		expect(
			SettingsReducer(initialState, {
				type: types.GET_ALL_LOGIN_ACTIVITIES.SUCCESS,
				payload: [{ res: "response" }],
			})
		).toEqual({ ...initialState, loginActivities: [{ res: "response" }] });
	});

	// handle similar success cases
	it.each(successCases)("should handle $type", ({ type }) => {
		expect(
			SettingsReducer(initialState, { type, payload: { res: "response" } })
		).toEqual({
			...initialState,
			res: "response",
		});
	});

	// handle failure cases
	it.each(failureCases)("should handle $type", ({ type }) => {
		expect(SettingsReducer(initialState, { type, payload: "error" })).toEqual({
			...initialState,
			error: "error",
		});
	});
});
