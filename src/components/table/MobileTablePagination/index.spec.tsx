import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import MobileTablePagination from ".";

describe("MobileTablePagination", () => {
	it("renders properly", async () => {
		const setActiveIndex = jest.fn();
		render(
			<MobileTablePagination
				pages={13}
				_setActiveIndex={(index: number) => setActiveIndex(index)}
			/>
		);

		const pagination = screen.getByTestId("rg-mobile-table-pagination");
		const navs = screen.getAllByTestId("rg-mobile-table-navigation");
		const prev = screen.getByTestId("rg-mobile-table-pagination-prev");
		const next = screen.getByTestId("rg-mobile-table-pagination-next");
		act(() => {
			fireEvent.click(navs[0]);
			fireEvent.click(prev);
			fireEvent.click(next);
		});
		expect(pagination).toBeInTheDocument();
		expect(pagination.className).toContain(
			"bg-white p-2 flex items-center justify-center border-t border-gray-200"
		);
		expect(pagination.children.length).toBe(1);
		expect(setActiveIndex).toHaveBeenCalled();
	});
});
