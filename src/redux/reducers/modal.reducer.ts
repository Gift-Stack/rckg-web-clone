import * as types from "../types";
import { ModalTypesEnum } from "../../components/modals/modalTypes";

const initialState = {
	loading: false,
	modalType: ModalTypesEnum,
};

const ModalReducer = (
	state = initialState,
	{ type, payload, modalData }: any
) => {
	switch (type) {
		case types.SHOW_MODAL:
			return {
				...state,
				modalType: payload,
				modalData: modalData,
			};
		case types.HIDE_MODAL:
			return { ...state, modalType: undefined };
		case types.MODAL_ACTION_LOADING:
			return {
				...state,
				loading: payload,
			};
		default:
			return state;
	}
};

export default ModalReducer;
