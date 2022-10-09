import { AxiosInstance, AxiosResponse, AxiosError } from "axios";

export interface Headers {
	[key: string]: string;
}

export interface RequestProps {
	payload?: any;
	url?: string;
	method: HttpMethod;
	headers?: Headers;
}

export enum HttpMethod {
	POST = "POST",
	GET = "GET",
	PUT = "PUT",
	PATCH = "PATCH",
	UNLINK = "UNLINK",
	OPTIONS = "OPTIONS",
}

export enum HttpStatus {
	BadRequest = 400,
	Created = 201,
	Ok = 200,
	Forbidden = 403,
	Unauthorized = 401,
	NotFound = 404,
	Timeout = 100,
}

export class HttpError extends Error {
	constructor(
		private statusCode: HttpStatus,
		private data?: { [key: string]: any }
	) {
		super("Http Error occurred");
	}

	getStatusCode(): HttpStatus {
		return this.statusCode;
	}

	getData(): { [key: string]: any } | undefined {
		return this.data;
	}
}

export default class BaseHTTPService {
	constructor(protected service: AxiosInstance) {}

	async request(request: RequestProps) {
		try {
			const response: AxiosResponse = await this.service.request({
				method: request.method,
				url: request.url,
				responseType: "json",
				data: request.payload,
			});
			return response;
		} catch (err) {
			const axiosError = err as AxiosError;
			console.error("Axios error occurred", axiosError.response);
			if (axiosError.response) {
				throw new HttpError(
					axiosError.response.status as HttpStatus,
					axiosError.response.data
				);
			} else {
				throw new HttpError(HttpStatus.Timeout, {
					message:
						"An error occurred while processing request. Check your internet connection",
				});
			}
		}
	}
}
