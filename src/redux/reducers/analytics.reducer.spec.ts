import { USER_DEVICE, USER_GEO_DATA } from "./../types/analytics.types";
import { USER_IP } from "../../redux/types";
import analyticsReducer from "./analytics.reducer";

describe("Analytics Reducer", () => {
	const initialState = {
		loading: false,
		error: null,
		userIpAddress: null,
	};

	const testIp: string = "12.34.4567.890";
	const errorMessage: string = "error message";
	const testUserGeoData = {
		client: {
			engine: "Blink",
			engineVersion: "",
			name: "Chrome",
			type: "browser",
			version: "95.0",
		},
		device: {
			brand: "",
			model: "",
			type: "desktop",
		},
		os: {
			name: "Windows",
			platform: "x64",
			version: "10.0",
		},
	};
	const testUserDeviceDetails = {
		city: "",
		continent: "",
		country: "",
		countryCode: "",
		ipAddress: "",
		latitude: "",
		longitude: "",
		region: "",
	};
	it("should return initial state", () => {
		expect(analyticsReducer(undefined, {})).toEqual(initialState);
	});
	it("should handle USER_IP.REQUEST", () => {
		expect(analyticsReducer(initialState, { type: USER_IP.REQUEST })).toEqual({
			...initialState,
			loading: true,
		});
	});
	it("should handle USER_IP.SUCCESS", () => {
		expect(
			analyticsReducer(initialState, { type: USER_IP.SUCCESS, payload: testIp })
		).toEqual({
			...initialState,
			userIpAddress: testIp,
		});
	});
	it("should handle USER_IP.FAILURE", () => {
		expect(
			analyticsReducer(initialState, {
				type: USER_IP.FAILURE,
				payload: errorMessage,
			})
		).toEqual({ ...initialState, error: errorMessage });
	});
	it("should handle USER_DEVICE.SUCCESS", () => {
		expect(
			analyticsReducer(initialState, {
				type: USER_DEVICE.SUCCESS,
				payload: testUserGeoData,
			})
		).toEqual({ ...initialState, userDevice: testUserGeoData });
	});
	it("should handle USER_GEO_DATA.SUCCESS", () => {
		expect(
			analyticsReducer(initialState, {
				type: USER_GEO_DATA.SUCCESS,
				payload: testUserDeviceDetails,
			})
		).toEqual({ ...initialState, userGeoData: testUserDeviceDetails });
	});
});
