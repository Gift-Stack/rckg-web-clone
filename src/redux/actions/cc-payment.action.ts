import {ModalTypesEnum} from "./../../components/modals/modalTypes";
import {Dispatch} from "redux";
import {showModal} from ".";
import * as types from "../types";

interface makePaymentProps {
}

export const makePayment = (data: makePaymentProps, successCallback?: Function, errorCallback?: Function) => async (dispatch: Dispatch) => {
    dispatch({type: types.MAKE_PAYMENT.REQUEST});
    try {
        // const {data: responseData} = await cryptoTXNService.makePayment(data)
        dispatch({type: types.MAKE_PAYMENT.SUCCESS})
        dispatch(showModal(ModalTypesEnum.CREDIT_CARD_PAYMENT_SUCCESS, {message: "Crypto purchase successful"}));
        successCallback?.()
    } catch (err) {
        dispatch(showModal(ModalTypesEnum.CREDIT_CARD_PAYMENT_FAILURE, {message: typeof err === "string" && err}));
        errorCallback?.()
    }
}