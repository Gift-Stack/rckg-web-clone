import { render, screen } from "@testing-library/react";
import Item from "./item";
import { Record } from "./model";

const record: Record = {
	id: 1,
	price: 37132.73,
	amount: 0.024171,
	total: 897.53522,
	type: "buy",
};
const recordSell: Record = {
	id: 1,
	price: 37132.73,
	amount: 0.024171,
	total: 897.53522,
	type: "sell",
};

describe("OrderBookItems", () => {
	it.todo("OrderBookItems");
	// it("renders Order Book Item components Properly", async () => {
	// 	render(<Item data={record} />);
	// 	const OrderBookItem = await screen.getByTestId("rg-OrderBookItem");
	// 	// expect(OrderBookItem.className).toContain("flex-row");
	// 	// expect(OrderBookItem.className).toContain("text-labels");
	// 	// expect(OrderBookItem.className).toContain("font-medium");
	// 	// expect(OrderBookItem.className).toContain("text-neutral-400");
	// 	// expect(OrderBookItem.textContent).toContain("37,132.73");
	// 	// expect(OrderBookItem.textContent).toContain("0.024171");
	// 	// expect(OrderBookItem.textContent).toContain("897.5352");
	// });
	// it("component is a buy", async () => {
	// 	render(<Item data={record} />);
	// 	const OrderBookInnerItem = await screen.getByTestId(
	// 		"rg-OrderBookInnerItem"
	// 	);
	// 	expect(OrderBookInnerItem.className).toContain("text-deepGree");
	// 	expect(OrderBookInnerItem.className).not.toContain("text-red-500");
	// });
	// it("component is a sell", async () => {
	// 	render(<Item data={recordSell} />);
	// 	const OrderBookInnerItem = await screen.getByTestId(
	// 		"rg-OrderBookInnerItem"
	// 	);
	// 	expect(OrderBookInnerItem.className).toContain("text-red-500");
	// 	expect(OrderBookInnerItem.className).not.toContain("text-deepGree");
	// });
});
