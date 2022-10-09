import DashboardReducer from "./dashboard.reducer";
import * as types from "../types";

describe("Dashboard Reducer", () => {
	const initialState = {
		loading: false,
		error: null,
		showTotalBalance: true,
	};
	it("should return initial state correctly", () => {
		expect(DashboardReducer(undefined, {})).toEqual(initialState);
	});

	// handle similar request cases
	it.each([
		{ type: types.BALANCE_DETAILS.REQUEST },
		{ type: types.UPDATES_ANNOUNCEMENTS.REQUEST },
		{ type: types.LOGIN_TRACKER.REQUEST },
		{ type: types.TRANSACTION_HISTORY.REQUEST },
		{ type: types.SECURITY_SETTINGS.REQUEST },
		{ type: types.APP_DOWNLOAD.REQUEST },
	])("handle $type", ({ type }) => {
		expect(DashboardReducer(initialState, { type })).toEqual({
			...initialState,
			loading: true,
		});
	});

	// handle success cases
	it("should handle BALANCE_DETAILS.SUCCESS", () => {
		expect(
			DashboardReducer(initialState, {
				type: types.BALANCE_DETAILS.SUCCESS,
				payload: {},
			})
		).toEqual({ ...initialState, balanceDetails: {} });
	});

	it("should handle UPDATES_ANNOUNCEMENTS.SUCCESS", () => {
		expect(
			DashboardReducer(initialState, {
				type: types.UPDATES_ANNOUNCEMENTS.SUCCESS,
				payload: "update and announcememt",
			})
		).toEqual({
			...initialState,
			updatesAndAnnouncements: "update and announcememt",
		});
	});
	it("should handle LOGIN_TRACKER.SUCCESS", () => {
		expect(
			DashboardReducer(initialState, {
				type: types.LOGIN_TRACKER.SUCCESS,
				payload: "login tracker details",
			})
		).toEqual({
			...initialState,
			loginTracker: "login tracker details",
		});
	});
	it("should handle TRANSACTION_HISTORY.SUCCESS", () => {
		expect(
			DashboardReducer(initialState, {
				type: types.TRANSACTION_HISTORY.SUCCESS,
				payload: "transaction history",
			})
		).toEqual({
			...initialState,
			transactionHistory: "transaction history",
		});
	});
	it("should handle SECURITY_SETTINGS.SUCCESS", () => {
		expect(
			DashboardReducer(initialState, {
				type: types.SECURITY_SETTINGS.SUCCESS,
				payload: "security details",
			})
		).toEqual({
			...initialState,
			securitySettings: "security details",
		});
	});
	it("should handle  APP_DOWNLOAD.SUCCESS", () => {
		expect(
			DashboardReducer(initialState, {
				type: types.APP_DOWNLOAD.SUCCESS,
				payload: "security details",
			})
		).toEqual({
			...initialState,
			appDownload: "security details",
		});
	});

	//handle similar failed cases
	it.each([
		{ type: types.BALANCE_DETAILS.FAILURE, payload: "failed operation" },
		{ type: types.UPDATES_ANNOUNCEMENTS.FAILURE, payload: "failed operation" },
		{ type: types.LOGIN_TRACKER.FAILURE, payload: "failed operation" },
		{ type: types.TRANSACTION_HISTORY.FAILURE, payload: "failed operation" },
		{ type: types.SECURITY_SETTINGS.FAILURE, payload: "failed operation" },
		{ type: types.APP_DOWNLOAD.FAILURE, payload: "failed operation" },
	])("should handle $type", ({ type, payload }) => {
		expect(DashboardReducer(initialState, { type, payload })).toEqual({
			...initialState,
			error: payload,
		});
	});

	it("should handle TOGGLE_TOTAL_BALANCE", () => {
		expect(
			DashboardReducer(initialState, { type: types.TOGGLE_TOTAL_BALANCE })
		).toEqual({ ...initialState, showTotalBalance: false });
	});
});
