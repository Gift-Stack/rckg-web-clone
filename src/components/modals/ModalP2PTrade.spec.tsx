import { screen } from "@testing-library/react";

import ModalP2PConfirmTrade from "./ModalP2PTrade";
import customRender from "../../../__mocks__/customRender";

describe("Modal Confirm P2P Order", () => {
	it("renders properly", async () => {
		customRender(<ModalP2PConfirmTrade />, {
			modal: { MODAL_TYPE: "CONFIRM_P2P_TRADE" },
		});

		const confirmModal = screen.getByTestId("rg-modal-confirm-order");

		expect(confirmModal).toBeInTheDocument();
		expect(confirmModal.children.length).toEqual(5);
	});
});
