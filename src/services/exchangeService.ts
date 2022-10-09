import ApiService from "./axios";
import { HttpMethod } from "./baseHTTPService";

export default class ExchangeService {
	constructor(private apiService: ApiService) {}

	async postSpotTrade(id: string, values: any) {
		return await this.apiService.request({
			method: HttpMethod.POST,
			url: `/spot-trade/new-order/${id}`,
			payload: values,
		});
	}

	async getTradeHistory(id: string) {
		return await this.apiService.request({
			method: HttpMethod.GET,
			url: `/spot-trade/trade-history/${id}`,
		});
	}

	async getOrderHistory(id: string) {
		return await this.apiService.request({
			method: HttpMethod.GET,
			url: `/spot-trade/order-history/${id}`,
		});
	}

	async getCoinPairRate(symbol: string) {
		return await this.apiService.request({
			method: HttpMethod.GET,
			url: `/price_data/symbol_price?symbol=${symbol}`,
		});
	}

	async getOpenOrders(id: string, symbol: string) {
		return await this.apiService.request({
			method: HttpMethod.GET,
			url: `/spot-trade/open-orders/${id}?symbol=${symbol}`,
		});
	}

	async cancelOpenOrder(id: string, symbol: string, orderId: string) {
		return await this.apiService.request({
			method: HttpMethod.POST,
			url: `/spot-trade/cancel-order/${id}?symbol=${symbol}&orderId=${orderId}`,
		});
	}

	async cancelAllOpenOrder(id: string, symbol: string) {
		return await this.apiService.request({
			method: HttpMethod.POST,
			url: `/spot-trade/cancel-all-open-orders/${id}?symbol=${symbol}`,
		});
	}

	async getStepSize(symbol: string) {
		return await this.apiService.request({
			method: HttpMethod.GET,
			url: `/supportedCryptoCurrency/exchangeInfo?symbols=${symbol}`,
		});
	}

	async getSymbolTickers() {
		return await this.apiService.request({
			method: HttpMethod.GET,
			url: `/price_data/mini_tickers_obj`,
		});
	}

	async getWalletBalance(id: string) {
		return await this.apiService.request({
			method: HttpMethod.GET,
			url: `/wallets/variousAssetsBalance/${id}`,
		});
	}
}
