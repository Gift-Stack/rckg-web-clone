import { IVariousAssetsBalance } from "components/crypto/model";
import { IDepositHistory } from "components/table/TransactionTable/model";
import * as types from "../types";
import { ActionResponse } from "./auth.reducer";

export interface AllCoin {
	coin: string;
	name: string;
	networkList: string[];
}

export interface ICryptoSwapFeeData {
	minRequiredBalance: number;
	price: string;
	slippage: string;
	baseQty: string;
}

export interface TransactionsState {
	loading: boolean;
	error: null | any;
	allCoins: AllCoin[];
	allCoinPairs: any;
	allNetworks: any[];
	depositAddress: null | string;
	recentDeposit: any[];
	depositHistory: null | IDepositHistory;
	variousAssetsBalance: IVariousAssetsBalance[];
	swapList: string[][];
	cyptoSwapFee: null | ICryptoSwapFeeData;
	cryptoSwap: any;
	history: Nullable<any>;
	withdrawalTransactionHistory: Nullable<any>;
	depositTransactionHistory: Nullable<any>;
	cryptoSwapHistory: Nullable<any>;
}

export const initialState: TransactionsState = {
	loading: false,
	error: null,
	allCoins: [],
	allCoinPairs: [],
	allNetworks: [],
	depositAddress: null,
	recentDeposit: [],
	depositHistory: null,
	variousAssetsBalance: [],
	swapList: [],
	cyptoSwapFee: null,
	cryptoSwap: null,
	history: [],
	depositTransactionHistory: [],
	withdrawalTransactionHistory: [],
	cryptoSwapHistory: [],
};

const TransactionsReducer = (
	state: { [key: string]: any } = initialState,
	{ type, payload }: ActionResponse
) => {
	switch (type) {
		case types.GET_COINS.REQUEST:
		case types.GET_COIN_PAIRS.REQUEST:
		case types.GET_NETWORKS.REQUEST:
		case types.DEPOSIT_ADDRESS.REQUEST:
		case types.RECENT_DEPOSIT.REQUEST:
		case types.DEPOSIT_HISTORY.REQUEST:
		case types.VARIOUS_ASSETS_BALANCE.REQUEST:
		case types.SWAP_LIST.REQUEST:
		case types.GET_CRYPTO_SWAP_FEE.REQUEST:
		case types.SWAP_CRYPTO.REQUEST:
		case types.GET_DEPOSIT_WITHDRAWAL_TRANSACTION_HISTORY.REQUEST:
		case types.GET_DEPOSIT_TRANSACTION_HISTORY.REQUEST:
		case types.GET_WITHDRAWAL_TRANSACTION_HISTORY.REQUEST:
		case types.CRYPTO_SWAP_HISTORY.REQUEST:
			return { ...state, loading: true };

		case types.GET_COINS.SUCCESS:
			return { ...state, loading: false, allCoins: payload };
		case types.GET_COIN_PAIRS.SUCCESS:
			return { ...state, loading: false, allCoinPairs: payload };
		case types.GET_NETWORKS.SUCCESS:
			return { ...state, loading: false, allNetworks: payload?.networkList };
		case types.DEPOSIT_ADDRESS.SUCCESS:
			return { ...state, loading: false, depositAddress: payload };
		case types.RECENT_DEPOSIT.SUCCESS:
			return { ...state, loading: false, recentDeposit: payload };
		case types.DEPOSIT_HISTORY.SUCCESS:
			return { ...state, loading: false, depositHistory: payload };
		case types.VARIOUS_ASSETS_BALANCE.SUCCESS:
			return { ...state, loading: false, variousAssetsBalance: payload };
		case types.SWAP_LIST.SUCCESS:
			return { ...state, loading: false, swapList: payload };
		case types.GET_CRYPTO_SWAP_FEE.SUCCESS:
			return { ...state, loading: false, cyptoSwapFee: payload };
		case types.SWAP_CRYPTO.SUCCESS:
			return { ...state, loading: false, cryptoSwap: payload };
		case types.GET_DEPOSIT_WITHDRAWAL_TRANSACTION_HISTORY.SUCCESS:
			return { ...state, loading: false, history: payload };
		case types.GET_DEPOSIT_TRANSACTION_HISTORY.SUCCESS:
			return { ...state, loading: false, depositTransactionHistory: payload };
		case types.GET_WITHDRAWAL_TRANSACTION_HISTORY.SUCCESS:
			return {
				...state,
				loading: false,
				withdrawalTransactionHistory: payload,
			};
		case types.CRYPTO_SWAP_HISTORY.SUCCESS:
			return { ...state, loading: false, cryptoSwapHistory: payload };

		case types.GET_COINS.FAILURE:
		case types.GET_COIN_PAIRS.FAILURE:
		case types.GET_NETWORKS.FAILURE:
		case types.DEPOSIT_ADDRESS.FAILURE:
		case types.RECENT_DEPOSIT.FAILURE:
		case types.DEPOSIT_HISTORY.FAILURE:
		case types.VARIOUS_ASSETS_BALANCE.FAILURE:
		case types.SWAP_LIST.FAILURE:
		case types.GET_CRYPTO_SWAP_FEE.FAILURE:
		case types.SWAP_CRYPTO.FAILURE:
		case types.GET_DEPOSIT_WITHDRAWAL_TRANSACTION_HISTORY.FAILURE:
		case types.GET_DEPOSIT_TRANSACTION_HISTORY.FAILURE:
		case types.GET_WITHDRAWAL_TRANSACTION_HISTORY.FAILURE:
		case types.CRYPTO_SWAP_HISTORY.FAILURE:
			return { ...state, loading: false, error: payload };

		default:
			return state;
	}
};

export default TransactionsReducer;
