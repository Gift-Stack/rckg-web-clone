import { ActionResponse } from "./auth.reducer";
import * as types from "../types";

export interface WalletStateProps {
	loading: boolean;
	error: null | any;
	assets: Nullable<any>;
	assetsBalnceInBTC: Nullable<any>;
	rateBTCUSDT: Nullable<any>;
}

export const initialState = {
	loading: false,
	error: null,
	assets: [],
	assetsBalnceInBTC: [],
	rateBTCUSDT: [],
};

const WalletReducer = (
	state: { [key: string]: any } = initialState,
	{ type, payload }: ActionResponse
) => {
	switch (type) {
		case types.FETCH_WALLET_ASSETS_BALANCE.REQUEST:
		case types.ASSETS_BALANCE_BTC.REQUEST:
		case types.BTCUSDTRATE.REQUEST:
			return { ...state, loading: true };
		case types.FETCH_WALLET_ASSETS_BALANCE.SUCCESS:
			return { ...state, loading: false, assets: payload };
		case types.ASSETS_BALANCE_BTC.SUCCESS:
			return { ...state, loading: false, assetsBalnceInBTC: payload };
		case types.BTCUSDTRATE.SUCCESS:
			return { ...state, loading: false, rateBTCUSDT: payload };
		case types.FETCH_WALLET_ASSETS_BALANCE.FAILURE:
		case types.ASSETS_BALANCE_BTC.FAILURE:
		case types.BTCUSDTRATE.FAILURE:
			return { ...state, loading: false, error: payload };
		default:
			return state;
	}
};

export default WalletReducer;
