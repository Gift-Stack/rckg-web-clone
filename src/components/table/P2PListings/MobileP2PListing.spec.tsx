import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { p2pListingData } from "./data";

import MobileP2PListing from "./MobileP2PListing";
import React from "react";

describe("MobileP2PListing", () => {
	it("renders properly", async () => {
		const handleTrade = jest.fn();
		render(<MobileP2PListing trade={handleTrade} data={p2pListingData} />);

		p2pListingData.map((row, index) => {
			let id = screen.getByTestId(`rg-p2pListing-initial-${index}`);
			expect(id.children).toHaveLength(1);
		});
		const p2pListing = screen.getByTestId("rg-mobile-p2pListing-table");
		const btns = screen.getAllByTestId("rg-mobile-p2pListing-table-action-btn");
		act(() => {
			fireEvent.click(btns[0]);
		});
		expect(p2pListing).toBeInTheDocument();
		expect(p2pListing.children.length).toBe(p2pListingData.length);
		expect(p2pListing.innerHTML).toContain("justify-between");
		expect(p2pListing.innerHTML).toContain("text-neutral-500");
		expect(handleTrade).toHaveBeenCalled();
	});
});
