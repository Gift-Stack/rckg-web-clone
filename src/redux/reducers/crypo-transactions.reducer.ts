import * as types from "../types";

const initialState = {
	loading: false,
	error: null,
};

const CryptoTransactionsReducer = (
	state = initialState,
	{ type, payload }: any
) => {
	switch (type) {
		case types.TRANSFER_CRYPTO.REQUEST:
			return { ...state, loading: true };
		case types.TRANSFER_CRYPTO.SUCCESS:
			return { ...state, loading: false, transferCrypto: payload };
		case types.TRANSFER_CRYPTO.FAILURE:
			return { ...state, loading: false, error: payload };
		case types.CRYPTO_TO_TRANSFER:
			return {
				...state,
				cryptoToTransfer: payload,
			};
		default:
			return state;
	}
};

export default CryptoTransactionsReducer;
