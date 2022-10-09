import cogoToast from "cogo-toast";
import { toast } from 'react-toastify';
import cookies from "js-cookie";
import moment from "moment";
import React from "react";

const isBrowser = typeof window !== 'undefined';
const host = global.window?.location.host;
const domainParts = host?.split('.');
domainParts?.shift();
const domain = '.'+domainParts?.join('.');

export const _getTokenFromSession = (key: string) =>
	global.window?.sessionStorage.getItem(key);
export const _removeTokenFromSession = (key: string) =>
	global.window?.sessionStorage.removeItem(key);
export const _setTokenToSession = (token: any, name: string) =>
	global.window?.sessionStorage.setItem(name, token);

export const _getTokenFromStorage = (key: string) =>
	isBrowser && cookies.get(key);

export const _setTokenToStorage = (
	key: string,
	value: any,
	expiresAt?: any
) => {
	if(host.split('.').length === 1){
		return isBrowser && cookies.set(key, value, { expires: expiresAt });
	}
	else{
		return isBrowser && cookies.set(key, value, { expires: expiresAt, domain: domain });
	}
};

export const _removeTokenFromStorage = (key: string) =>{
	if(host.split('.').length === 1){
		return isBrowser && cookies.remove(key);
	}
	else{
		return isBrowser && cookies.remove(key, { domain: domain });
	}
}

export const generateActions = (action: string) => {
	action = action.toUpperCase();
	return {
		REQUEST: `${action}_REQUEST`,
		SUCCESS: `${action}_SUCCESS`,
		FAILURE: `${action}_FAILURE`,
	};
};

// export const showToast = (message: string, type?: string) => {
// 	switch (type?.toLowerCase()) {
// 		case "success":
// 			cogoToast.success(message, { position: "top-right" });
// 			break;
// 		case "info":
// 			cogoToast.info(message, { position: "top-right" });
// 			break;
// 		case "loading":
// 			cogoToast.loading(message, { position: "top-right" });
// 			break;
// 		case "warn":
// 			cogoToast.warn(message, { position: "top-right" });
// 			break;
// 		case "error":
// 			cogoToast.error(message, { position: "top-right" });
// 			break;
// 		default:
// 			cogoToast.info(message, { position: "top-right" });
// 			break;
// 	}
// };

export const showToast = (message: string, type?: string) => {
	toast.dismiss();
	switch (type?.toLowerCase()) {
		case "success":
			toast.success(message);
			break;
		case "info":
			toast.info(message);
			break;
		case "loading":
			toast.loading(message);
			break;
		case "warn":
			toast.warn(message);
			break;
		case "error":
			toast.error(message);
			break;
		default:
			toast.info(message);
			break;
	}
};

export const copyToClipboard = (str: any, message?: any) => {
	if (typeof window) {
		const el = window.document.createElement("textarea");
		el.value = str;
		window.document.body.appendChild(el);
		el.select();
		window.document.execCommand("copy");
		window.document.body.removeChild(el);
		showToast(message || "Copied", "info");
	}
};

export const capitalize = (s: string) => {
	return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

export const sortItems = (objs: any[], property: string) => {
	return objs.sort((a: any, b: any) =>
		a[property] > b[property] ? 1 : b[property] > a[property] ? -1 : 0
	);
};

export const isElement = (element: any) => {
	return React.isValidElement(element);
};

export const isArray = (data: unknown) => data instanceof Array;

export const centeredEllipsis = (str: string) => {
	if (str.length > 15) {
		return str.substr(0, 7) + "..." + str.substr(str.length - 3, str.length);
	}
	return str;
};

export const debounce = (fn: Function, ms = 2000) => {
	let timeoutId: ReturnType<typeof setTimeout>;
	return function (this: any, ...args: any[]) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn.apply(this, args), ms);
	};
};

export const isEmail = (email: string): boolean => {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		return true;
	} else {
		return false;
	}
};

export const convertArrayToObject = (
	arr: any[],
	index: number = 0
): Record<string, any> => {
	return arr.reduce(function (result, item) {
		let key = Object.keys(item)[index]; //first property: a, b, c
		result[key] = item[key];
		return result;
	});
};

export const findCountry = (countries: any[], value: string) => {
	return countries.find((country) => country.name === value);
};

export const generateCities = (country: any) => {
	if (country.cities) {
		const cities = country.cities.map((city: string) => {
			return {
				text: city,
				value: city,
			};
		});
		return cities;
	}
	return [];
};

export const isoDateHistory = (dateTime: string) => {
	return moment(dateTime, moment.ISO_8601).format("DD-MM HH:mm:ss");
};
