import * as types from "../types";
import { ActionResponse } from "./auth.reducer";

export interface KYCStageProps {
	id: string;
	isActive: boolean;
	createdOn: Date;
	createdBy: Date | null;
	updatedOn: Date | null;
	updatedBy: Date | null;
	deletedOn: Date | null;
	deletedBy: string | null;
	stageName: string;
	slug: string;
	prerequisiteStage: string | null;
}

export interface SettingsState {
	loading: boolean;
	error: null | any;
	phoneAuthentication: boolean;
	emailAuthentication: boolean;
	loginActivities: any[];
	KYCStages: KYCStageProps[];
	documentToken: Nullable<string>;
	token: boolean;
}

export const initialState: SettingsState = {
	loading: false,
	error: null,
	phoneAuthentication: false,
	emailAuthentication: false,
	loginActivities: [],
	KYCStages: [],
	documentToken: "",
	token: false,
};

const SettingsReducer = (
	state: { [key: string]: any } = initialState,
	{ type, payload }: ActionResponse
) => {
	switch (type) {
		case types.GET_ALL_SETTINGS.REQUEST:
		case types.TOGGLE_SMS_AUTH.REQUEST:
		case types.TOGGLE_EMAIL_AUTH.REQUEST:
		case types.GET_ALL_LOGIN_ACTIVITIES.REQUEST:
		case types.GET_KYC_STAGES.REQUEST:
		case types.DOCUMENT_INIT.REQUEST:
			return { ...state, loading: true };

		case types.GET_ALL_SETTINGS.SUCCESS:
		case types.TOGGLE_EMAIL_AUTH.SUCCESS:
		case types.TOGGLE_SMS_AUTH.SUCCESS:
		case types.GET_KYC_STAGES.SUCCESS:
		case types.DOCUMENT_INIT.SUCCESS:
			return { ...state, loading: false, ...payload };
		case types.GET_ALL_LOGIN_ACTIVITIES.SUCCESS:
			return { ...state, loading: false, loginActivities: payload };
		case types.GET_ALL_SETTINGS.FAILURE:
		case types.TOGGLE_SMS_AUTH.FAILURE:
		case types.TOGGLE_EMAIL_AUTH.FAILURE:
		case types.GET_ALL_LOGIN_ACTIVITIES.FAILURE:
		case types.GET_KYC_STAGES.FAILURE:
		case types.DOCUMENT_INIT.FAILURE:
			return { ...state, loading: false, error: payload };

		default:
			return state;
	}
};

export default SettingsReducer;
