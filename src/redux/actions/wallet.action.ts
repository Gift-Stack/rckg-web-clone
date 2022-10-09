import  axios  from 'axios';
import * as types from "../types";
import {Dispatch} from "redux";
import {walletService} from "../../services";
import {showErrorMessage} from "./auth.action";
import {showToast} from "../../utils";


export const fetchWalletAssetsBalanceAsync = (successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.FETCH_WALLET_ASSETS_BALANCE.REQUEST});
        try {
            const {data: responseData} = await walletService.fetchWalletAssetsBalance();
            const result = responseData.map(async (asset: any) => {
                    let res = await walletService.getCoinPairRate({baseAsset: asset.asset, quoteAsset: 'USDT'})
                    return {
                        ...asset,
                        usdtValue: asset.asset === "USDT" ? parseFloat(asset.free) : parseFloat(asset.free) * parseFloat(res.data.data.price)
                    }
            })
            Promise.all(result).then(function(results) {
                dispatch({type: types.FETCH_WALLET_ASSETS_BALANCE.SUCCESS, payload: results});
                successCallback?.(result)
            })
        } catch (e) {
            showErrorMessage(e)
            dispatch({type: types.FETCH_WALLET_ASSETS_BALANCE.FAILURE});
            errorCallback?.(e)
        }
    }
};

export const getTotalAssetsBalanceBTC = (successCallback?: Function, errorCallback?: Function) => {
    return async(dispatch: Dispatch) => {
        dispatch({type: types.ASSETS_BALANCE_BTC.REQUEST});
        try {
            const {data: {data: responseData}} = await walletService.totalAssetsBalanceBTC();
            dispatch({type: types.ASSETS_BALANCE_BTC.SUCCESS, payload: responseData});
            successCallback?.(responseData)
        } catch (e) {
            showErrorMessage(e)
            dispatch({type: types.ASSETS_BALANCE_BTC.FAILURE});
            errorCallback?.(e)
        }
    }
};

export const getRateBTCUSDT = (successCallback?: Function, errorCallback?: Function) => {
    return async(dispatch: Dispatch) => {
        dispatch({type: types.BTCUSDTRATE.REQUEST});
        try {
            const {data: {data: responseData}} = await walletService.getBTCUSDTRate()
            dispatch({type: types.BTCUSDTRATE.SUCCESS, payload: responseData});
            successCallback?.(responseData)
        } catch (e) {
            showErrorMessage(e)
            dispatch({type: types.BTCUSDTRATE.FAILURE});
            errorCallback?.(e)
        }
    }
}

