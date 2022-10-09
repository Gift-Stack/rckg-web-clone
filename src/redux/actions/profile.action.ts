import * as types from "../types";
import {Dispatch} from "redux";
import {coreService} from "../../services";
import {showErrorMessage} from "./auth.action";
import {updateProfileDataProps} from "../../services/coreService";
import {showToast} from "../../utils";

export const fetchProfileAsync = (successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.FETCH_PROFILE.REQUEST});
        try {
            const {data: {data: responseData}} = await coreService.fetchProfile()
            dispatch({type: types.FETCH_PROFILE.SUCCESS, payload: responseData});
            successCallback?.(responseData)
        } catch (e) {
            showErrorMessage(e)
            dispatch({type: types.FETCH_PROFILE.FAILURE});
            errorCallback?.()
        }
    }
};


export const updateProfileAsync = (data: updateProfileDataProps, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.UPDATE_PROFILE.REQUEST});
        try {
            const {data: {data: responseData}} = await coreService.updateProfile(data);
            dispatch({type: types.UPDATE_PROFILE.SUCCESS, payload: responseData});
            successCallback?.()
            showToast("Updated Profile Details Successfully", "success")
        } catch (e) {
            dispatch({type: types.UPDATE_PROFILE.FAILURE});
            errorCallback?.()
            showErrorMessage(e)
        }
    }
}