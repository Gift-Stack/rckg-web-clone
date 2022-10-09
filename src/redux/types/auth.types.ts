import { generateActions } from "../../utils";

export const SIGNUP = generateActions("SIGNUP");
export const LOGIN = generateActions("LOGIN");
export const LOGOUT = generateActions("LOGOUT");
export const RESEND_OTP = generateActions("RESEND_OTP");
export const RESEND_LOGIN_OTP = generateActions("RESEND_OTP");
export const VERIFY_ACCOUNT = generateActions("VERIFY_ACCOUNT");
export const FORGOT_PASSWORD = generateActions("FORGOT_PASSWORD");
export const RESET_PASSWORD = generateActions("RESET_PASSWORD");
export const AUTHENTICATED = generateActions("AUTHENTICATED");
export const CHANGE_PASSWORD = generateActions("CHANGE_PASSWORD");
export const CONFIRM_CHANGE_PASSWORD = generateActions(
	"CONFIRM_CHANGE_PASSWORD"
);
export const SEND_PHONE_VERIFICATION_OTP = generateActions(
	"SEND_PHONE_VERIFICATION_OTP"
);
export const VERIFY_PHONE_NUMBER = generateActions("VERIFY_PHONE_NUMBER");
export const TOGGLE_PASSWORD_INPUT = "TOGGLE_PASSWORD_INPUT";
export const VERIFY_LOGIN = generateActions("VERIFY_LOGIN");

export const SET_AUTH_DATA = "SET_AUTH_DATA";
export const REDIRECT_AFTER_LOGIN = "REDIRECT_AFTER_LOGIN";
