import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import {
	transactionHistoryTableData,
	transactionHistoryTableConvertData,
} from "./data";

import MobileTransactionHistoryTable from "./MobileTransactionHistoryTable";

describe("MobileTransactionHistoryTable", () => {
	it("renders properly", async () => {
		render(
			<MobileTransactionHistoryTable
				data={transactionHistoryTableData}
				convertData={transactionHistoryTableConvertData}
				isConvert={true}
				fetchCoinImage={() => {}}
				allCoins={[]}
			/>
		);

		const spotAccount = screen.getByTestId(
			"rg-mobile-transaction-history-table"
		);
		transactionHistoryTableConvertData.map((data, index) => {
			const dropDownbtn = screen.getByTestId(
				`rg-mobile-transaction-history-table-dropdown-${index}`
			);
			fireEvent.click(dropDownbtn);
		});
		expect(spotAccount).toBeInTheDocument();
		expect(spotAccount.children.length).toBe(
			transactionHistoryTableConvertData.length
		);
		expect(spotAccount.innerHTML).toContain("text-sm-regular font-medium");
		expect(spotAccount.innerHTML).toContain("text-labels text-gray-deep mb-1");
	});
});
