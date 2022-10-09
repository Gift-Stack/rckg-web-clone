import Axios from "axios";
import BaseHTTPService, { HttpMethod } from "./baseHTTPService";

class CountryService extends BaseHTTPService {
	constructor(baseURL: string | undefined) {
		super(
			Axios.create({
				baseURL,
			})
		);
	}

	async getCountries() {
		return await this.request({
			method: HttpMethod.GET,
			url: "countries/info?returns=currency,flag,unicodeFlag,dialCode,cities",
		});
	}
}

export default CountryService;
