import { expect } from "@jest/globals";
import AuthReducer from "./auth.reducer";
import * as types from "../types";
import { SET_AUTH_DATA, TOGGLE_PASSWORD_INPUT } from "../types";
describe("Auth Reducer", () => {
	const user = {
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
		redirectAfterLoginUri: "",
		role: null,
	};
	const initialState = {
		loading: false,
		error: null,
		emailConfirmationOtpExpiringTime: "",
		phoneConfirmationOtpExpiringTime: "",
		signupPassword: false,
		signinPassword: false,
		resetPassword: false,
		confirmResetPassword: false,
		new_password: false,
		old_password: false,
		...user,
	};
	it("should return initial state", () => {
		expect(AuthReducer(undefined, { type: "", payload: "" })).toEqual(
			initialState
		);
	});
	test.each([
		{
			type: types.SIGNUP.REQUEST,
			expected: { ...initialState, loading: true },
		},
		{
			type: types.LOGIN.REQUEST,
			expected: { ...initialState, loading: true },
		},
		{
			type: types.LOGOUT.REQUEST,
			expected: { ...initialState, loading: true },
		},
		{
			type: types.RESET_PASSWORD.REQUEST,
			expected: { ...initialState, loading: true },
		},
		{
			type: types.FORGOT_PASSWORD.REQUEST,
			expected: { ...initialState, loading: true },
		},
		{
			type: types.RESEND_OTP.REQUEST,
			expected: { ...initialState, loading: true },
		},
		{
			type: types.VERIFY_ACCOUNT.REQUEST,
			expected: { ...initialState, loading: true },
		},
		{
			type: types.AUTHENTICATED.REQUEST,
			expected: { ...initialState, loading: true },
		},
		{
			type: types.CHANGE_PASSWORD.REQUEST,
			expected: { ...initialState, loading: true },
		},
		{
			type: types.CONFIRM_CHANGE_PASSWORD.REQUEST,
			expected: { ...initialState, loading: true },
		},
		{
			type: types.SEND_PHONE_VERIFICATION_OTP.REQUEST,
			expected: { ...initialState, loading: true },
		},
		{
			type: types.VERIFY_PHONE_NUMBER.REQUEST,
			expected: { ...initialState, loading: true },
		},
		{
			type: types.VERIFY_LOGIN.REQUEST,
			expected: { ...initialState, loading: true },
		},
	])(`should handle $type`, ({ type, expected }) => {
		expect(AuthReducer(initialState, { type, payload: "" })).toEqual(expected);
	});

	//test all success cases
	it.each([
		{
			type: types.SIGNUP.SUCCESS,
			payload: { res: "success" },
		},
		{
			type: types.LOGIN.SUCCESS,
			payload: { res: "success" },
		},
		{
			type: types.LOGOUT.SUCCESS,
			payload: { res: "success" },
		},
		{
			type: types.RESET_PASSWORD.SUCCESS,
			payload: { res: "success" },
		},
		{
			type: types.FORGOT_PASSWORD.SUCCESS,
			payload: { res: "success" },
		},
		{
			type: types.RESEND_OTP.SUCCESS,
			payload: { res: "success" },
		},
		{
			type: types.VERIFY_ACCOUNT.SUCCESS,
			payload: { res: "success" },
		},
		{
			type: types.AUTHENTICATED.SUCCESS,
			payload: { res: "success" },
		},
		{
			type: types.CHANGE_PASSWORD.SUCCESS,
			payload: { res: "success" },
		},
		{
			type: types.CONFIRM_CHANGE_PASSWORD.SUCCESS,
			payload: { res: "success" },
		},
		{
			type: types.SEND_PHONE_VERIFICATION_OTP.SUCCESS,
			payload: { res: "success" },
		},
		{
			type: types.VERIFY_PHONE_NUMBER.SUCCESS,
			payload: { res: "success" },
		},
		{
			type: types.VERIFY_LOGIN.SUCCESS,
			payload: { res: "success" },
		},
	])(`should handle $type`, ({ type, payload }) => {
		expect(AuthReducer(initialState, { type, payload })).toEqual({
			...initialState,
			res: "success",
		});
	});

	//handle failed cases
	it.each([
		{
			type: types.SIGNUP.FAILURE,
			payload: "error",
		},
		{
			type: types.LOGIN.FAILURE,
			payload: "error",
		},
		{
			type: types.LOGOUT.FAILURE,
			payload: "error",
		},
		{
			type: types.RESET_PASSWORD.FAILURE,
			payload: "error",
		},
		{
			type: types.FORGOT_PASSWORD.FAILURE,
			payload: "error",
		},
		{
			type: types.RESEND_OTP.FAILURE,
			payload: "error",
		},
		{
			type: types.VERIFY_ACCOUNT.FAILURE,
			payload: "error",
		},
		{
			type: types.AUTHENTICATED.FAILURE,
			payload: "error",
		},
		{
			type: types.CONFIRM_CHANGE_PASSWORD.FAILURE,
			payload: "error",
		},
		{
			type: types.CHANGE_PASSWORD.FAILURE,
			payload: "error",
		},
		{
			type: types.SEND_PHONE_VERIFICATION_OTP.FAILURE,
			payload: "error",
		},
		{
			type: types.VERIFY_PHONE_NUMBER.FAILURE,
			payload: "error",
		},
		{
			type: types.VERIFY_LOGIN.FAILURE,
			payload: "error",
		},
	])(`should handle $type`, ({ type, payload }) => {
		expect(AuthReducer(initialState, { type, payload })).toEqual({
			...initialState,
			error: "error",
		});
	});

	it("should handle TOGGLE_PASSWORD_INPUT", () => {
		expect(
			AuthReducer(initialState, {
				type: TOGGLE_PASSWORD_INPUT,
				payload: "resetPassword",
			})
		).toEqual({ ...initialState, resetPassword: true });
	});

	it("should handle SET_AUTH_DATA", () => {
		expect(
			AuthReducer(initialState, { type: SET_AUTH_DATA, payload: { res: {} } })
		).toEqual({ ...initialState, res: {} });
	});
});
