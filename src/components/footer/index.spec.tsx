import { render, screen } from "@testing-library/react";
import Footer from ".";
import { footerRowsData } from "./data";

describe("Footer", () => {
	it("should render properly", async () => {
		render(<Footer rows={footerRowsData} />);

		const footer = screen.getByTestId("rg-footer");
		// const row = screen.getAllByTestId("rg-footer-row");
		// const social = screen.getByTestId("rg-footer-social");

		expect(footer).toBeInTheDocument();
		// expect(footer.children.length).toEqual(2);
		// expect(social.children.length).toEqual(4);
		// expect(row.length).toEqual(5);
		// expect(footer.innerHTML).toContain(
		// 	"© 2020 Rocket Global. All rights reserved."
		// );
	});
});
