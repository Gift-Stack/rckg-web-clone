import { render, screen } from "@testing-library/react";
import Sell from "./sell";
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

describe("OrderBookSell", () => {
	it.todo("OrderBookSell");
	// it("renders Order Book Sell components Properly", async () => {
	// 	render(<Sell records={records} show={false} />);
	// });
	// it("renders Order Book Sell components on Show = True", async () => {
	// 	render(<Sell records={records} show={true} />);
	// 	const OrderBookItem = await screen.getAllByTestId("rg-OrderBookItem");
	// 	expect(OrderBookItem.length).toBe(3);
	// });
});
