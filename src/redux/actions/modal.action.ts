import {HIDE_MODAL, SHOW_MODAL, MODAL_ACTION_LOADING} from "../types";
import {ModalTypesEnum} from "../../components/modals/modalTypes";

export const showModal = (modalType: ModalTypesEnum, data: Record<string, unknown> = {}) => {
    return {
        type: SHOW_MODAL,
        payload: modalType,
        modalData: data
    };
};

export const hideModal = () => {
    return {
        type: HIDE_MODAL,
    };
};


export const modalActionLoadingState = (loading: boolean) => {
    return {
        type: MODAL_ACTION_LOADING,
        data: loading,
    };
};
