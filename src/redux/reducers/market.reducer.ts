import * as types from "../types";

const initialState = {
	loading: false,
	data: [],
};

export type ActionResponse = {
	type: string;
	payload: any;
};

const MarketReducer = (
	state: { [key: string]: any } = initialState,
	{ type, payload }: ActionResponse
) => {
	switch (type) {
		case types.GETMARKETDATA.REQUEST:
			return { ...state, loading: true };

		case types.GETMARKETDATA.SUCCESS:
			return { ...state, loading: false, ...payload };

		case types.GETMARKETDATA.FAILURE:
			return { ...state, loading: false, error: payload };
		default:
			return state;
	}
};

export default MarketReducer;
