import { render, screen } from "@testing-library/react";
import TransactionTable from ".";

describe("TransactionTable", () => {
	it("renders properly", async () => {
		render(
			<TransactionTable
				cssClass="p-1 xl:p-5 rounded bg-white h-full"
				title={"Recent Deposits"}
			>
				<div>Test</div>
			</TransactionTable>
		);

		const table = screen.getByTestId("rg-transaction-table");
		expect(table).toBeInTheDocument();
		expect(table.className).toContain("transaction-table");
		expect(table.innerHTML).toContain("p-1 xl:p-5 rounded bg-white h-full");
	});
});
