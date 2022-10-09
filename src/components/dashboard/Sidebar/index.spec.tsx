import { render, screen } from "@testing-library/react";
import Sidebar from "./";

const useRouter = jest.spyOn(require("next/router"), "useRouter");
useRouter.mockImplementation(() => ({
	pathname: "/dashboard",
}));

describe("Dashboard side panel", () => {
	it("should render properly", async () => {
		render(<Sidebar />);

		const container = screen.getByTestId("rg-dashboard-sidebar");
		expect(container.children.length).toEqual(2);
	});
});
