import { render, screen } from "@testing-library/react";
import MarketCard from ".";
import { marketData } from "./data";

describe("MarketCard", () => {
	it("renders properly", async () => {
		render(<MarketCard data={marketData} />);

		const marketCard = screen.getByTestId("rg-market-card");
		const card = screen.getAllByTestId("rg-card");

		expect(marketCard).toBeInTheDocument();
		expect(marketCard.children.length).toBe(3);
		expect(marketCard.innerHTML).toContain(card[0].innerHTML);
	});
});
