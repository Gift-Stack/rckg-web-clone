import ApiService from "./axios";
import { HttpError, HttpMethod } from "./baseHTTPService";
import { mockClient } from "../../__mocks__/axios";
import { _getTokenFromStorage } from "../utils";
import { routerService } from "./index";

let baseURI = `https://www.google.com`;

jest.mock("axios");
let token = jest.fn(_getTokenFromStorage);

describe("Axios service", () => {
	it.todo("Axios service");
	// test("should throw for failed request and empty response", async () => {
	//     const service = new ApiService(baseURI, routerService);
	//     mockClient.request = jest.fn().mockRejectedValueOnce({
	//         response: {
	//             status: 400,
	//             data: {error: true},
	//         },
	//     })
	//     let data: any = {name: "test"}
	//     const catchFn = jest.fn();
	//     await service.request({method: HttpMethod.POST, url: "/dev", payload: data}).catch(catchFn)
	//     expect(catchFn).toHaveBeenCalledWith(new HttpError(400, {error: true}));
	// });
	// test("should not throw error for success request", async () => {
	//     const service = new ApiService(baseURI, routerService);
	//     mockClient.request = jest.fn().mockResolvedValueOnce({data: {error: false}})
	//     let data: any = {name: "test"}
	//     const thenFn = jest.fn();
	//     const catchFn = jest.fn()
	//     await service.request({method: HttpMethod.POST, url: "/dev", payload: data}).then(thenFn).catch(catchFn)
	//     expect(catchFn).not.toHaveBeenCalled();
	//     expect(thenFn).toHaveBeenCalled()
	// });
	// test("should throw a 401 if not authenticated or access token expired", async () => {
	//     const service = new ApiService(baseURI, routerService);
	//     mockClient.request = jest.fn().mockRejectedValueOnce({
	//         response: {
	//             status: 401,
	//             data: {error: true},
	//         },
	//     })
	//     const catchFn = jest.fn()
	//     await service.request({method: HttpMethod.GET, url: "/dev"}).catch(catchFn)
	//     expect(catchFn).toHaveBeenCalledWith(new HttpError(401, {error: true}));
	// })
	// it("API request should add authorization token to header", async () => {
	//     const service = new ApiService(baseURI, routerService)
	//     mockClient.request = jest.fn().mockRejectedValueOnce({
	//         response: {
	//             status: 401,
	//             data: {error: true},
	//         },
	//     })
	//     const catchFn = jest.fn()
	//     const result = mockClient.interceptors.request.use;
	//     await service.request({
	//         method: HttpMethod.GET,
	//         url: "/dev",
	//         payload: {}
	//     }).catch(catchFn)
	//     expect(result.mock.calls.length).toBe(7);
	// });
});
