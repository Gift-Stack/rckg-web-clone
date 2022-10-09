import * as types from "../types";
import {identityService, storageService} from "../../services/";
import {Dispatch} from "redux";
import {capitalize, showToast} from "../../utils";
import {
    RESEND_LOGIN_OTP,
    RESEND_OTP,
    SEND_PHONE_VERIFICATION_OTP,
    SET_AUTH_DATA,
    VERIFY_ACCOUNT,
    VERIFY_LOGIN,
    VERIFY_PHONE_NUMBER
} from "../types";
import {HttpError} from "../../services/baseHTTPService";
import {
    ChangePasswordProps, ConfirmChangePasswordProps,
    ForgotPasswordProps,
    LoginDataProps,
    RegisterProps,
    ResendOtpProps, ResetPasswordData, SendPhoneVerificationOtpProps, UserData,
    VerifyAccountProps, VerifyLoginDataProps, VerifyPhoneNumberProps
} from "../../services/identityService";


export const Base = "auth";

export const loginAsync = (loginData: LoginDataProps, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.LOGIN.REQUEST})
        try {
            const {data: responseData} = await identityService.login(loginData);
            showToast("Login Successful", "info");
            dispatch({type: types.LOGIN.SUCCESS, payload: {...responseData}});
            successCallback?.({identifier: loginData.identifier, ...responseData});
        } catch (err: any) {
            dispatch({type: types.SIGNUP.FAILURE, payload: err});
            if (err.statusCode == 400 && err.data.errorCode == "RG0002") {
                errorCallback?.()
            }
            showErrorMessage(err)
        }
    }
}

export const setAuthData = (data: UserData) => {
    return {
        type: types.SET_AUTH_DATA,
        payload: data
    }
}

export const redirectAfterLogin = (uri?:string) => {
    return {
        type: types.REDIRECT_AFTER_LOGIN,
        payload: {redirectAfterLoginUri: uri ?? ""}
    }
}


export const registerAsync = (data: RegisterProps, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.SIGNUP.REQUEST});
        try {
            const {data: {data: registerData}, status} = await identityService.register(data)
            dispatch({type: types.SIGNUP.SUCCESS, payload: registerData})
            if (status && status !== 201) return;
            successCallback?.(registerData);
        } catch (err) {
            dispatch({type: types.SIGNUP.FAILURE, payload: err});
            showErrorMessage(err)
            errorCallback?.();
        }
    }
}


export const resendOtpAsync = (data: ResendOtpProps, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.RESEND_OTP.REQUEST});
        try {
            const {data: {data: resendOtpResponse}, status} = await identityService.resendOtp(data)
            dispatch({
                type: types.RESEND_OTP.SUCCESS,
                payload: {emailConfirmationOtpExpiringTime: resendOtpResponse.emailConfirmationOtpExpiringTime}
            })
        } catch (err) {
            dispatch({type: types.RESEND_OTP.FAILURE, payload: err})
            showErrorMessage(err)
            errorCallback?.()

        }
    }
}

export const resendLoginOtpAsync = (data: ResendOtpProps, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.RESEND_LOGIN_OTP.REQUEST});
        try {

            const {data: responseData, status} = await identityService.resendLoginOtp(data)
            showToast(responseData.message, "info");
            dispatch({type: types.RESEND_LOGIN_OTP.SUCCESS, payload: {...responseData}})
        } catch (err) {
            dispatch({type: types.RESEND_LOGIN_OTP.FAILURE, payload: err})
            showErrorMessage(err)
            errorCallback?.()
        }
    }
}

export const verifyAccountAsync = (data: VerifyAccountProps, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: VERIFY_ACCOUNT.REQUEST})
        try {
            const {data: response} = await identityService.verifyAccount(data)
            storageService.remove("emailConfirmationOtpExpiringTime")
            dispatch({type: types.VERIFY_ACCOUNT.SUCCESS, payload: response})
            showToast("Otp Verification Successful", "success")
            successCallback?.()
        } catch (err) {
            dispatch({type: types.VERIFY_ACCOUNT.FAILURE, payload: err})
            showErrorMessage(err)
            errorCallback?.()
        }
    }
}

export const resetPasswordAsync = (data: ResetPasswordData, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.RESET_PASSWORD.REQUEST});
        try {
            const {data: response} = await identityService.resetPassword(data)
            dispatch({type: types.RESET_PASSWORD.SUCCESS, payload: response})
            showToast("Password reset successfully", "success");
            successCallback?.()
        } catch (err) {
            dispatch({type: types.RESET_PASSWORD.FAILURE, payload: err})
            showErrorMessage(err)
            errorCallback?.()
        }
    }
}


