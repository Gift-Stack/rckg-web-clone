import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { orders } from "./data";
import MobileOrderListTable from "./MobileOrderListTable";

describe("MobileOrderListTable", () => {
	it("renders properly", async () => {
		const handleCopyAddress = jest.fn();
		const handleParty = jest.fn();
		const handleAction = jest.fn();
		render(
			<MobileOrderListTable
				allOrders={orders}
				handleCopyAddress={(value) => handleCopyAddress(value)}
				handleParty={(value) => handleParty(value)}
				handleAction={(type, value) => handleAction(type, value)}
			/>
		);

		const container = screen.getByTestId("rg-order-list-component");
		const copies = screen.getAllByTestId("rg-mobile-order-component-copy");
		const parties = screen.getAllByTestId("rg-mobile-order-component-party");
		const contacts = screen.getAllByTestId("rg-mobile-order-component-contact");
		const pagination = screen.getByTestId("rg-mobile-table-pagination");
		expect(container).toBeInTheDocument();
		expect(container.children).toHaveLength(7);
		act(() => {
			fireEvent.click(copies[0]);
			fireEvent.click(parties[0]);
			fireEvent.click(contacts[0]);
		});
		expect(handleCopyAddress).toHaveBeenCalled();
		expect(handleParty).toHaveBeenCalled();
		expect(handleAction).toHaveBeenCalled();
		expect(pagination).toBeInTheDocument();
	});
});
