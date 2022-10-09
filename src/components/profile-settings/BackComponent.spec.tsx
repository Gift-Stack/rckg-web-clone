import { render, screen } from "@testing-library/react";
import BackComponent from "./BackComponent";

describe("BackComponent", () => {
	it("renders component", async () => {
		render(<BackComponent path={"/settings/account"} />);
		expect(screen.getByTestId("backComponent").children.length).toBe(2);
		expect(screen.getByTestId("backComponent")).toBeInTheDocument();
	});
	it("h3 inner html should be back to settings", async () => {
		render(<BackComponent path={"/settings/account"} />);
		expect(screen.getByTestId("backComponent").children[1].innerHTML).toBe(
			"Back to Settings"
		);
	});
});
