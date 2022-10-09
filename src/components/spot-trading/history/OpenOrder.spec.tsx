import { render, screen } from "@testing-library/react";
import OpenOrder from "./OpenOrder";

describe("OpenOrder", () => {
	it.todo("open order");
	// const openOrders = [
	// 	{
	// 		time: "11-05 12:35:16",
	// 		symbol: { pair: "BTCUSD", period: "Quarterly 0925" },
	// 		type: "Take Profit Market",
	// 		side: "Close Short",
	// 		price: "Callback Rate =0.1%",
	// 		amount: "12.34567 BTC",
	// 		filled: "12.34567 BTC",
	// 		reduceOnly: true,
	// 		postOnly: true,
	// 		triggerConditions: "Mark Price >=12345.12345",
	// 		tpslURI: "",
	// 	},
	// 	{
	// 		time: "11-05 12:35:16",
	// 		symbol: { pair: "BTCUSD", period: "Quarterly 0925" },
	// 		type: "Take Profit Market",
	// 		side: "Close Short",
	// 		price: "Callback Rate =0.1%",
	// 		amount: "12.34567 BTC",
	// 		filled: "12.34567 BTC",
	// 		reduceOnly: true,
	// 		postOnly: true,
	// 		triggerConditions: "Mark Price >=12345.12345",
	// 		tpslURI: "",
	// 	},
	// ];
	// beforeEach(() => render(<OpenOrder openOrders={openOrders} />));
	// it("should render correctly", () => {
	// 	expect(screen.getByText("Time")).toBeInTheDocument();
	// 	expect(screen.getByText("Symbol")).toBeInTheDocument();
	// 	expect(screen.getByText("Side")).toBeInTheDocument();
	// 	expect(screen.getByText("Price")).toBeInTheDocument();
	// 	expect(screen.getByText("Filled")).toBeInTheDocument();
	// 	expect(screen.getByText("Reduce Only")).toBeInTheDocument();
	// 	expect(screen.getByText("Post Only")).toBeInTheDocument();
	// 	expect(screen.getByText("Trigger Conditions")).toBeInTheDocument();
	// 	expect(screen.getByText("TP/SL")).toBeInTheDocument();
	// 	expect(screen.getByText("Cancel All")).toBeInTheDocument();
	// });
	// it("should render table body rows correctly", () => {
	// 	const orderBodyRow = screen.getByTestId("order-body-rows");
	// 	expect(orderBodyRow.children.length).toBe(2);
	// });
	// it("SIDE state should display green when SHORT", () => {});
});
