import { fireEvent, render, screen } from "@testing-library/react";

import ModalInitializeDeposit from "./ModalInitializeDeposit";
import customRender from "../../../__mocks__/customRender";

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
describe("ModalInitializeDeposit", () => {
	useRouter.mockImplementation(() => ({
		route: "/wallet/overview",
		pathname: "/wallet/overview",
	}));
	it("renders properly", async () => {
		customRender(<ModalInitializeDeposit />, {
			modal: { modalType: "DEPOSIT" },
		});

		const depositModal = screen.getByTestId("rg-modal-initialize-deposit");
		const cryptoDeposit = screen.getByTestId(
			"rg-modal-initialize-deposit-cryptoDeposit"
		);
		const fiatDeposit = screen.getByTestId(
			"rg-modal-initialize-deposit-fiatDeposit"
		);
		const buyUsingCard = screen.getByTestId(
			"rg-modal-initialize-deposit-buyUsingCard"
		);
		const buyUsingP2P = screen.getByTestId(
			"rg-modal-initialize-deposit-buyUsingP2P"
		);
		fireEvent.click(cryptoDeposit);
		fireEvent.click(fiatDeposit);
		fireEvent.click(buyUsingCard);
		fireEvent.click(buyUsingP2P);

		expect(depositModal).toBeInTheDocument();
		expect(depositModal.children.length).toBe(5);
		expect(depositModal.innerHTML).toContain(
			"flex flex-col justify-center items-center px-9 pb-8"
		);
		expect(depositModal.innerHTML).toContain("cursor-pointer");
	});
});
