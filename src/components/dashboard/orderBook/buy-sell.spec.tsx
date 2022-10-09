import { render, screen } from "@testing-library/react";
import BuySell from "./buy-sell";
import { Record } from "./model";

const records: Record[] = [
	{ id: 1, price: 37132.73, amount: 0.024171, total: 897.53522, type: "buy" },
	{ id: 2, price: 37132.73, amount: 0.024171, total: 897.53522, type: "sell" },
	{ id: 3, price: 37132.73, amount: 0.049, total: 897.53522, type: "sell" },
	{
		id: 4,
		price: 37132.73,
		amount: 0.024171,
		total: 110062.89601,
		type: "buy",
	},
	{ id: 5, price: 37132.73, amount: 0.024171, total: 897.53522, type: "sell" },
	{ id: 6, price: 37132.73, amount: 0.024171, total: 27974.2648, type: "buy" },
];

describe("OrderBookBuy", () => {
	it.todo("OrderbookBuy");
	// it("renders Order Book Buy-Sell components Properly", async () => {
	// 	render(<BuySell records={records} show={false} />);
	// });
	// it("renders Order Book Buy-Sell components on Show = True", async () => {
	// 	render(<BuySell records={records} show={true} />);
	//     const OrderBookBuySell = await screen.getByTestId("rg-OrderBookBuySell");
	//     expect(OrderBookBuySell.className).toContain("bg-lightGrey");
	//     expect(OrderBookBuySell.className).toContain("rounded");
	// 	expect(OrderBookBuySell.textContent).toContain("Price");
	// 	expect(OrderBookBuySell.textContent).toContain("Amount");
	// 	expect(OrderBookBuySell.textContent).toContain("Total");
	// 	const OrderBookItem = await screen.getAllByTestId("rg-OrderBookItem");
	// 	expect(OrderBookItem.length).toBe(6);
	// });
});
