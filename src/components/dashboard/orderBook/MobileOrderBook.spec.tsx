import { render, fireEvent, screen } from "@testing-library/react";
import MobileOrderBook from "./MobileOrderBook";
import { Record } from "./model";

const records: Record[] = [
	{
		id: 1,
		price: 37132.73,
		amount: 0.024171,
		total: 897.53522,
		type: "buy",
		activity: 100,
	},
	{
		id: 2,
		price: 37132.73,
		amount: 0.024171,
		total: 897.53522,
		type: "sell",
		activity: 100,
	},
	{
		id: 3,
		price: 37132.73,
		amount: 0.049,
		total: 897.53522,
		type: "sell",
		activity: 100,
	},
	{
		id: 4,
		price: 37132.73,
		amount: 0.024171,
		total: 110062.89601,
		type: "buy",
		activity: 100,
	},
	{
		id: 5,
		price: 37132.73,
		amount: 0.024171,
		total: 897.53522,
		type: "sell",
		activity: 100,
	},
	{
		id: 6,
		price: 37132.73,
		amount: 0.024171,
		total: 27974.2648,
		type: "buy",
		activity: 100,
	},
];

describe("MobileOrderBook", () => {
	it("renders Mobile Order Book component Properly", async () => {
		render(<MobileOrderBook records={records} />);

		let select = await screen.getByTestId("rg-orderBook-Mobile-select");
		let options = await screen.getAllByTestId(
			"rg-orderBook-Mobile-select-option"
		);
		expect(select.className).toContain("text-neutral-300");
		expect(select.className).toContain("bg-transparent");
		expect(options.length).toBe(3);
		expect((options[0] as HTMLOptionElement).selected).toBeTruthy();
		expect((options[1] as HTMLOptionElement).selected).toBeFalsy();
		expect((options[2] as HTMLOptionElement).selected).toBeFalsy();
	});
});
