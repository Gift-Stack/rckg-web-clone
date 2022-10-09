import { render, screen } from "@testing-library/react";
import PageSize from "./PageSize";

describe("PageSize", () => {
	it("renders properly", async () => {
		render(<PageSize start={1} end={10} length={52} />);

		const size = screen.getByTestId("rg-table-page-size");
		expect(size.children.length).toBe(1);
		expect(size.innerHTML).toContain("1");
		expect(size.innerHTML).toContain("10");
		expect(size.innerHTML).toContain("52");
		expect(size.innerHTML).toContain("Showing");
		expect(size.innerHTML).toContain("to");
		expect(size.innerHTML).toContain("of");
		expect(size.innerHTML).toContain("results");
	});
});
