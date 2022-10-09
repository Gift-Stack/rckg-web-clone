import {
	_getTokenFromStorage,
	_removeTokenFromStorage,
	_setTokenToStorage,
} from "../utils";

export interface AuthData {
	access_token: string;
	expires_in: any;
	uid?: string;
}

export interface RegistrationData {
	email: string;
	emailConfirmationOtpExpiringTime: string;
	uid: string;
}

export default class StorageService {
	private milliSecondsInDays: number = 86400000;

	saveAuthData(authData: AuthData) {
		this.saveItemIfProvided(
			"access_token",
			authData.access_token,
			authData.expires_in
			// Number(authData.expires_in) / this.milliSecondsInDays
		);
		this.saveItemIfProvided("uid", authData.uid, authData.expires_in);
	}

	saveRegistrationData(registrationData: RegistrationData) {
		this.saveItemIfProvided("email", registrationData.email);
		this.saveItemIfProvided(
			"emailConfirmationOtpExpiringTime",
			registrationData.emailConfirmationOtpExpiringTime
		);
		this.saveItemIfProvided("uid", registrationData.uid);
	}

	private saveItemIfProvided(key: string, value?: string, expiresAt?: any) {
		if (value && expiresAt) {
			_setTokenToStorage(key, value, expiresAt);
		}else if (value) {
			_setTokenToStorage(key, value);
		}
	}

	clearAuthData() {
		_removeTokenFromStorage("access_token");
		_removeTokenFromStorage("uid");
	}

	set(key: string, value: string) {
		this.saveItemIfProvided(key, value);
	}

	get(key: string): any {
		return _getTokenFromStorage(key);
	}

	remove(key: string) {
		return _removeTokenFromStorage(key);
	}

	getAuthData() {
		return {
			access_token: _getTokenFromStorage("access_token"),
			uid: _getTokenFromStorage("uid"),
		};
	}
}
