import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { p2pTableData } from "./data";

import MobileP2PTable from "./MobileP2PTable";

describe("MobileP2pTable", () => {
	it("renders properly", async () => {
		const handleBuy = jest.fn();
		const handleSell = jest.fn();
		const handleTransfer = jest.fn();
		const handleSend = jest.fn();
		render(
			<MobileP2PTable
				buy={handleBuy}
				sell={handleSell}
				transfer={handleTransfer}
				send={handleSend}
				data={p2pTableData}
			/>
		);

		const p2p = screen.getByTestId("rg-mobile-p2p-table");
		const btn = screen.getAllByTestId("rg-mobile-p2p-table-btn");
		act(() => {
			fireEvent.click(btn[0]);
			fireEvent.click(btn[1]);
			fireEvent.click(btn[2]);
			fireEvent.click(btn[3]);
		});
		p2pTableData.map((data, index) => {
			const dropDownbtn = screen.getByTestId(
				`rg-mobile-p2p-table-dropdown-${index}`
			);
			fireEvent.click(dropDownbtn);
		});
		expect(p2p).toBeInTheDocument();
		expect(p2p.children.length).toBe(p2pTableData.length);
		expect(p2p.innerHTML).toContain("text-sm-regular font-medium");
		expect(p2p.innerHTML).toContain("text-labels text-gray-deep mb-1");
		expect(handleBuy).toHaveBeenCalled();
		expect(handleSell).toHaveBeenCalled();
		expect(handleTransfer).toHaveBeenCalled();
		expect(handleSend).toHaveBeenCalled();
	});
});
