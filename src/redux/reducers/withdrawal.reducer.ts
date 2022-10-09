import { ActionResponse } from "./auth.reducer";
import * as types from "../types";

export interface WithdrawalStateProps {
	loading: boolean;
	error: null | any;
	history: Nullable<any>;
	cryptoWithdrawal: Nullable<any>;
}

export const initialState = {
	loading: false,
	error: null,
	history: {},
	cryptoWithdrawal: {},
};

const WithdrawalReducer = (
	state: { [key: string]: any } = initialState,
	{ type, payload }: ActionResponse
) => {
	switch (type) {
		case types.FETCH_WITHDRAWAL_CRYPTO_HISTORY.REQUEST:
		case types.FETCH_CRYPTO_WITHDRAWAL_TRANSACTION_FEE.REQUEST:
		case types.POST_CRYPTO_WITHDRAWAL.REQUEST:
			return { ...state, loading: true };
		case types.FETCH_WITHDRAWAL_CRYPTO_HISTORY.SUCCESS:
			return { ...state, loading: false, history: payload };
		case types.FETCH_CRYPTO_WITHDRAWAL_TRANSACTION_FEE.SUCCESS:
		case types.POST_CRYPTO_WITHDRAWAL.SUCCESS:
			return { ...state, loading: false, cryptoWithdrawal: { ...payload } };
		case types.FETCH_WITHDRAWAL_CRYPTO_HISTORY.FAILURE:
		case types.FETCH_CRYPTO_WITHDRAWAL_TRANSACTION_FEE.FAILURE:
		case types.POST_CRYPTO_WITHDRAWAL.FAILURE:
			return { ...state, loading: false, error: payload };
		default:
			return state;
	}
};

export default WithdrawalReducer;
