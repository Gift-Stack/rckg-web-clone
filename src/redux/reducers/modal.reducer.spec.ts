import ModalReducer from "./modal.reducer";
import * as types from "../types";
import { ModalTypesEnum } from "../../components/modals/modalTypes";

describe("Modal Reducer", () => {
	const initialState = {
		loading: false,
		modalType: ModalTypesEnum,
	};

	it("should return default state", () => {
		expect(ModalReducer(undefined, {})).toEqual({
			...initialState,
			modalType: ModalTypesEnum,
		});
	});

	it("should handle SHOW_MODAL", () => {
		expect(
			ModalReducer(initialState, {
				type: types.SHOW_MODAL,
				payload: ModalTypesEnum.ALERT_NUMBER_VERIFICATION,
				modalData: "modal data",
			})
		).toEqual({
			...initialState,
			modalType: ModalTypesEnum.ALERT_NUMBER_VERIFICATION,
			modalData: "modal data",
		});
	});

	it("should handle HIDE_MODAL", () => {
		expect(ModalReducer(initialState, { type: types.HIDE_MODAL })).toEqual({
			...initialState,
			modalType: undefined,
		});
	});

	it("should handle MODAL_ACTION_LOADING", () => {
		expect(
			ModalReducer(initialState, {
				type: types.MODAL_ACTION_LOADING,
				payload: true,
			})
		).toEqual({ ...initialState, loading: true });
	});
});
