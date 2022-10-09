import { render, screen } from "@testing-library/react";
import { footerRowsData } from "./data";
import FooterRow from "./FooterRow";

describe("FooterRow", () => {
	it("should render properly", async () => {
		render(<FooterRow row={footerRowsData[0]} />);

		const row = screen.getByTestId("rg-footer-row");
		expect(row.children.length).toEqual(6);
		expect(row.innerHTML).toContain("Rocket Global");
		expect(row.innerHTML).toContain("Pricing");
	});
});
