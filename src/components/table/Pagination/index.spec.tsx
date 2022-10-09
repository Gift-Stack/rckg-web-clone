import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Pagination from ".";

describe("PageSize", () => {
	it("renders properly", async () => {
		const mockHandleExpand = jest.fn();
		const setActiveIndex = jest.fn();
		render(
			<Pagination
				pages={0}
				pageSize={10}
				rowsLength={52}
				expand={true}
				handleExpand={mockHandleExpand}
				_setActiveIndex={(index: number) => setActiveIndex(index)}
				showPageSize={false}
			/>
		);

		const pagination = screen.getByTestId("rg-table-pagination");
		const previous = screen.getByTestId("rg-table-pagination-prev");
		const nexts = screen.getByTestId("rg-table-pagination-next");
		const singleNav = screen.getByTestId("rg-table-single-nav");
		const prev = screen.getByTestId("rg-table-single-nav-prev");
		const next = screen.getByTestId("rg-table-single-nav-next");
		act(() => {
			fireEvent.click(previous);
			fireEvent.click(nexts);
			fireEvent.click(prev);
			fireEvent.click(next);
		});
		expect(pagination).toBeInTheDocument();
		expect(pagination.className).toContain(
			"bg-white px-2 py-3 flex items-center justify-between border-t border-gray-200 sm:px-4"
		);
		expect(singleNav).toBeInTheDocument();
		expect(pagination.children.length).toBe(2);
		expect(setActiveIndex).toHaveBeenCalled();
	});

	it("page size is shown", async () => {
		const setActiveIndex = jest.fn();
		const mockHandleExpand = jest.fn();
		render(
			<Pagination
				pages={0}
				pageSize={10}
				rowsLength={52}
				expand={true}
				handleExpand={mockHandleExpand}
				_setActiveIndex={(index: number) => setActiveIndex(index)}
				showPageSize={true}
			/>
		);

		const pageSize = screen.getByTestId("rg-table-page-size");
		expect(pageSize).toBeInTheDocument();
	});

	it("comes with active index prop", async () => {
		const setActiveIndex = jest.fn();
		const mockHandleExpand = jest.fn();
		render(
			<Pagination
				pages={13}
				pageSize={10}
				rowsLength={52}
				expand={true}
				handleExpand={mockHandleExpand}
				_activeIndex={10}
				_setActiveIndex={(index: number) => setActiveIndex(index)}
				showPageSize={true}
			/>
		);

		const pageSize = screen.getAllByTestId("rg-table-navigation");
		expect(pageSize.length).toBe(5);
	});
});
