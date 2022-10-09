export const mockClient = {
	request: jest.fn(),
	interceptors: {
		response: {
			use: jest.fn(),
		},
		request: {
			handlers: [{ fulfilled: jest.fn() }],
			use: jest.fn(),
		},
	},
};

const axiosMock = {
	create(_: any) {
		return mockClient;
	},
};

export default axiosMock;
