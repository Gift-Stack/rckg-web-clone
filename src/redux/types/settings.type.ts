import { generateActions } from "../../utils";

export const GET_ALL_SETTINGS = generateActions("GET_ALL_SETTINGS");
export const GET_ALL_LOGIN_ACTIVITIES = generateActions(
	"GET_ALL_LOGIN_ACTIVITIES"
);

export const TOGGLE_EMAIL_AUTH = generateActions("TOGGLE_EMAIL_AUTH");
export const TOGGLE_SMS_AUTH = generateActions("TOGGLE_SMS_AUTH");

export const GET_KYC_STAGES = generateActions("GET_KYC_STAGES");

export const CREATE_KYC_STAGE = generateActions("CREATE_KYC_STAGE");

export const DOCUMENT_INIT = generateActions("DOCUMENT_INIT");
