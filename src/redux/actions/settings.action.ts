import * as types from "../types";
import {Dispatch} from "redux";
import {coreService, identityService} from "../../services";
import {showErrorMessage} from "./auth.action";

export const getSettingsAsync = (successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.GET_ALL_SETTINGS.REQUEST});
        const {data: {data: responseData}} = await identityService.getAllSettings()
        try {
            dispatch({type: types.GET_ALL_SETTINGS.SUCCESS, payload: responseData});
            successCallback?.()
        } catch (e) {
            dispatch({type: types.GET_ALL_SETTINGS.FAILURE});
            showErrorMessage(e)
            errorCallback?.()
        }
    }
};

export const getLoginActivitiesAsync = (successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.GET_ALL_LOGIN_ACTIVITIES.REQUEST});
        try {
            const {data: {data: ResponseData}} = await identityService.getLoginActivities()
            dispatch({type: types.GET_ALL_LOGIN_ACTIVITIES.SUCCESS, payload: ResponseData});
            successCallback?.()
        } catch (e) {
            showErrorMessage(e)
            errorCallback?.()
            dispatch({type: types.GET_ALL_LOGIN_ACTIVITIES.FAILURE});
        }
    }
};


export const toggleSmsAuthAsync = (successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.TOGGLE_SMS_AUTH.REQUEST})
        const {data: {data: responseData}} = await identityService.toggleSmsAuth()
        dispatch({type: types.TOGGLE_SMS_AUTH.SUCCESS, payload: {phoneAuthentication: responseData}})
        try {
        } catch (err) {
            dispatch({type: types.TOGGLE_SMS_AUTH.FAILURE, payload: err})
            showErrorMessage(err)
        }
    }
}
export const toggleEmailAuthAsync = (successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.TOGGLE_EMAIL_AUTH.REQUEST})
        const {data: {data: responseData}} = await identityService.toggleEmailAuth()
        dispatch({type: types.TOGGLE_EMAIL_AUTH.SUCCESS, payload: {emailAuthentication: responseData}})
        successCallback?.()
        try {
        } catch (err) {
            dispatch({type: types.TOGGLE_EMAIL_AUTH.FAILURE, payload: err})
            showErrorMessage(err)
            errorCallback?.()
        }
    }
}

export const getKycStageAsync = (successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.GET_KYC_STAGES.REQUEST})
        try {
            const {data: kyc} = await coreService.getKYCStages()
            dispatch({type: types.GET_KYC_STAGES.SUCCESS, payload: {KYCStages: kyc}})
        } catch (err) {
            dispatch({type: types.GET_KYC_STAGES.FAILURE, payload: err})
            showErrorMessage(err)
        }
    }
}

export const createKYCStageAsync = (stageId: string, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.CREATE_KYC_STAGE.REQUEST})
        try {
            await coreService.createKycStage(stageId);
            dispatch({type: types.CREATE_KYC_STAGE.SUCCESS})
            successCallback?.()
        } catch (e) {
            dispatch({type: types.CREATE_KYC_STAGE.FAILURE})
            errorCallback?.()
        }
    }
}

export const documentInitAsync = (documentType: string, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.DOCUMENT_INIT.REQUEST})
        try {
            const {data} = await coreService.documentInit(documentType)
            dispatch({type: types.DOCUMENT_INIT.SUCCESS, payload: {documentToken: data.data.token, token: true}})
        } catch (e) {
            dispatch({type: types.DOCUMENT_INIT.FAILURE, payload: {documentToken: "", token: false}})
            errorCallback?.()
        }
    }
}
