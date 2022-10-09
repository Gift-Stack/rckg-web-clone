import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { TableFilterState } from "./enum";
import TableFilter from "./TableFilter";

describe("TableFilter", () => {
	it("renders properly", async () => {
		const handleClick = jest.fn();
		render(<TableFilter actionClick={handleClick} value={"Favourites"} />);

		const filter = screen.getByTestId("rg-table-filter");
		act(() => {
			fireEvent.click(filter);
		});
		expect(filter).toBeInTheDocument();
		expect(filter.innerHTML).toContain("Favourites");
		expect(filter.className).toContain(TableFilterState.PRIMARY);
		expect(filter.className).not.toContain(TableFilterState.SECONDARY);
		expect(filter.className).not.toContain(TableFilterState.TERTIARY);
		expect(handleClick).toHaveBeenCalled();
	});

	it("has secondary style class", async () => {
		const handleClick = jest.fn();
		render(
			<TableFilter
				actionClick={handleClick}
				value={"Favourites"}
				variant={TableFilterState.SECONDARY}
			/>
		);

		const filter = screen.getByTestId("rg-table-filter");
		expect(filter.className).toContain(TableFilterState.SECONDARY);
	});

	it("has tertiary style class", async () => {
		const handleClick = jest.fn();
		render(
			<TableFilter
				actionClick={handleClick}
				value={"Favourites"}
				variant={TableFilterState.TERTIARY}
			/>
		);

		const filter = screen.getByTestId("rg-table-filter");
		expect(filter.className).toContain(TableFilterState.TERTIARY);
	});
});
