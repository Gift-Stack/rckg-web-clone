import WalletReducer, { initialState } from "./wallet.reducer";
import * as types from "../types";

describe("Wallet Reducer", () => {
	// handle similar request cases
	it("should return default state", () => {
		expect(WalletReducer(undefined, { type: "", payload: "" })).toEqual(
			initialState
		);
	});
	it.each([{ type: types.FETCH_WALLET_ASSETS_BALANCE.REQUEST }])(
		"should handle $type",
		({ type }) => {
			expect(WalletReducer(initialState, { type, payload: "" })).toEqual({
				...initialState,
				loading: true,
			});
		}
	);
	//handle similar success cases
	it.each([
		{ type: types.FETCH_WALLET_ASSETS_BALANCE.SUCCESS, payload: initialState },
	])("should handle $type", ({ type, payload }) => {
		expect(WalletReducer(initialState, { type, payload })).toEqual({
			...initialState,
			loading: false,
			assets: payload,
		});
	});
	// handle similar failed operation
	it.each([
		{ type: types.FETCH_WALLET_ASSETS_BALANCE.FAILURE, payload: "error" },
	])("should handle $type", ({ type, payload }) => {
		expect(WalletReducer(initialState, { type, payload })).toEqual({
			...initialState,
			loading: false,
			error: payload,
		});
	});
});
