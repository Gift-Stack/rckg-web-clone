import ApiService from "./axios";
import StorageService from "./storageService";
import { HttpMethod } from "./baseHTTPService";

export interface crytoWithdrawalDataProps {
	amount: number;
	coin: string;
	address: string;
	network: string;
}
export interface IHistoryTable {
	page: number;
}

export default class WithdrawalService {
	constructor(
		private apiService: ApiService,
		private storageService: StorageService
	) {}

	async fetchCryptoWithdrawalHistory(data: IHistoryTable) {
		const { uid } = this.storageService.getAuthData();
		return this.apiService.request({
			method: HttpMethod.GET,
			url: `crypto-withdrawal/request?userId=${uid}`,
			// url: `crypto-withdrawal/request?userId=${uid}?page=${data.page}&limit=500`,
		});
	}

	async fetchCryptoWithdrawalFee(
		crytoWithdrawalData: crytoWithdrawalDataProps
	) {
		const { uid } = this.storageService.getAuthData();
		return this.apiService.request({
			method: HttpMethod.POST,
			url: `crypto-withdrawal/transaction-fee/${uid}`,
			payload: crytoWithdrawalData,
		});
	}

	async fetchWithdrawalOTP(cryptoWithdrawalOTP: any) {
		const { uid } = this.storageService.getAuthData();
		return this.apiService.request({
			method: HttpMethod.POST,
			url: `transaction-otp?userId=${uid}`,
			payload: cryptoWithdrawalOTP,
		});
	}

	async postCryptoWithdrawal(crytoWithdrawalData: crytoWithdrawalDataProps) {
		const { uid } = this.storageService.getAuthData();
		return this.apiService.request({
			method: HttpMethod.POST,
			url: `crypto-withdrawal/request/${uid}`,
			payload: crytoWithdrawalData,
		});
	}
}
