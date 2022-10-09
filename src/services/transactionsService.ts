import ApiService from "./axios";
import { SwapPayload } from "components/crypto/model";
import BaseHTTPService, { HttpMethod } from "./baseHTTPService";
import StorageService from "./storageService";

export interface IDepositPayload {
	coin: string;
	network?: string;
}

export interface IHistoryTable {
	page: number;
}

export interface IDepositWithDrawalHistoryTable {
	asset?: string;
	page?: string;
	type?: string;
	limit?: string;
	fromDate?: string;
	toDate?: string;
	transactionId?: string;
}

export interface ISwapListPayload {
	coin: string;
}

export default class TransactionsService {
	constructor(
		private apiService: ApiService,
		private storageService: StorageService
	) {}

	async getCoinPairs() {
		return this.apiService.request({
			method: HttpMethod.GET,
			url: `supportedCryptoCurrency/pairs`,
		});
	}
	async getCoins() {
		const uid: boolean | undefined | string =
			this.storageService.getAuthData().uid;
		return this.apiService.request({
			method: HttpMethod.GET,
			url: `deposit/network-list/${uid}`,
			// url: `deposit/network-list/${"fe6ab2bb-a59b-4d18-9654-fe8b636f7aaf"}`,
		});
	}

	async getNetworks(data: IDepositPayload) {
		const uid: boolean | undefined | string =
			this.storageService.getAuthData().uid;
		return this.apiService.request({
			method: HttpMethod.GET,
			url: `deposit/network-list/${uid}?coin=${data.coin}`,
			// url: `deposit/network-list/${"fe6ab2bb-a59b-4d18-9654-fe8b636f7aaf"}?coin=${
			// 	data.coin
			// }`,
		});
	}

	async getDepositAddress(data: IDepositPayload) {
		const uid: boolean | undefined | string =
			this.storageService.getAuthData().uid;
		return this.apiService.request({
			method: HttpMethod.GET,
			url: data.network
				? `deposit/address/${uid}?coin=${data.coin}&network=${data.network}`
				: `deposit/address/${uid}?coin=${data.coin}`,
			// url: data.network
			// 	? `deposit/address/${"fe6ab2bb-a59b-4d18-9654-fe8b636f7aaf"}?coin=${
			// 			data.coin
			// 	  }&network=${data.network}`
			// 	: `deposit/address/${"fe6ab2bb-a59b-4d18-9654-fe8b636f7aaf"}?coin=${
			// 			data.coin
			// 	  }`,
		});
	}

	async getRecentDeposit() {
		const uid: boolean | undefined | string =
			this.storageService.getAuthData().uid;
		return this.apiService.request({
			method: HttpMethod.GET,
			url: `deposit/recent/${uid}`,
		});
	}

	async getDepositHistory(data: IHistoryTable) {
		const uid: boolean | undefined | string =
			this.storageService.getAuthData().uid;
		return this.apiService.request({
			method: HttpMethod.GET,
			url: `deposit/history/${uid}?page=${data.page}`,
			// url: `deposit/history/${"fe6ab2bb-a59b-4d18-9654-fe8b636f7aaf"}?page=${
			// 	data.page
			// }`,
		});
	}

	async getVariousAssetsBalance() {
		const uid: boolean | undefined | string =
			this.storageService.getAuthData().uid;
		return this.apiService.request({
			method: HttpMethod.GET,
			url: `wallets/variousAssetsBalance/${uid}?includeEmptyBalances=true`,
			// url: `wallets/variousAssetsBalance/${"fe6ab2bb-a59b-4d18-9654-fe8b636f7aaf"}`,
		});
	}

	async getSwapList(data: ISwapListPayload) {
		return this.apiService.request({
			method: HttpMethod.GET,
			url: `crypto-swap/swap-list?coin=${data.coin}`,
		});
	}

	async getCryptoSwapFee(data: SwapPayload) {
		const uid: boolean | undefined | string =
			this.storageService.getAuthData().uid;
		return this.apiService.request({
			method: HttpMethod.GET,
			url: `crypto-swap/fee/${uid}?quoteAsset=${data.quoteAsset}&baseAsset=${data.baseAsset}&quoteQty=${data.quoteQty}`,
			// url: `crypto-swap/fee/${"fe6ab2bb-a59b-4d18-9654-fe8b636f7aaf"}?quoteAsset=${
			// 	data.quoteAsset
			// }&baseAsset=${data.baseAsset}&quoteQty=${data.quoteQty}`,
		});
	}

	async swapCypto(data: SwapPayload) {
		const uid: boolean | undefined | string =
			this.storageService.getAuthData().uid;
		return this.apiService.request({
			method: HttpMethod.POST,
			url: `crypto-swap/swap/${uid}`,
			// url: `crypto-swap/swap/${"fe6ab2bb-a59b-4d18-9654-fe8b636f7aaf"}`,
			payload: data,
		});
	}

	async getDepositWithDrawalHistory(data: IDepositWithDrawalHistoryTable) {
		const uid: boolean | undefined | string =
			this.storageService.getAuthData().uid;
		return this.apiService.request({
			method: HttpMethod.GET,
			url: `transactions/depositsAndWithdrawals/?userId=${uid}&type=${
				data.type ? data.type : "all"
			}${data.page ? "&page=" + data.page : ""}${
				data.fromDate ? "&fromDate=" + data.fromDate : ""
			}${data.toDate ? "&toDate=" + data.toDate : ""}
			`,
		});
	}

	// async getCryptoSwapHistory(data: IDepositWithDrawalHistoryTable) {
	// 	const uid: boolean | undefined | string = this.storageService.getAuthData().uid;
	// 	return await this.request({
	// 		method: HttpMethod.GET,
	// 		url: `transactions/crypto-swap?userId=${'fe6ab2bb-a59b-4d18-9654-fe8b636f7aaf'}${data.page ? '&page='+data.page : ''}${data.limit ? '&limit='+data.limit : ''}`,
	// 	});
	// }
	async getCryptoSwapHistory(data: IDepositWithDrawalHistoryTable) {
		const uid: boolean | undefined | string =
			this.storageService.getAuthData().uid;
		return this.apiService.request({
			method: HttpMethod.GET,
			url: `crypto-swap/history/${uid}`,
		});
	}
	async getCoinImage(coin: any) {
		return this.apiService.request({
			method: HttpMethod.GET,
			url: `https://rckg-exchange-staging.rocket.com.ng/api/images?symbols=${coin}`,
		});
	}
}
