import { render, screen } from "@testing-library/react";
import Index from "./index";
import { FAQData } from "./data";

describe("FAQ", () => {
	it("renders FAQ Section components Properly", async () => {
		render(<Index FAQS={FAQData} />);

		const P2PFAQ = await screen.getByTestId("rg-P2PFAQ");
		expect(P2PFAQ.className).toContain("justify-center");
		expect(P2PFAQ.textContent).toContain("Frequently Asked Questions");

		const P2PFAQItem = await screen.getAllByTestId("rg-P2PFAQItem");
		expect(P2PFAQItem.length).toBe(12);
	});
});
