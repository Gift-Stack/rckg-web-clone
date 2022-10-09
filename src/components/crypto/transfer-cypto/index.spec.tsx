import { screen } from "@testing-library/react";
import customRender from "../../../../__mocks__/customRender";
import TransferCrypto from "./index";

describe("TransferCrypto", () => {
	it("should render", () => {
		customRender(<TransferCrypto />, { cryptoTransactions: {} });
		expect(screen.getByTestId("transfer-crypto-container")).toBeInTheDocument();
	});
});
