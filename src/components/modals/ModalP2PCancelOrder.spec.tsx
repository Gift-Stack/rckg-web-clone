import { screen } from "@testing-library/react";

import ModalP2PCancelOrder from "./ModalP2PCancelOrder";
import customRender from "../../../__mocks__/customRender";

describe("Modal P2P Cancel Order", () => {
	it("renders properly", async () => {
		customRender(<ModalP2PCancelOrder />, {
			modal: { modalType: "CANCEL_P2P_ORDER" },
		});

		const cancelModal = screen.getByTestId("rg-modal-cancel-order");

		expect(cancelModal).toBeInTheDocument();
		expect(cancelModal.children.length).toEqual(2);
	});
});
