import * as types from "../types";

const initialState = {
	loading: false,
	error: null,
};

const CCPaymentReducer = (state = initialState, { type, payload }: any) => {
	switch (type) {
		case types.MAKE_PAYMENT.REQUEST:
			return { ...state, loading: true };
		case types.MAKE_PAYMENT.SUCCESS:
			return { ...state, loading: false };
		case types.MAKE_PAYMENT.FAILURE:
			return { ...state, loading: false, error: payload };
		case types.PAYMENT_DETAILS:
			return { ...state, paymentDetails: payload };
		default:
			return state;
	}
};

export default CCPaymentReducer;
