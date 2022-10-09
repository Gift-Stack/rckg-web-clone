import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import SingleNav from "./SingleNav";

describe("SingleNav", () => {
	it("renders properly", async () => {
		const nextClick = jest.fn();
		const prevClick = jest.fn();
		render(<SingleNav next={nextClick} prev={prevClick} />);

		const nav = screen.getByTestId("rg-table-single-nav");
		const prev = screen.getByTestId("rg-table-single-nav-prev");
		const next = screen.getByTestId("rg-table-single-nav-next");
		act(() => {
			fireEvent.click(prev);
			fireEvent.click(next);
		});
		expect(nav).toBeInTheDocument();
		expect(nav.children.length).toBe(2);
		expect(nav.innerHTML).toContain("Prev");
		expect(nav.innerHTML).toContain("Next");
		expect(nextClick).toHaveBeenCalled();
		expect(prevClick).toHaveBeenCalled();
	});
});
