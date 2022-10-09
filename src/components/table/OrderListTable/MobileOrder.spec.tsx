import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { orders } from "./data";
import MobileOrder from "./MobileOrder";
import { IOrder } from "./model";

describe("MobileOrder", () => {
	it("renders properly", async () => {
		const handleCopyAddress = jest.fn();
		const handleParty = jest.fn();
		const handleAction = jest.fn();
		render(
			<MobileOrder
				handleCopy={(value: string) => handleCopyAddress(value)}
				handleParty={(value: IOrder) => handleParty(value)}
				handleAction={(type: string, value: IOrder) =>
					handleAction(type, value)
				}
				order={orders[0]}
			/>
		);

		const container = screen.getByTestId("rg-mobile-order-component");
		const copy = screen.getByTestId("rg-mobile-order-component-copy");
		const party = screen.getByTestId("rg-mobile-order-component-party");
		const contact = screen.getByTestId("rg-mobile-order-component-contact");
		expect(container).toBeInTheDocument();
		expect(container.innerHTML).toContain("Buy");
		expect(container.innerHTML).toContain("text-deepGreen");
		expect(container.children).toHaveLength(2);
		act(() => {
			fireEvent.click(copy);
			fireEvent.click(party);
			fireEvent.click(contact);
		});
		expect(handleCopyAddress).toHaveBeenCalled();
		expect(handleParty).toHaveBeenCalled();
		expect(handleAction).toHaveBeenCalled();
	});

	it("renders order for SELL", async () => {
		const handleCopyAddress = jest.fn();
		const handleParty = jest.fn();
		const handleAction = jest.fn();
		render(
			<MobileOrder
				handleCopy={(value: string) => handleCopyAddress(value)}
				handleParty={(value: IOrder) => handleParty(value)}
				handleAction={(type: string, value: IOrder) =>
					handleAction(type, value)
				}
				order={orders[1]}
			/>
		);

		const container = screen.getByTestId("rg-mobile-order-component");
		expect(container.innerHTML).toContain("Sell");
		expect(container.innerHTML).toContain("text-error-400");
	});
});
