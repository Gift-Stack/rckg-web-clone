import ApiService from "./axios";
import { Base } from "../redux/actions";
import { HttpMethod } from "./baseHTTPService";
import StorageService from "./storageService";
import { storageService } from "./index";

export interface SendPhoneVerificationOtpProps {
	phoneNumber: string;
}

export interface VerifyLoginDataProps {
	identifier: string;
	otp: string;
	ipAddress: string;
	deviceInfo: string;
	geoData: string;
}

export interface LoginDataProps {
	identifier: string;
	password: string;
}

export interface ResendOtpProps {
	identifier: string;
}

export interface ForgotPasswordProps {
	email: string;
}

export enum AccountRole {
	USER = "user",
	ADMIN = "admin",
}

export interface UserData {
	id: string;
	isActive: boolean;
	createdOn: string;
	createdBy: string | null;
	updatedOn: string | null;
	updatedBy: string | null;
	deletedOn: string | null;
	deletedBy: string | null;
	email: string;
	phone: string | null;
	otpConfirmationStatus: boolean;
	isEmailVerify: boolean;
	isPhoneVerify: boolean;
	emailOtpStatus: boolean;
	phoneOtpStatus: boolean;
	role: AccountRole | null;
}

export interface RegisterProps {
	email: string;
	password: string;
}

export interface VerifyAccountProps {
	emailOrPhoneNumber: string;
	otp: string;
}

export interface ResetPasswordData {
	resetPasswordToken: string;
	newPassword: string;
}

export interface ChangePasswordProps {
	newPassword: string;
	oldPassword: string;
}

export interface ConfirmChangePasswordProps {
	otp: string;
}

export interface VerifyPhoneNumberProps {
	otp: string;
}

export default class IdentityService {
	constructor(
		private apiService: ApiService,
		private storageService: StorageService
	) {}

	async register(registerData: RegisterProps) {
		const response = await this.apiService.request({
			method: HttpMethod.POST,
			payload: registerData,
			url: `${Base}/email/register`,
		});
		const {
			data: { data: registerResponse },
		} = response;
		this.storageService.saveRegistrationData({
			email: registerResponse.email,
			emailConfirmationOtpExpiringTime:
				registerResponse.emailConfirmationOtpExpiringTime,
			uid: registerResponse.id,
		});
		return response;
	}

	async resendOtp(resendOtpData: ResendOtpProps) {
		const response = await this.apiService.request({
			method: HttpMethod.GET,
			payload: resendOtpData,
			url: `users/${resendOtpData.identifier}/otp/resend`,
		});
		storageService.set(
			"emailConfirmationOtpExpiringTime",
			response.data.data?.emailConfirmationOtpExpiringTime
		);
		return response;
	}

	async resendLoginOtp(resendLoginData: ResendOtpProps) {
		const response = await this.apiService
			.request({
				method: HttpMethod.GET,
				url: `${Base}/${resendLoginData.identifier}/resend-login-otp`,
			})
			.then((res) => res.data);
		this.storageService.set("otpExpiration", response.data.otpExpiration);
		return response;
	}

	async login(loginData: LoginDataProps) {
		this.storageService.clearAuthData();
		const response = await this.apiService
			.request({
				method: HttpMethod.POST,
				payload: loginData,
				url: `${Base}/login`,
			})
			.then((res) => res.data);
		this.storageService.set("otpExpiration", response.data.otpExpiration);
		return response;
	}

	async logout() {
		this.storageService.remove("access_token");
	}

	async verifyAccount(verifyAccountData: VerifyAccountProps) {
		return await this.apiService.request({
			method: HttpMethod.POST,
			payload: verifyAccountData,
			url: `users/otp/verification`,
		});
	}

	async isAuthenticated() {
		const authData = this.storageService.getAuthData();
		if (!authData.access_token) {
			return false;
		}
		try {
			const { data } = await this.apiService.request({
				method: HttpMethod.GET,
				url: `${Base}/me`,
			});
			return data.data;
		} catch (e) {
			return false;
		}
	}

	async auth() {
		return await this.apiService.request({
			method: HttpMethod.GET,
			url: `${Base}/me`,
		});
	}

	async resetPassword(resetPasswordData: ResetPasswordData) {
		return await this.apiService
			.request({
				method: HttpMethod.POST,
				url: `${Base}/reset-password`,
				payload: resetPasswordData,
			})
			.then((response) => response.data);
	}

	async forgotPassword(forgotPasswordData: ForgotPasswordProps) {
		return await this.apiService.request({
			method: HttpMethod.POST,
			url: `${Base}/forgot-password`,
			payload: forgotPasswordData,
		});
	}

	async changePassword(changePasswordData: ChangePasswordProps) {
		return this.apiService.request({
			method: HttpMethod.POST,
			url: `users/change-password`,
			payload: changePasswordData,
		});
	}

	async confirmChangePassword(
		confirmChangePasswordData: ConfirmChangePasswordProps
	) {
		return this.apiService.request({
			method: HttpMethod.POST,
			url: `users/confirm/change-password`,
			payload: confirmChangePasswordData,
		});
	}

	async getAllSettings() {
		return this.apiService.request({
			method: HttpMethod.GET,
			url: `users/setting/all`,
		});
	}

	async getLoginActivities() {
		const { uid } = this.storageService.getAuthData();
		return this.apiService.request({
			method: HttpMethod.GET,
			url: `users/log/loginActivities/${uid}`,
		});
	}

	async toggleSmsAuth() {
		return this.apiService.request({
			method: HttpMethod.GET,
			url: `users/settings/toggle-use-sms-auth`,
		});
	}

	async toggleEmailAuth() {
		return this.apiService.request({
			method: HttpMethod.GET,
			url: `users/settings/toggle-use-email-auth`,
		});
	}

	async sendPhoneVerificationOtp(
		sendPhoneVerificationOtpData: SendPhoneVerificationOtpProps
	) {
		return this.apiService.request({
			method: HttpMethod.POST,
			url: `users/settings/send-phone-verification-otp`,
			payload: sendPhoneVerificationOtpData,
		});
	}

	async verifyPhoneNumber(verifyPhoneNumberData: VerifyPhoneNumberProps) {
		return this.apiService.request({
			method: HttpMethod.POST,
			url: `users/settings/verify-phone-otp`,
			payload: verifyPhoneNumberData,
		});
	}

	async verifyLogin(verifyLoginData: VerifyLoginDataProps) {
		const { data: responseData } = await this.apiService
			.request({
				method: HttpMethod.POST,
				url: `${Base}/login/verify-otp`,
				payload: verifyLoginData,
			})
			.then((response) => response.data);
		const tempDate = new Date(new Date().getTime() + 10 * 60 * 60 * 1000);
		this.storageService.saveAuthData({
			access_token: responseData.token.access_token,
			expires_in: tempDate,
		});
		if (responseData.token.access_token) {
			const { data: authResponse }: { data: UserData } = await this.auth().then(
				(response) => response.data
			);
			this.storageService.saveAuthData({
				uid: authResponse.id,
				access_token: responseData.token.access_token,
				expires_in: tempDate,
			});
			return { responseData, authResponse };
		}
	}
}
