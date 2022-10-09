import { render, screen } from "@testing-library/react";
import TradeHistory from "./TradeHistory";

describe("TradeHistory", () => {
	it.todo("Fix Trade History");
	// const tradeHistories = [
	// 	{
	// 		time: "11-05  12:35:16",
	// 		pair: "ADA/BTC",
	// 		type: "Limit",
	// 		side: "Buy",
	// 		average: "0.000003616",
	// 		price: "0.00003616",
	// 		executed: 15.9,
	// 		fee: "0.01590000 ADA",
	// 		total: "0.00057494 BTC",
	// 	},
	// 	{
	// 		time: "11-05  12:35:16",
	// 		pair: "ADA/BTC",
	// 		type: "Limit",
	// 		side: "Sell",
	// 		average: "0.000003616",
	// 		price: "0.003628",
	// 		executed: 3.0,
	// 		fee: "12.34567 BTC",
	// 		total: "0.05586000 BNB",
	// 	},
	// ];
	// beforeEach(() => render(<TradeHistory tradeHistories={tradeHistories} />));
	// it("should render correctly", () => {
	// 	expect(screen.getByText("Time")).toBeInTheDocument();
	// 	expect(screen.getByText("Pair")).toBeInTheDocument();
	// 	expect(screen.getByText("Type")).toBeInTheDocument();
	// 	expect(screen.getByText("Side")).toBeInTheDocument();
	// 	expect(screen.getByText("Average")).toBeInTheDocument();
	// 	expect(screen.getByText("Price")).toBeInTheDocument();
	// 	expect(screen.getByText("Executed")).toBeInTheDocument();
	// 	expect(screen.getByText("Fee")).toBeInTheDocument();
	// 	expect(screen.getByText("Total")).toBeInTheDocument();
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
