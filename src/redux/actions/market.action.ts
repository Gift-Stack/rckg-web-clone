import  axios  from 'axios';
import * as types from "../types";
import {Dispatch} from "redux";
import {walletService} from "../../services";
import {showErrorMessage} from "./auth.action";
import {showToast} from "../../utils";

export const fetchMarketDataAsync = (successCallback?: Function, errorCallback?: Function) => {
  return async (dispatch: Dispatch) => {
        dispatch({type: types.GETMARKETDATA.REQUEST});
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_EXCHANGE_BASEURL}price_data/mini_tickers`)
          const data = await res.data
          dispatch({type: types.GETMARKETDATA.SUCCESS, payload: data})
            // if (status && status !== 201) return;
            successCallback?.(data);
          return data
        } catch (err) {
             dispatch({type: types.GETMARKETDATA.FAILURE, payload: err});
            showErrorMessage(err)
            errorCallback?.();
        }
    }
}

export const fetchMarketDataAndHighlightsAsync = (successCallback?: Function, errorCallback?: Function) => {
  return async (dispatch: Dispatch) => {
        dispatch({type: types.GETMARKETDATAANDHIGHLIGHTS.REQUEST});
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_EXCHANGE_BASEURL}price_data/mini_ticker_and_highlights
`)
          const data = await res.data
          dispatch({type: types.GETMARKETDATAANDHIGHLIGHTS.SUCCESS, payload: data})
            // if (status && status !== 201) return;
            successCallback?.(data);
          return data
        } catch (err) {
              dispatch({type: types.GETMARKETDATAANDHIGHLIGHTS.FAILURE, payload: err});
            showErrorMessage(err)
            errorCallback?.();
        }
    }
}

export const fetchPaginatedMarketDataAsync = (page?: number , successCallback?: Function, errorCallback?: Function) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.GETMARKETDATA.REQUEST});
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_EXCHANGE_BASEURL}price_data/mini_tickers_paginated?page=${page ?? 1}&limit=20`)
          const data = await res.data
          dispatch({type: types.GETMARKETDATA.SUCCESS, payload: data})
            // if (status && status !== 201) return;
            successCallback?.(data);
          return data
        } catch (err) {
             dispatch({type: types.GETMARKETDATA.FAILURE, payload: err});
            showErrorMessage(err)
            errorCallback?.();
        }
    }
}