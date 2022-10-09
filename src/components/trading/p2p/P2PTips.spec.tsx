import { render, screen } from "@testing-library/react";
import P2PTips from "./P2PTips";

describe("P2PTips", () => {
	beforeEach(() => {
		render(<P2PTips />);
	});
	it("should render correctly", () => {
		const container = screen.getByTestId("rg-p2p-tips-container");
		expect(container).toBeInTheDocument();
	});
	it("should render header correctly", () => {
		const headingEl = screen.getByTestId("rg-p2p-tips-header");
		expect(headingEl.innerHTML).toContain("Tips");
	});
});
