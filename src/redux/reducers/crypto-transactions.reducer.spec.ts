import CryptoTransactionsReducer from "./crypo-transactions.reducer";
import * as types from "../types";
describe("Crypto Transactions", () => {
	const initialState = {
		loading: false,
		error: null,
	};

	it("should return initial state correctly", () => {
		expect(CryptoTransactionsReducer(undefined, {})).toEqual(initialState);
	});

	it("should handle TRANSFER_CRYPTO.REQUEST", () => {
		expect(
			CryptoTransactionsReducer(initialState, {
				type: types.TRANSFER_CRYPTO.REQUEST,
			})
		).toEqual({
			...initialState,
			loading: true,
		});
	});

	it("should handle TRANSFER_CRYPTO.SUCCESS", () => {
		expect(
			CryptoTransactionsReducer(initialState, {
				type: types.TRANSFER_CRYPTO.SUCCESS,
				payload: {},
			})
		).toEqual({
			...initialState,
			transferCrypto: {},
		});
	});

	it("should handle TRANSFER_CRYPTO.FAILURE", () => {
		expect(
			CryptoTransactionsReducer(initialState, {
				type: types.TRANSFER_CRYPTO.FAILURE,
				payload: "failed operation",
			})
		).toEqual({
			...initialState,
			error: "failed operation",
		});
	});

	it("should handle CRYPTO_TO_TRANSFER", () => {
		expect(
			CryptoTransactionsReducer(initialState, {
				type: types.CRYPTO_TO_TRANSFER,
				payload: {},
			})
		).toEqual({
			...initialState,
			cryptoToTransfer: {},
		});
	});
});
