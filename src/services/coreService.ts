import ApiService from "./axios";
import StorageService from "./storageService";
import { HttpMethod } from "./baseHTTPService";

export interface updateProfileDataProps {
	firstName: string;
	lastName: string;
	middleName: string;
	dateOfBirth: Date;
	address: string;
	country: string;
	state: string;
	city: string;
	postalCode?: string;
}

export default class CoreService {
	constructor(
		private apiService: ApiService,
		private storageService: StorageService
	) {}

	async fetchProfile() {
		const { uid } = this.storageService.getAuthData();
		return this.apiService.request({
			method: HttpMethod.GET,
			url: `users-profile/${uid}`,
		});
	}

	async updateProfile(updateProfileData: updateProfileDataProps) {
		const { uid } = this.storageService.getAuthData();
		return this.apiService.request({
			method: HttpMethod.PUT,
			url: `users-profile/kyc?userId=${uid}`,
			payload: updateProfileData,
		});
	}

	async getKYCStages() {
		return this.apiService
			.request({
				method: HttpMethod.GET,
				url: `kyc-stage`,
			})
			.then((response) => response.data);
	}

	async createKycStage(stageId: string) {
		const { uid } = this.storageService.getAuthData();
		return this.apiService
			.request({
				method: HttpMethod.POST,
				url: `users-kyc?userId=${uid}`,
				payload: { kycStageId: stageId },
			})
			.then((response) => response.data);
	}

	async documentInit(documentType: string) {
		const { uid } = this.storageService.getAuthData();
		return this.apiService
			.request({
				method: HttpMethod.POST,
				url: `user-kyc-requirements/document/init?userId=${uid}`,
				payload: { documentType },
			})
			.then((response) => response.data);
	}
}
