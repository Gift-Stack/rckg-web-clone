import Axios from "axios";
import BaseHTTPService, { HttpMethod } from "./baseHTTPService";

class UserIPService extends BaseHTTPService {
	constructor(baseURL: string | undefined) {
		super(
			Axios.create({
				baseURL,
			})
		);
	}

	async getIp(): Promise<any> {
		return await this.request({
			method: HttpMethod.GET,
			url: "json/?key=EdDsnWeFdP77xB1Og2hp",
		});
	}
}

export default UserIPService;
