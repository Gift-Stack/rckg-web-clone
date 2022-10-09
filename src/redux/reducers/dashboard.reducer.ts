import * as types from "../types";

const initialState = {
	loading: false,
	error: null,
	showTotalBalance: true,
};

const DashboardReducer = (state = initialState, { type, payload }: any) => {
	switch (type) {
		case types.BALANCE_DETAILS.REQUEST:
		case types.UPDATES_ANNOUNCEMENTS.REQUEST:
		case types.LOGIN_TRACKER.REQUEST:
		case types.TRANSACTION_HISTORY.REQUEST:
		case types.SECURITY_SETTINGS.REQUEST:
		case types.APP_DOWNLOAD.REQUEST:
			return { ...state, loading: true };
		case types.BALANCE_DETAILS.SUCCESS:
			return { ...state, loading: false, balanceDetails: payload };
		case types.UPDATES_ANNOUNCEMENTS.SUCCESS:
			return { ...state, loading: false, updatesAndAnnouncements: payload };
		case types.LOGIN_TRACKER.SUCCESS:
			return { ...state, loading: false, loginTracker: payload };
		case types.TRANSACTION_HISTORY.SUCCESS:
			return { ...state, loading: false, transactionHistory: payload };
		case types.SECURITY_SETTINGS.SUCCESS:
			return { ...state, loading: false, securitySettings: payload };
		case types.APP_DOWNLOAD.SUCCESS:
			return { ...state, loading: false, appDownload: payload };
		case types.BALANCE_DETAILS.FAILURE:
		case types.UPDATES_ANNOUNCEMENTS.FAILURE:
		case types.LOGIN_TRACKER.FAILURE:
		case types.TRANSACTION_HISTORY.FAILURE:
		case types.SECURITY_SETTINGS.FAILURE:
		case types.APP_DOWNLOAD.FAILURE:
			return { ...state, loading: false, error: payload };
		case types.TOGGLE_TOTAL_BALANCE:
			return { ...state, showTotalBalance: !state.showTotalBalance };
		default:
			return state;
	}
};

export default DashboardReducer;
