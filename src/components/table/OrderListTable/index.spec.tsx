import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import OrderListTable from ".";
import { orders } from "./data";

describe("OrderListTable", () => {
	it("renders properly", async () => {
		const handleCopyAddress = jest.fn();
		const handleParty = jest.fn();
		const handleAction = jest.fn();
		const setCoin = jest.fn();
		const setOrderType = jest.fn();
		const setStatus = jest.fn();
		render(
			<OrderListTable
				allOrders={orders.length ? orders : []}
				handleCopyAddress={(value) => handleCopyAddress(value)}
				handleParty={(value) => handleParty(value)}
				handleAction={(type, value) => handleAction(type, value)}
				setCoin={setCoin}
				setOrderType={setOrderType}
				setStatus={setStatus}
			/>
		);

		const container = screen.getByTestId("rg-order-list-table-component");
		const copies = screen.getAllByTestId("rg-order-type-address-copy");
		const parties = screen.getAllByTestId("rg-order-details-party");
		const actions = screen.getAllByTestId("rg-order-details-action");
		expect(container).toBeInTheDocument();
		expect(container.children).toHaveLength(9);
		act(() => {
			fireEvent.click(copies[0]);
			fireEvent.click(parties[0]);
			fireEvent.click(actions[0]);
		});
		expect(handleCopyAddress).toHaveBeenCalled();
		expect(handleParty).toHaveBeenCalled();
		expect(handleAction).toHaveBeenCalled();
	});
});
