import * as types from "../types";
import {Dispatch} from "redux";
import {withdrawalService} from "../../services";
import {showErrorMessage} from "./auth.action";
import {crytoWithdrawalDataProps, IHistoryTable} from "../../services/withdrawalService";
import {showToast} from "../../utils";

export const fetchCryptoWithdrawalHistoryAsync = (data: IHistoryTable, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.FETCH_WITHDRAWAL_CRYPTO_HISTORY.REQUEST});
        try {
            const {data: {data: responseData}} = await withdrawalService.fetchCryptoWithdrawalHistory(data)
            dispatch({type: types.FETCH_WITHDRAWAL_CRYPTO_HISTORY.SUCCESS, payload: responseData});
            successCallback?.(responseData)
        } catch (e) {
            showErrorMessage(e)
            dispatch({type: types.FETCH_WITHDRAWAL_CRYPTO_HISTORY.FAILURE});
            errorCallback?.(e)
        }
    }
};


export const fetchCryptoWithdrawalFeeAsync = (data: crytoWithdrawalDataProps, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.FETCH_CRYPTO_WITHDRAWAL_TRANSACTION_FEE.REQUEST});
        try {
            const {data: responseData} = await withdrawalService.fetchCryptoWithdrawalFee(data);
            dispatch({type: types.FETCH_CRYPTO_WITHDRAWAL_TRANSACTION_FEE.SUCCESS, payload: responseData});
            successCallback?.(responseData)
        } catch (e) {
            dispatch({type: types.FETCH_CRYPTO_WITHDRAWAL_TRANSACTION_FEE.FAILURE});
            errorCallback?.(e)
            showErrorMessage(e)
        }
    }
}

export const fetchWithdrawalOTPAsync = (data: any, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.FETCH_CRYPTO_WITHDRAWAL_OTP.REQUEST})
        try {
            const {data:responseData} = await withdrawalService.fetchWithdrawalOTP(data)
            dispatch({type: types.FETCH_CRYPTO_WITHDRAWAL_OTP.SUCCESS, payload: responseData})
            successCallback?.(responseData)
        } catch (e) {
            dispatch({type: types.FETCH_CRYPTO_WITHDRAWAL_OTP.FAILURE});
            errorCallback?.(e)
            showErrorMessage(e)
        }
    }
}


export const postCryptoWithdrawalAsync = (data: crytoWithdrawalDataProps, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.POST_CRYPTO_WITHDRAWAL.REQUEST});
        try {
            const {data: {data: responseData}} = await withdrawalService.postCryptoWithdrawal(data);
            dispatch({type: types.POST_CRYPTO_WITHDRAWAL.SUCCESS, payload: responseData});
            successCallback?.(responseData)
            showToast("Withdrawal order submitted", "success")
        } catch (e) {
            dispatch({type: types.POST_CRYPTO_WITHDRAWAL.FAILURE});
            errorCallback?.()
            showErrorMessage(e)
        }
    }
}