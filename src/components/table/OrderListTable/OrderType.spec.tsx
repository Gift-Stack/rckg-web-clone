import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { orders } from "./data";
import OrderType from "./OrderType";

describe("OrderType", () => {
	it("renders properly", async () => {
		const handleCopy = jest.fn();
		render(
			<OrderType
				type={orders[0].type}
				date={orders[0].date}
				address={orders[0].address}
				copyAddress={(value) => handleCopy(value)}
			/>
		);

		const container = screen.getByTestId("rg-order-type");
		const copy = screen.getByTestId("rg-order-type-address-copy");
		expect(container).toBeInTheDocument();
		expect(container.innerHTML).toContain("text-deepGreen");
		expect(container.innerHTML).toContain("Buy");
		expect(container.children.length).toBe(2);
		act(() => {
			fireEvent.click(copy);
		});
		expect(handleCopy).toHaveBeenCalled();
	});

	it("renders Order Type for SELL", async () => {
		const handleCopy = jest.fn();
		render(
			<OrderType
				type={orders[1].type}
				date={orders[1].date}
				address={orders[1].address}
				copyAddress={(value) => handleCopy(value)}
			/>
		);

		const container = screen.getByTestId("rg-order-type");
		expect(container.innerHTML).toContain("text-error-400");
		expect(container.innerHTML).toContain("Sell");
	});
});
