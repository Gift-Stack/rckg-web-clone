import * as types from "../types";

const initialState = {
	loading: false,
	countries: [],
	error: null,
};

const PublicReducer = (state = initialState, { type, payload }: any) => {
	switch (type) {
		case types.COUNTRIES.REQUEST:
			return { ...state, loading: true };
		case types.COUNTRIES.SUCCESS:
			return { ...state, loading: false, countries: payload };
		case types.COUNTRIES.FAILURE:
			return { ...state, loading: false, error: payload };
		default:
			return state;
	}
};

export default PublicReducer;