export const forgotPasswordAsync = (data: ForgotPasswordProps, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.FORGOT_PASSWORD.REQUEST});
        try {
            const {data: responseData} = await identityService.forgotPassword(data)
            dispatch({type: types.FORGOT_PASSWORD.SUCCESS, payload: responseData})
            successCallback?.()
        } catch (err) {
            dispatch({type: types.FORGOT_PASSWORD.FAILURE})
            showErrorMessage(err)
            errorCallback?.()

        }
    }
}

export const changePasswordAsync = (data: ChangePasswordProps, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.CHANGE_PASSWORD.REQUEST})
        try {
            const {data: {data: changePasswordResponse}} = await identityService.changePassword(data)
            dispatch({type: types.CHANGE_PASSWORD.SUCCESS, payload: changePasswordResponse})
            successCallback?.();
        } catch (err) {
            dispatch({type: types.CHANGE_PASSWORD.FAILURE})
            showErrorMessage(err)
            errorCallback?.()
        }
    }
}

export const confirmChangePassword = (data: ConfirmChangePasswordProps, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.CONFIRM_CHANGE_PASSWORD.REQUEST})
        try {
            const {data: {data: confirmChangePasswordResponse}} = await identityService.confirmChangePassword(data)
            dispatch({type: types.CONFIRM_CHANGE_PASSWORD.SUCCESS, payload: confirmChangePasswordResponse})
            storageService.clearAuthData()
            showToast(confirmChangePasswordResponse.message, "success")
            successCallback?.()
        } catch (err) {
            dispatch({type: types.CONFIRM_CHANGE_PASSWORD.FAILURE})
            showErrorMessage(err)
            errorCallback?.()
        }

    }
}

export const logout = (successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.LOGOUT.REQUEST})
        try {
            dispatch({type: types.LOGOUT.SUCCESS, payload: []})
            identityService.logout()
            showToast("Logout Successfully", "success")
            successCallback?.()
        } catch (err) {
            dispatch({type: types.LOGOUT.FAILURE})
            showErrorMessage(err)
            errorCallback?.()
        }

    }
}

export const sendPhoneVerificationOtpAsync = (data: SendPhoneVerificationOtpProps, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.SEND_PHONE_VERIFICATION_OTP.REQUEST})
        try {
            const {data: response} = await identityService.sendPhoneVerificationOtp(data)
            dispatch({type: types.SEND_PHONE_VERIFICATION_OTP.SUCCESS, payload: response})
            successCallback?.()
            showToast("Otp Sent Successfully", "success")
        } catch (e) {
            dispatch({type: types.SEND_PHONE_VERIFICATION_OTP.FAILURE, payload: e})
            errorCallback?.()
            showErrorMessage(e)
        }
    }
}

export const verifyPhoneNumberAsync = (data: VerifyPhoneNumberProps, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.VERIFY_PHONE_NUMBER.REQUEST})
        try {
            const {data: {data: response}} = await identityService.verifyPhoneNumber(data);
            dispatch({type: types.VERIFY_PHONE_NUMBER.SUCCESS})
            showToast("Phone number verification successful", "success")
            successCallback?.()
        } catch (e) {
            dispatch({type: types.VERIFY_PHONE_NUMBER.FAILURE, payload: e})
            errorCallback?.()
            showErrorMessage(e)
        }
    }
}

export const verifyLoginAsync = (verifyLoginData: VerifyLoginDataProps, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: VERIFY_LOGIN.REQUEST})
        try {
            const data: any = await identityService.verifyLogin(verifyLoginData);
            dispatch({type: types.VERIFY_LOGIN.SUCCESS, payload: {...data.responseData}})
            showToast("Otp Verification Successful", "success")
            successCallback?.()
        } catch (e) {
            dispatch({type: types.VERIFY_LOGIN.FAILURE, payload: e})
            errorCallback?.()
            showErrorMessage(e)
        }
    }
}
export const togglePasswordInput = (data: string) => {
    return {
        type: types.TOGGLE_PASSWORD_INPUT,
        payload: data
    }
}


export const showErrorMessage = (err: HttpError | any) => {
    // console.error(err, err.getData())
    const message = parseErrorMessage(err.getData? err.getData(): null)
    return showToast(capitalize(message), "error");
}

function parseErrorMessage(data?: { [key: string]: any }): string {
    if (typeof data?.message === "string" && data?.message !== "") {
        return data.message
    } else if (data?.message instanceof Array && data.message.length > 0) {
        return data?.message[0]
    } else if (typeof data?.error === "string" && data?.error !== "") {
        return data.error
    } else if (data?.error instanceof Array) {
        return data?.error[0] || "An error occurred, contact the webmasters";
    } else {
        return "An error occurred, contact the webmasters"
    }
}

