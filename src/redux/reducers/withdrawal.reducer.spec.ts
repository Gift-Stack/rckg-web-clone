import WithdrawalReducer, { initialState } from "./withdrawal.reducer";
import * as types from "../types";

describe("Withdrawal Reducer", () => {
	// handle similar request cases
	it("should return default state", () => {
		expect(WithdrawalReducer(undefined, { type: "", payload: "" })).toEqual(
			initialState
		);
	});
	it.each([
		{ type: types.FETCH_WITHDRAWAL_CRYPTO_HISTORY.REQUEST },
		{ type: types.FETCH_CRYPTO_WITHDRAWAL_TRANSACTION_FEE.REQUEST },
		{ type: types.POST_CRYPTO_WITHDRAWAL.REQUEST },
	])("should handle $type", ({ type }) => {
		expect(WithdrawalReducer(initialState, { type, payload: "" })).toEqual({
			...initialState,
			loading: true,
		});
	});
	//handle similar success cases
	it.each([
		{
			type: types.FETCH_WITHDRAWAL_CRYPTO_HISTORY.SUCCESS,
			payload: initialState,
		},
	])("should handle $type", ({ type, payload }) => {
		expect(WithdrawalReducer(initialState, { type, payload })).toEqual({
			...initialState,
			loading: false,
			history: payload,
		});
	});
	it.each([
		{
			type: types.FETCH_CRYPTO_WITHDRAWAL_TRANSACTION_FEE.SUCCESS,
			payload: initialState,
		},
		{ type: types.POST_CRYPTO_WITHDRAWAL.SUCCESS, payload: initialState },
	])("should handle $type", ({ type, payload }) => {
		expect(WithdrawalReducer(initialState, { type, payload })).toEqual({
			...initialState,
			loading: false,
			cryptoWithdrawal: { ...payload },
		});
	});
	// handle similar failed operation
	it.each([
		{ type: types.FETCH_WITHDRAWAL_CRYPTO_HISTORY.FAILURE, payload: "error" },
		{
			type: types.FETCH_CRYPTO_WITHDRAWAL_TRANSACTION_FEE.FAILURE,
			payload: "error",
		},
		{ type: types.POST_CRYPTO_WITHDRAWAL.FAILURE, payload: "error" },
	])("should handle $type", ({ type, payload }) => {
		expect(WithdrawalReducer(initialState, { type, payload })).toEqual({
			...initialState,
			loading: false,
			error: payload,
		});
	});
});
