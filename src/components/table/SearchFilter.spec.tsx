import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import SearchFilter from "./SearchFilter";

describe("SearchFilter", () => {
	it("renders properly", async () => {
		const handleSearch = jest.fn();
		render(
			<SearchFilter
				placeholder={"Search for Cryptocurrency"}
				handleSearch={handleSearch}
			/>
		);

		const search = screen.getByTestId("rg-search-filter");
		const search_input = screen.getByTestId("rg-search-filter-input");
		act(() => {
			fireEvent.change(search_input, { target: { value: "Coin" } });
		});
		expect(search).toBeInTheDocument();
		expect(search.children.length).toBe(2);
		expect(search.className).toContain(
			"sm:grid border border-neutral-150 rounded relative text-gray-600 w-full md:w-2/5 xl:w-1/5"
		);
		expect(search_input).toHaveProperty("value", "Coin");
		expect(search_input).toHaveProperty(
			"placeholder",
			"Search for Cryptocurrency"
		);
		expect(handleSearch).toHaveBeenCalled();
	});
});
