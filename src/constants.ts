export const passwordRegExp =
	/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

export const phoneRegExp =
	/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

export const hasSpecialCharacter = (value: string) => {
	return /[!@#$%^&*()\-_=+{};:,<.>]/.test(value);
};

export const hasCaps = (value: string) => {
	return /(.*[A-Z].*)/.test(value);
};

export const hasDigit = (value: string) => {
	return /(.*\d.*)/.test(value);
};

export const getDate = (value: string) => {
	return value.split("T")[0];
};

export const getDateTime = (value: string) => {
	let date_ob = new Date(value);
	const date = value.split("T")[0];
	let hours =
		date_ob.getHours().toString().length === 1
			? "0" + date_ob.getHours()
			: date_ob.getHours();
	let minutes = date_ob.getMinutes();
	let seconds = date_ob.getSeconds();
	let a = date_ob.getHours().toString().length === 1 ? "AM" : "PM";
	return `${date} ${hours}:${minutes}:${seconds} ${a}`;
};

export const getDateTimeFormatUK = (value: string) => {
	let date_ob = new Date(value);
	let a = date_ob.getHours().toString().length === 1 ? "AM" : "PM";
	return `${date_ob.toLocaleString("en-UK")} ${a}`;
};

export const getDateTimeWithSeconds = (value: string) => {
	let date_ob = new Date(value);
	const date = value.split("T")[0];
	let hours =
		date_ob.getHours().toString().length === 1
			? "0" + date_ob.getHours()
			: date_ob.getHours();
	let minutes = date_ob.getMinutes();
	let seconds = date_ob.getSeconds();
	return `${date} ${hours}:${minutes}:${seconds}`;
};

export const getDateTimeWithoutA = (value: string) => {
	let date_ob = new Date(value);
	const date = value.split("T")[0];
	let hours =
		date_ob.getHours().toString().length === 1
			? "0" + date_ob.getHours()
			: date_ob.getHours();
	let minutes = date_ob.getMinutes();
	return `${date} ${hours}:${minutes}`;
};

export const getTime = (value: string) => {
	let date_ob = new Date(value);
	let hours =
		date_ob.getHours().toString().length === 1
			? "0" + date_ob.getHours()
			: date_ob.getHours();
	let minutes = date_ob.getMinutes();
	let seconds = date_ob.getSeconds();
	return `${hours}:${minutes}:${seconds}`;
};

export const formatToCurrency = (num: number, p: number) => {
	let num_ = num
		? Number(num)
				.toFixed(p)
				.replace(/\d(?=(\d{3})+\.)/g, "$&,")
		: num;
	return num_;
	// return Number(num);
};

export const currencyFormatter = (value: string) => {
	switch (value) {
		case "NAIRA":
			return "₦";
		case "USDT":
			return "$";
	}
	return value;
};

export const demicalFormatter = (num: number, placeValue: number) => {
	num = Math.floor(num * Math.pow(10, placeValue)) / Math.pow(10, placeValue);
	return num || "";
};

export const IsJsonString = (str: any) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};
