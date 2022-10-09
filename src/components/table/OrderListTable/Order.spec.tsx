import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { orders } from "./data";
import { IOrder } from "./model";
import Order from "./Order";

describe("Order", () => {
	it("renders properly", async () => {
		const handleCopyAddress = jest.fn();
		const handleParty = jest.fn();
		const handleAction = jest.fn();
		render(
			<Order
				handleCopy={(value: string) => handleCopyAddress(value)}
				handleParty={(value: IOrder) => handleParty(value)}
				handleAction={(type: string, value: IOrder) =>
					handleAction(type, value)
				}
				key={orders[0].id}
				order={orders[0]}
			/>
		);

		const container = screen.getByTestId("rg-order-component");
		const copy = screen.getByTestId("rg-order-type-address-copy");
		const party = screen.getByTestId("rg-order-details-party");
		const actions = screen.getAllByTestId("rg-order-details-action");
		expect(container).toBeInTheDocument();
		expect(container.children).toHaveLength(2);
		act(() => {
			fireEvent.click(copy);
			fireEvent.click(party);
			fireEvent.click(actions[0]);
			fireEvent.click(actions[1]);
		});
		expect(handleCopyAddress).toHaveBeenCalled();
		expect(handleParty).toHaveBeenCalled();
		expect(handleAction).toHaveBeenCalled();
	});
});
