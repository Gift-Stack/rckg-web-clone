import { screen, render } from "@testing-library/react";

import ModalWalletTransactionHistoryFilter from "./ModalWalletTransactionHistoryFilter";
import customRender from "../../../__mocks__/customRender";
import { ButtonState } from "../button/enum";

jest.mock("next/router", () => ({
	useRouter() {
		return {
			route: "",
			pathname: "",
			query: "",
			asPath: "",
		};
	},
}));

const useRouter = jest.spyOn(require("next/router"), "useRouter");
describe("ModalWalletTransactionHistoryFilter", () => {
	useRouter.mockImplementation(() => ({
		route: "/wallet/transaction-history",
		pathname: "/wallet/transaction-history",
	}));
	it("renders properly", async () => {
		customRender(<ModalWalletTransactionHistoryFilter />, {
			modal: { modalType: "WALLET_TRANSACTION_HISTORY_FILTER" },
		});
		const modal = await screen.findByTestId(
			"rg-mobile-transaction-history-table-filter"
		);
		const button = await screen.findByTestId("rg-button");
		expect(button.className).toContain(ButtonState.TERTIARY);
		expect(modal.textContent).toContain("Filter");
		expect(modal.textContent).toContain("Type");
		expect(modal.textContent).toContain("Time");
		expect(modal.textContent).toContain("Asset");
		expect(modal.textContent).toContain("Status");
		expect(modal.textContent).toContain("TxID");
	});
});
