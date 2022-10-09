import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { spotAccountTableData } from "../../table/SpotAccountTable/data";

import MobileSpotAccountTable from "./MobileSpotAccountTable";

describe("MobileSpotAccountTable", () => {
	it("renders properly", async () => {
		const handleBuy = jest.fn();
		const handleDeposit = jest.fn();
		const handleWithdraw = jest.fn();
		const handleTrade = jest.fn();
		const handleTransfer = jest.fn();
		const handleConvert = jest.fn();
		render(
			<MobileSpotAccountTable
				buy={handleBuy}
				deposit={handleDeposit}
				withdraw={handleWithdraw}
				trade={handleTrade}
				transfer={handleTransfer}
				convert={handleConvert}
				data={spotAccountTableData}
				fetchCoinImage={() => {}}
				fetchCoinName={() => {}}
				allCoins={[]}
			/>
		);

		const spotAccount = screen.getByTestId("rg-mobile-spotAccount-table");
		const btn = screen.getAllByTestId("rg-mobile-spotAccount-table-btn");
		act(() => {
			fireEvent.click(btn[0]);
			fireEvent.click(btn[1]);
			fireEvent.click(btn[2]);
			fireEvent.click(btn[3]);
			fireEvent.click(btn[4]);
			fireEvent.click(btn[5]);
		});
		spotAccountTableData.map((data, index) => {
			const dropDownbtn = screen.getByTestId(
				`rg-mobile-spotAccount-table-dropdown-${index}`
			);
			fireEvent.click(dropDownbtn);
		});
		expect(spotAccount).toBeInTheDocument();
		expect(spotAccount.children.length).toBe(spotAccountTableData.length);
		expect(spotAccount.innerHTML).toContain("text-sm-regular font-medium");
		expect(spotAccount.innerHTML).toContain("text-labels text-gray-deep mb-1");
		expect(handleDeposit).toHaveBeenCalled();
		expect(handleWithdraw).toHaveBeenCalled();
		expect(handleTrade).toHaveBeenCalled();
		expect(handleTransfer).toHaveBeenCalled();
		expect(handleConvert).toHaveBeenCalled();
	});
});
