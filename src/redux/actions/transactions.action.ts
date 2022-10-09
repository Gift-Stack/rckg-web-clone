import * as types from "../types";
import {Dispatch} from "redux";
import {transactionsService, storageService } from "../../services";
import {showErrorMessage} from "./auth.action";
import { IDepositPayload, IHistoryTable, ISwapListPayload, IDepositWithDrawalHistoryTable } from "services/transactionsService";
import { SwapPayload } from "components/crypto/model";
import {showToast} from "../../utils";

export const getCoinsAsync = (successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.GET_COINS.REQUEST});
        try {
            const {data: {data: responseData}} = await transactionsService.getCoins();
            const result = responseData.map(async (asset: any) => {
                let res = await transactionsService.getCoinImage(asset.coin)
                return {
                    ...asset,
                    image: res.data[0].image_url
                }
            })
            Promise.all(result).then(function(results) {
                dispatch({type: types.GET_COINS.SUCCESS, payload: results});
                successCallback?.()
            })
        } catch (e) {
            dispatch({type: types.GET_COINS.FAILURE});
            showErrorMessage(e)
            errorCallback?.()
        }
    }
};

export const getNetworksAsync = (data: IDepositPayload, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.GET_NETWORKS.REQUEST});
        try {
            const {data: {data: responseData}} = await transactionsService.getNetworks(data);
            dispatch({type: types.GET_NETWORKS.SUCCESS, payload: responseData});
            successCallback?.()
        } catch (e) {
            dispatch({type: types.GET_NETWORKS.FAILURE});
            showErrorMessage(e)
            errorCallback?.()
        }
    }
};

export const getDepositAddressAsync = (data: IDepositPayload, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.DEPOSIT_ADDRESS.REQUEST});
        try {
            const {data: {data: responseData}} = await transactionsService.getDepositAddress(data);
            dispatch({type: types.DEPOSIT_ADDRESS.SUCCESS, payload: responseData});
            successCallback?.()
        } catch (e) {
            dispatch({type: types.DEPOSIT_ADDRESS.FAILURE});
            showErrorMessage(e)
            errorCallback?.()
        }
    }
};

export const getRecentDepositAsync = (successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.RECENT_DEPOSIT.REQUEST});
        try {
            const {data: {data: responseData}} = await transactionsService.getRecentDeposit();
            dispatch({type: types.RECENT_DEPOSIT.SUCCESS, payload: responseData});
            successCallback?.()
        } catch (e) {
            dispatch({type: types.RECENT_DEPOSIT.FAILURE});
            showErrorMessage(e)
            errorCallback?.()
        }
    }
};

export const getDepositHistoryAsync = (data: IHistoryTable, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.DEPOSIT_HISTORY.REQUEST});
        try {
            const {data: {data: responseData}} = await transactionsService.getDepositHistory(data);
            dispatch({type: types.DEPOSIT_HISTORY.SUCCESS, payload: responseData});
            successCallback?.()
        } catch (e) {
            dispatch({type: types.DEPOSIT_HISTORY.FAILURE});
            showErrorMessage(e)
            errorCallback?.()
        }
    }
};

export const getVariousAssetsBalanceAsync = (successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.VARIOUS_ASSETS_BALANCE.REQUEST});
        try {
            const {data} = await transactionsService.getVariousAssetsBalance();
            dispatch({type: types.VARIOUS_ASSETS_BALANCE.SUCCESS, payload: data});
            successCallback?.()
        } catch (e) {
            dispatch({type: types.VARIOUS_ASSETS_BALANCE.FAILURE});
            showErrorMessage(e)
            errorCallback?.()
        }
    }
};

export const getSwapListAsync = (data: ISwapListPayload, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.SWAP_LIST.REQUEST});
        try {
            const {data: {data: responseData}} = await transactionsService.getSwapList(data);
            dispatch({type: types.SWAP_LIST.SUCCESS, payload: responseData});
            successCallback?.()
        } catch (e) {
            dispatch({type: types.SWAP_LIST.FAILURE});
            showErrorMessage(e)
            errorCallback?.()
        }
    }
};

