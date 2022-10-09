import { render, screen } from "@testing-library/react";
import { loginActivityTableData } from "./data";
import MobileLoginActivityTable from "./MobileLoginActivityTable";

describe("MobileLoginActivityTable", () => {
	it("renders properly", async () => {
		render(
			<MobileLoginActivityTable data={loginActivityTableData} pageSize={6} />
		);

		const table = screen.getByTestId("rg-mobile-login-activity-table");
		expect(table).toBeInTheDocument();
		expect(table.children.length).toBeLessThanOrEqual(7);
	});
});
