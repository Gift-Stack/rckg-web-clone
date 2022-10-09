import { render, screen } from "@testing-library/react";
import OrderHistory from "./OrderHistory";

describe("OrderHistory", () => {
	const orderHistories = [
		{
			time: "11-05  12:35:16",
			pair: "ADA/BTC",
			type: "Limit",
			side: "Buy",
			average: "0.000003616",
			price: "0.003628",
			executed: true,
			amount: "15.9",
			total: "0.00057494",
		},
		{
			time: "11-05  12:35:16",
			pair: "ADA/BTC",
			type: "Limit",
			side: "Sell",
			average: "0.000003616",
			price: "0.003628",
			executed: false,
			amount: "3.0",
			total: "0.05586",
		},
	];
	beforeEach(() => render(<OrderHistory orderHistories={orderHistories} />));

	it.todo("Should render correctly");
	it.todo("should render table body rows correctly");
	it.todo("SIDE state should display green when BUY");
	it.todo("SIDE state should display red when SELL");

	// it("should render correctly", () => {
	// 	expect(screen.getByText("Time")).toBeInTheDocument();
	// 	expect(screen.getByText("Pair")).toBeInTheDocument();
	// 	expect(screen.getByText("Type")).toBeInTheDocument();
	// 	expect(screen.getByText("Side")).toBeInTheDocument();
	// 	expect(screen.getByText("Average")).toBeInTheDocument();
	// 	expect(screen.getByText("Price")).toBeInTheDocument();
	// 	expect(screen.getByText("Executed")).toBeInTheDocument();
	// 	expect(screen.getByText("Amount")).toBeInTheDocument();
	// 	expect(screen.getByText("Total")).toBeInTheDocument();
	// 	expect(screen.getByText("All")).toBeInTheDocument();
	// });
	// it("should render table body rows correctly", () => {
	// 	const orderBodyRow = screen.getByTestId("history-body-rows");
	// 	expect(orderBodyRow.children.length).toBe(2);
	// });
	// it("SIDE state should display green when BUY", () => {
	// 	const sideCellDataEl = screen.getAllByTestId("history-body-row-side");
	// 	expect(sideCellDataEl[0].classList).toContain("text-green-500");
	// });
	// it("SIDE state should display red when SELL", () => {
	// 	const sideCellDataEl = screen.getAllByTestId("history-body-row-side");
	// 	expect(sideCellDataEl[1].classList).toContain("text-red-600");
	// });
});
