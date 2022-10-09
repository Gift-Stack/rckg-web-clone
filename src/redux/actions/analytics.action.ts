import {USER_GEO_DATA} from './../types/analytics.types';
import {Dispatch} from "redux";
import {USER_IP, USER_DEVICE} from "../types";
import {userIpService} from "../../services/";
import DeviceDetector from "device-detector-js";

export const getUserIP = () => async (dispatch: Dispatch) => {
    dispatch({type: USER_IP.REQUEST})
    try {
        const {data} = await userIpService.getIp()
        const {
            city,
            continent,
            country,
            countryCode,
            lat: latitude,
            lon: longitude,
            query: ipAddress,
            region,
        } = data
        dispatch({type: USER_IP.SUCCESS, payload: ipAddress})
        dispatch({
            type: USER_GEO_DATA.SUCCESS, payload: {
                city,
                continent,
                country,
                countryCode,
                latitude,
                longitude,
                ipAddress,
                region
            }
        })
    } catch
        (e) {
        dispatch({type: USER_IP.FAILURE})
    }
}


export const getUserDevice = () => (dispatch: Dispatch) => {
    dispatch({type: USER_DEVICE.REQUEST})
    const deviceDetector = new DeviceDetector();
    const device: any = deviceDetector.parse(navigator.userAgent)
    dispatch({type: USER_DEVICE.SUCCESS, payload: device})
}