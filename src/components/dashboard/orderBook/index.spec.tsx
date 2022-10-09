import { render, fireEvent, screen } from "@testing-library/react";
import OrderBook from "./";
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

describe("OrderBook", () => {
	it.todo("OrderBook");

	// it("renders Order Book component Properly", async () => {
	// 	const handleClose = jest.fn();
	// 	render(
	// 		<OrderBook
	// 			records={records}
	// 			onClose={handleClose}
	// 			baseCoin={""}
	// 			quoteCoin={""}
	// 		/>
	// 	);
	// 	let select = await screen.getByTestId("rg-orderBook-select");
	// 	let options = await screen.getAllByTestId("rg-orderBook-select-option");
	// 	expect(select.className).toContain("text-neutral-500");
	// 	expect(select.className).toContain("bg-transparent");
	// 	expect(options.length).toBe(3);
	// 	expect((options[0] as HTMLOptionElement).selected).toBeTruthy();
	// 	expect((options[1] as HTMLOptionElement).selected).toBeFalsy();
	// 	expect((options[2] as HTMLOptionElement).selected).toBeFalsy();
	// });
	// it("checks Order Book component closes Properly", async () => {
	// 	const handleClose = jest.fn();
	// 	render(
	// 		<OrderBook
	// 			records={records}
	// 			onClose={handleClose}
	// 			baseCoin={""}
	// 			quoteCoin={""}
	// 		/>
	// 	);
	// 	fireEvent.click(screen.getByTestId("rg-orderBookCloseButton"));
	// 	expect(handleClose).toHaveBeenCalledTimes(1);
	// });
});
