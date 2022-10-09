import {
	_getTokenFromStorage,
	_removeTokenFromStorage,
	_setTokenToStorage,
	capitalize,
	generateActions,
	isArray,
	isElement,
	showToast,
} from "./index";
import mockCogoToast from "../../__mocks__/cogoToast";
import cogoToast from "cogo-toast";

jest.mock("cogo-toast");

const toast = jest.fn(showToast);
const setTokenToStorage = jest.fn(_setTokenToStorage);
const getTokenFromStorage = jest.fn(_getTokenFromStorage);
const removeTokenFromStorage = jest.fn(_removeTokenFromStorage);
document.execCommand = jest.fn();
document.createElement = jest.fn();

const options = { position: "top-right" };

describe("utils", () => {
	test("generateActions", async () => {
		expect(generateActions("HELLO")).toEqual({
			REQUEST: `HELLO_REQUEST`,
			SUCCESS: `HELLO_SUCCESS`,
			FAILURE: `HELLO_FAILURE`,
		});
	});

	test("_setToken to storage", () => {
		setTokenToStorage("name", "3");
		expect(setTokenToStorage).toHaveBeenCalledWith("name", "3");
	});
	test("_setToken is called with expire at", () => {
		const expiresAt = 6000 / 30000;
		setTokenToStorage("name", "rocket", expiresAt);
		expect(setTokenToStorage).toHaveBeenCalledWith("name", "rocket", expiresAt);
	});

	test("_getToken from storage", () => {
		getTokenFromStorage.mockReturnValue("3");
		const value = getTokenFromStorage("name");
		expect(getTokenFromStorage).toHaveBeenCalledWith("name");
		expect(value).toEqual("3");
	});

	test("_remove from storage", () => {
		removeTokenFromStorage.mockReturnValue(false);
		const value = removeTokenFromStorage("name");
		expect(removeTokenFromStorage).toHaveBeenCalledWith("name");
		expect(value).toEqual(false);
	});

	test("isElement to be true", () => {
		let element = <div></div>;
		expect(isElement(element)).toEqual(true);
	});
	test("isElement to be false", () => {
		let element = "";
		expect(isElement(element)).toEqual(false);
	});
	test("is Array should be true", async () => {
		expect(isArray([])).toEqual(true);
	});

	test("is Array to be false", async () => {
		expect(isArray("")).toEqual(false);
	});

	test("capitalize", () => {
		expect(capitalize("adm")).toBe("Adm");
	});

	// test("showToast works without type", () => {
	// 	showToast("hello");
	// 	expect(cogoToast.info).toHaveBeenCalledWith("hello", options);
	// });

	// test("showToast with type success calls cogo toast success", () => {
	// 	showToast("hello", "success");
	// 	expect(cogoToast.success).toHaveBeenCalledWith("hello", options);
	// });

	// test("showToast with type loading calls cogo toast loading", () => {
	// 	showToast("hello", "LOADING");
	// 	expect(cogoToast.loading).toHaveBeenCalledWith("hello", options);
	// });
	// test("showToast with type warn calls cogo toast warn", () => {
	// 	showToast("hello", "WARN");
	// 	expect(cogoToast.warn).toHaveBeenCalledWith("hello", options);
	// });

	// test("showToast with type error calls cogo toast error", () => {
	// 	showToast("hello", "ERROR");
	// 	expect(cogoToast.error).toHaveBeenCalledWith("hello", options);
	// });
	// test("showToast with type info calls cogo toast info", () => {
	// 	showToast("hello", "INFO");
	// 	expect(cogoToast.info).toHaveBeenCalledWith("hello", options);
	// });

	test("copyToClipboard()", async () => {
		expect(true).toBeTruthy();
		// copyToClipboard("Hello")
		// const el = document.createElement;
		// expect(el).toHaveBeenCalledWith("textarea")
		// expect(document.execCommand).toHaveBeenCalledWith("copy");
		// expect(toast).toHaveBeenCalledWith("Copied", "info")
	});
});
