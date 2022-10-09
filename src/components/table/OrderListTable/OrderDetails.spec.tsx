import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { orders } from "./data";
import OrderDetails from "./OrderDetails";

describe("OrderDetails", () => {
	it("renders properly", async () => {
		const handleParty = jest.fn();
		const handleAction = jest.fn();
		render(
			<OrderDetails
				order={orders[0]}
				party={(value) => handleParty(value)}
				action={(type, value) => handleAction(type, value)}
			/>
		);

		const container = screen.getByTestId("rg-order-details");
		const party = screen.getByTestId("rg-order-details-party");
		const actions = screen.getAllByTestId("rg-order-details-action");
		expect(container).toBeInTheDocument();
		expect(container.children).toHaveLength(7);
		act(() => {
			fireEvent.click(party);
			fireEvent.click(actions[0]);
			fireEvent.click(actions[1]);
		});
		expect(handleParty).toHaveBeenCalled();
		expect(handleAction).toHaveBeenCalled();
	});
});
