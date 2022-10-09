import * as types from "../types";
import {countryService} from "../../services/";
import {Dispatch} from "redux";

export const GetCountries = () => async (dispatch: Dispatch) => {
    dispatch({type: types.COUNTRIES.REQUEST});
    const {data: {data: ResponseData}} = await countryService.getCountries()
    try {
        dispatch({type: types.COUNTRIES.SUCCESS, payload: ResponseData});
    } catch (e) {
        dispatch({type: types.COUNTRIES.FAILURE});
    }
};
