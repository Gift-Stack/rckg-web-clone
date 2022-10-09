
import { Dispatch } from "redux";
import * as types from "../types";

interface TransferCryptoProps {}

export const transferCrypto = (data: TransferCryptoProps, successCallback?: Function, errorCallback?: Function) => async (dispatch: Dispatch) => {
    dispatch({type: types.TRANSFER_CRYPTO.REQUEST});
    try {
        // const {data: responseData} = await cryptoTXNService.transferCrypto(data)
        dispatch({type: types.TRANSFER_CRYPTO.SUCCESS})
        successCallback?.()
        return "response went through"
    } catch (err) {
        dispatch({type: types.TRANSFER_CRYPTO.FAILURE})
        errorCallback?.()

    }
}