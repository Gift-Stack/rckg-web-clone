import axios from "axios";

export const mockRequestFn = jest.fn();

export default class BaseHTTPServiceMock {
	request = mockRequestFn;
	protected service = axios.create();
}
