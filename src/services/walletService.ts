import ApiService from "./axios";
import StorageService from "./storageService";
import { HttpMethod } from "./baseHTTPService";

export interface ICoinPairRateTable {
	baseAsset: string;
	quoteAsset: string;
}

export default class WalletService {
	constructor(
		private apiService: ApiService,
		private storageService: StorageService
	) {}

	async fetchWalletAssetsBalance() {
		const { uid } = this.storageService.getAuthData();
		return this.apiService.request({
			method: HttpMethod.GET,
			url: `wallets/variousAssetsBalance/${uid}?includeEmptyBalances=true`,
		});
	}
	async totalAssetsBalanceBTC() {
		const { uid } = this.storageService.getAuthData();
		return this.apiService.request({
			method: HttpMethod.GET,
			url: `wallets/totalAssetOfBtc/${uid}`,
		});
	}
	async getBTCUSDTRate() {
		const { uid } = this.storageService.getAuthData();
		return this.apiService.request({
			method: HttpMethod.GET,
			url: `price_data/symbol_price?symbol=BTCUSDT`,
		});
	}
	async getCoinPairRate(data: ICoinPairRateTable) {
		return this.apiService.request({
			method: HttpMethod.GET,
			url: `price_data/symbol_price?symbol=${data.baseAsset}${data.quoteAsset}`,
		});
	}
}
