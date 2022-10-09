import * as types from "../types";

const initialState = false;

const SuspenseReducer = (state = initialState, { type, payload }: any) => {
	switch (type) {
		case types.SUSPEND:
			return payload;
		default:
			return state;
	}
};

export default SuspenseReducer;
