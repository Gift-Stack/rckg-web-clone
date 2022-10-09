import { USER_DEVICE } from "./../types/analytics.types";
import * as types from "../types";

const initialState = {
	loading: false,
	userIpAddress: null,
	error: null,
};

const analyticsReducer = (state = initialState, { type, payload }: any) => {
	switch (type) {
		case types.USER_IP.REQUEST:
			return { ...state, loading: true };
		case types.USER_IP.SUCCESS:
			return { ...state, loading: false, userIpAddress: payload };
		case types.USER_IP.FAILURE:
			return { ...state, loading: false, error: payload };
		case types.USER_DEVICE.SUCCESS:
			return { ...state, loading: false, userDevice: payload };
		case types.USER_GEO_DATA.SUCCESS:
			return { ...state, loading: false, userGeoData: payload };
		default:
			return state;
	}
};

export default analyticsReducer;
