import { render, screen } from "@testing-library/react";
import OrderListTableHeader from "./OrderListHeader";

describe("OrderListTableHeader", () => {
	it("renders properly", async () => {
		render(<OrderListTableHeader />);

		const container = screen.getByTestId("rg-order-list-table-header");
		expect(container).toBeInTheDocument();
		expect(container.className).toBe(
			"text-x-small lg:text-labels flex items-center text-gray-deep mt-5 mb-3 xl:px-8 lg:px-4 px-2"
		);
		expect(container.children).toHaveLength(7);
		expect(container.children[0].className).toBe("p8");
		expect(container.children[1].className).toBe("p14");
		expect(container.children[2].className).toBe("p17");
		expect(container.children[3].className).toBe("p13");
		expect(container.children[4].className).toBe("p13");
		expect(container.children[5].className).toBe("p16");
		expect(container.children[6].className).toBe("p19");
	});
});
