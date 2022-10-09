import { render, screen } from "@testing-library/react";
import Item from "./item";
import { FAQ } from "./model";

const data: FAQ = { id: 1, question: "question?", answer: "answer!" };

describe("P2PFAQItem", () => {
	it("renders Order Book Item components Properly", async () => {
		render(<Item data={data} />);

		const P2PFAQItem = await screen.getByTestId("rg-P2PFAQItem");
		const P2PFAQItemQuestion = await screen.getByTestId(
			"rg-P2PFAQItem-question"
		);
		const P2PFAQItemAnswer = await screen.getByTestId("rg-P2PFAQItem-answer");
		expect(P2PFAQItem.className).toContain("bg-lightBlueBG");
		expect(P2PFAQItem.textContent).toContain("question?");
		expect(P2PFAQItem.textContent).toContain("answer!");
		expect(P2PFAQItemQuestion.className).toContain("font-semibold");
		expect(P2PFAQItemQuestion.className).toContain("text-sm-heading");
		expect(P2PFAQItemAnswer.className).toContain("font-normal");
	});
});