export const getCryptoSwapFeeAsync = (data: SwapPayload, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.GET_CRYPTO_SWAP_FEE.REQUEST});
        try {
            const {data: {data: responseData}} = await transactionsService.getCryptoSwapFee(data);
            dispatch({type: types.GET_CRYPTO_SWAP_FEE.SUCCESS, payload: responseData});
            successCallback?.()
        } catch (e) {
            dispatch({type: types.GET_CRYPTO_SWAP_FEE.FAILURE});
            showErrorMessage(e)
            errorCallback?.()
        }
    }
};

export const swapCyptoAsync = (data: SwapPayload, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.SWAP_CRYPTO.REQUEST});
        try {
            const {data: {data: responseData}} = await transactionsService.swapCypto(data);
            showToast("Crypto Swapped Successfully", "info");
            dispatch({type: types.SWAP_CRYPTO.SUCCESS, payload: responseData});
            successCallback?.()
        } catch (e) {
            dispatch({type: types.SWAP_CRYPTO.FAILURE});
            showErrorMessage(e)
            errorCallback?.()
        }
    }
};

export const getDepositWithDrawalHistoryAsync = (data: IDepositWithDrawalHistoryTable, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.GET_DEPOSIT_WITHDRAWAL_TRANSACTION_HISTORY.REQUEST});
        try {
            const {data: {data: responseData}} = await transactionsService.getDepositWithDrawalHistory(data);
            dispatch({type: types.GET_DEPOSIT_WITHDRAWAL_TRANSACTION_HISTORY.SUCCESS, payload: responseData.items});
            successCallback?.()
        } catch (e) {
            dispatch({type: types.GET_DEPOSIT_WITHDRAWAL_TRANSACTION_HISTORY.FAILURE});
            showErrorMessage(e)
            errorCallback?.()
        }
    }
};

export const getDepositTransactionHistoryAsync = (data: IDepositWithDrawalHistoryTable, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.GET_DEPOSIT_TRANSACTION_HISTORY.REQUEST});
        try {
            const {data: {data: responseData}} = await transactionsService.getDepositWithDrawalHistory(data);
            dispatch({type: types.GET_DEPOSIT_TRANSACTION_HISTORY.SUCCESS, payload: responseData.items});
            successCallback?.()
        } catch (e) {
            dispatch({type: types.GET_DEPOSIT_TRANSACTION_HISTORY.FAILURE});
            showErrorMessage(e)
            errorCallback?.()
        }
    }
};

export const getWithDrawalTransactionHistoryAsync = (data: IDepositWithDrawalHistoryTable, successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.GET_WITHDRAWAL_TRANSACTION_HISTORY.REQUEST});
        try {
            const {data: {data: responseData}} = await transactionsService.getDepositWithDrawalHistory(data);
            dispatch({type: types.GET_WITHDRAWAL_TRANSACTION_HISTORY.SUCCESS, payload: responseData.items});
            successCallback?.()
        } catch (e) {
            dispatch({type: types.GET_WITHDRAWAL_TRANSACTION_HISTORY.FAILURE});
            showErrorMessage(e)
            errorCallback?.()
        }
    }
};

export const getCryptoSwapHistoryAsync = (data: IDepositWithDrawalHistoryTable, successCallback?: Function, errorCallback?: Function) => {
	const authData = storageService.getAuthData();
    return async (dispatch: Dispatch) => {
        if(authData.access_token && authData.uid){
            dispatch({type: types.CRYPTO_SWAP_HISTORY.REQUEST});
            try {
                const {data: {data: responseData}} = await transactionsService.getCryptoSwapHistory(data);
                dispatch({type: types.CRYPTO_SWAP_HISTORY.SUCCESS, payload: responseData});
                successCallback?.()
            } catch (e) {
                dispatch({type: types.CRYPTO_SWAP_HISTORY.FAILURE});
                showErrorMessage(e)
                errorCallback?.()
            }
        }
    }
};
export const getCoinPairsAsync = (successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.GET_COIN_PAIRS.REQUEST});
        try {
            const {data: {data: responseData}} = await transactionsService.getCoinPairs();
            dispatch({type: types.GET_COIN_PAIRS.SUCCESS, payload: responseData});
            successCallback?.()
        } catch (e) {
            dispatch({type: types.GET_COIN_PAIRS.FAILURE});
            showErrorMessage(e)
            errorCallback?.()
        }
    }
};

