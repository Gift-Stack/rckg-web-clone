import { ActionResponse } from "./auth.reducer";
import * as types from "../types";

export interface ProfileStateProps {
	id: string;
	isActive: boolean;
	createdOn: Nullable<string>;
	createdBy: Nullable<string>;
	updatedOn: Nullable<string>;
	updatedBy: Nullable<string>;
	deletedOn: Nullable<string>;
	deletedBy: Nullable<string>;
	email: string;
	userName: Nullable<string>;
	firstName: Nullable<string>;
	middleName: Nullable<string>;
	lastName: Nullable<string>;
	phoneNumber: Nullable<string>;
	gender: Nullable<string>;
	dateOfBirth: Nullable<string>;
	address: Nullable<string>;
	city: Nullable<string>;
	state: Nullable<string>;
	country: Nullable<string>;
	profileImageUrl: Nullable<string>;
	status: Nullable<string>;
	usersKYC: string[];
	loading: boolean;
}

export const initialState: ProfileStateProps = {
	id: "",
	isActive: false,
	createdOn: null,
	createdBy: null,
	updatedOn: null,
	updatedBy: null,
	deletedOn: null,
	deletedBy: null,
	email: "",
	userName: "",
	firstName: "",
	middleName: "",
	lastName: "",
	phoneNumber: "",
	gender: "",
	dateOfBirth: "",
	address: "",
	city: "",
	state: "",
	country: "",
	profileImageUrl: "",
	status: "",
	usersKYC: [],
	loading: false,
};

const ProfileReducer = (
	state: { [key: string]: any } = initialState,
	{ type, payload }: ActionResponse
) => {
	switch (type) {
		case types.FETCH_PROFILE.REQUEST:
		case types.UPDATE_PROFILE.REQUEST:
			return { ...state, loading: true };
		case types.FETCH_PROFILE.SUCCESS:
		case types.UPDATE_PROFILE.SUCCESS:
			return { ...state, loading: false, ...payload };
		case types.FETCH_PROFILE.FAILURE:
		case types.UPDATE_PROFILE.FAILURE:
			return { ...state, loading: false, error: payload };
		default:
			return state;
	}
};

export default ProfileReducer;
