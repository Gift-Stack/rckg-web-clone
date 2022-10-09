import axios, { AxiosRequestConfig } from "axios";
import { _getTokenFromStorage } from "../utils";
import BaseHTTPService, {
	HttpError,
	HttpStatus,
	RequestProps,
} from "./baseHTTPService";
import RouterService from "./routerService";

class ApiService extends BaseHTTPService {
	constructor(
		baseUrl: string | undefined,
		private routerService: RouterService
	) {
		super(
			axios.create({
				baseURL: baseUrl,
				withCredentials: false,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Methods": "*",
					"Access-Control-Allow-Origin": baseUrl,
				},
			})
		);
		this.service.interceptors.request.use((config: AxiosRequestConfig) => {
			const token = _getTokenFromStorage("access_token");
			if (!token) return config;

			config.headers["Authorization"] = "Bearer " + token;
			return config;
		});
	}

	async request(requestProps: RequestProps): Promise<any> {
		try {
			return await super.request(requestProps);
		} catch (e) {
			const httpError = e as HttpError;
			switch (httpError.getStatusCode()) {
				case HttpStatus.Forbidden:
					return this.routerService.navigate("/");
				case HttpStatus.Unauthorized:
					throw httpError;
					return this.routerService.navigate("/");
				default:
					throw httpError;
			}
		}
	}
}

export default ApiService;
