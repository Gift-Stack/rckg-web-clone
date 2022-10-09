import { render, screen } from "@testing-library/react";
import LoginActivityTable from "./LoginActivityTable";

describe("LoginActivityTable", () => {
	it("renders properly", async () => {
		render(
			<LoginActivityTable cssClass="p-1 xl:p-5 rounded bg-white h-full">
				<div>Test</div>
			</LoginActivityTable>
		);

		const table = screen.getByTestId("rg-login-activity-table");
		expect(table).toBeInTheDocument();
		expect(table.innerHTML).toContain("p-1 xl:p-5 rounded bg-white h-full");
	});
});
