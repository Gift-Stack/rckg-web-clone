import * as types from "../types";
import { UserData } from "../../services/identityService";

const userData: UserData = {
	id: "",
	isActive: false,
	createdOn: "",
	createdBy: "",
	updatedOn: "",
	updatedBy: "",
	deletedOn: "",
	deletedBy: "",
	email: "",
	phone: "",
	otpConfirmationStatus: false,
	isEmailVerify: false,
	isPhoneVerify: false,
	emailOtpStatus: false,
	phoneOtpStatus: false,
	role: null,
};

const initialState = {
	loading: false,
	error: null,
	emailConfirmationOtpExpiringTime: "",
	phoneConfirmationOtpExpiringTime: "",
	redirectAfterLoginUri: "",
	signupPassword: false,
	signinPassword: false,
	resetPassword: false,
	confirmResetPassword: false,
	new_password: false,
	old_password: false,
	...userData,
};

export type ActionResponse = {
	type: string;
	payload: any;
};

const AuthReducer = (
	state: { [key: string]: any } = initialState,
	{ type, payload }: ActionResponse
) => {
	switch (type) {
		case types.SIGNUP.REQUEST:
		case types.LOGIN.REQUEST:
		case types.LOGOUT.REQUEST:
		case types.RESET_PASSWORD.REQUEST:
		case types.FORGOT_PASSWORD.REQUEST:
		case types.RESEND_OTP.REQUEST:
		case types.VERIFY_ACCOUNT.REQUEST:
		case types.AUTHENTICATED.REQUEST:
		case types.CHANGE_PASSWORD.REQUEST:
		case types.CONFIRM_CHANGE_PASSWORD.REQUEST:
		case types.SEND_PHONE_VERIFICATION_OTP.REQUEST:
		case types.VERIFY_PHONE_NUMBER.REQUEST:
		case types.VERIFY_LOGIN.REQUEST:
			return { ...state, loading: true };

		case types.SIGNUP.SUCCESS:
		case types.LOGIN.SUCCESS:
		case types.LOGOUT.SUCCESS:
		case types.RESET_PASSWORD.SUCCESS:
		case types.FORGOT_PASSWORD.SUCCESS:
		case types.RESEND_OTP.SUCCESS:
		case types.VERIFY_ACCOUNT.SUCCESS:
		case types.AUTHENTICATED.SUCCESS:
		case types.CHANGE_PASSWORD.SUCCESS:
		case types.CONFIRM_CHANGE_PASSWORD.SUCCESS:
		case types.SEND_PHONE_VERIFICATION_OTP.SUCCESS:
		case types.VERIFY_PHONE_NUMBER.SUCCESS:
		case types.VERIFY_LOGIN.SUCCESS:
		case types.VERIFY_LOGIN.SUCCESS:
			return { ...state, loading: false, ...payload };

		case types.SIGNUP.FAILURE:
		case types.LOGIN.FAILURE:
		case types.LOGOUT.FAILURE:
		case types.RESET_PASSWORD.FAILURE:
		case types.FORGOT_PASSWORD.FAILURE:
		case types.RESEND_OTP.FAILURE:
		case types.VERIFY_ACCOUNT.FAILURE:
		case types.AUTHENTICATED.FAILURE:
		case types.CONFIRM_CHANGE_PASSWORD.FAILURE:
		case types.CHANGE_PASSWORD.FAILURE:
		case types.SEND_PHONE_VERIFICATION_OTP.FAILURE:
		case types.VERIFY_PHONE_NUMBER.FAILURE:
		case types.VERIFY_LOGIN.FAILURE:
			return { ...state, loading: false, error: payload };
		case types.TOGGLE_PASSWORD_INPUT:
			return { ...state, [payload]: !state[payload] };

		case types.SET_AUTH_DATA:
			return { ...state, ...payload };
		case types.REDIRECT_AFTER_LOGIN:
			return { ...state, ...payload };
		default:
			return state;
	}
};

export default AuthReducer;
