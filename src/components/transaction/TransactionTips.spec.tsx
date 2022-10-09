import { render, screen } from "@testing-library/react";
import { ITransactionTip } from "./model";
import TransactionTips from "./TransactionTips";

const tips: ITransactionTip[] = [
	{
		id: 1,
		tip: "Please make sure you send only LINK to this deposit address.",
	},
	{
		id: 2,
		tip: "Ensure the network is LINK.",
	},
	{
		id: 3,
		tip: "The minimum deposit is 0.0001 LINK.",
	},
];

describe("TransactionTips", () => {
	it("renders properly", async () => {
		render(<TransactionTips tips={tips} />);

		const tip = screen.getByTestId("transaction-tips-container");
		const allTips = screen.getAllByTestId("transaction-tips");
		expect(tip).toBeInTheDocument();
		expect(allTips.length).toBe(3);
	});

	it("renders empty tips", async () => {
		render(<TransactionTips tips={[]} />);

		const area = screen.getByTestId("transaction-tips-area");
		expect(area.children.length).toBe(1);
	});
});
