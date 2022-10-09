import * as types from "../types";

const initialState = {
	loading: false,
	error: null,
	spot: {
		baseCoin: null,
		quoteCoin: null,
		price: null,
	},
};

const tradeReducer = (state = initialState, { type, payload }: any) => {
	switch (type) {
		case types.SPOT_TRADING_DETAILS:
			return {
				...state,
				spot: {
					...state.spot,
					...payload,
				},
			};

		case types.SPOT_TRADE_HISTORY.SUCCESS:
		case types.SPOT_OPEN_ORDERS.SUCCESS:
			return {
				...state,
				loading: false,
				...payload,
			};

		case types.SPOT_TRADING_DETAILS_PRICE:
			return {
				...state,
				spot: {
					...state.spot,
					price: payload,
				},
			};

		default:
			return state;
	}
};

export default tradeReducer;
