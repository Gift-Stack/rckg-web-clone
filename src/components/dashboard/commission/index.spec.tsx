import { render, screen } from "@testing-library/react";
import Commission from ".";

describe("Commission", () => {
	it("renders Commission properly", async () => {
		render(<Commission />);

		const commission = await screen.getByTestId("rg-commission");
		expect(commission.innerHTML).toContain("Invite friends");
	});
});
