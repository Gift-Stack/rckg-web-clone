import * as types from "../types";

export const suspend = (suspend: boolean) => {
    return {
        type: types.SUSPEND,
        payload: suspend
    }
}