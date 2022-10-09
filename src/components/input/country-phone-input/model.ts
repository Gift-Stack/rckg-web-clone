export interface CountryPhoneInputProps {
	countries: any[];
	value: string;
	formik?: any;
	setPhoneCode: (code: string) => void;
}

export interface PhoneInputProps {
	[key: string]: any;
}
