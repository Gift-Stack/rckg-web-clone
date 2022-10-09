import { render, screen } from "@testing-library/react";
import FundHistory from "./FundHistory";

describe("FundHistory", () => {
	const fundHistories = [
		{
			coin: "BTC",
			totalBalance: "0.02718428",
			availableBalance: "0.02718428",
			inOrder: "0.02718428",
			btcValue: "12.34567 BTC",
		},
		{
			coin: "USDT",
			totalBalance: "131.77386187",
			availableBalance: "131.77386187",
			inOrder: "131.77386187",
			btcValue: "12.34567 BTC",
		},
		{
			coin: "RCKC",
			totalBalance: "0.003628",
			availableBalance: "12.3345",
			inOrder: "131.77386187",
			btcValue: "12.34567 BTC",
		},
	];
	beforeEach(() => render(<FundHistory fundHistories={fundHistories} />));
	it("should render correctly", () => {
		expect(screen.getByText("Coin")).toBeInTheDocument();
		expect(screen.getByText("Total Balance")).toBeInTheDocument();
		expect(screen.getByText("Available Balance")).toBeInTheDocument();
	});
	it("should render table body rows correctly", () => {
		const orderBodyRow = screen.getByTestId("order-body-rows");
		expect(orderBodyRow.children.length).toBe(3);
	});
	it("SIDE state should display green when SHORT", () => {});
});
