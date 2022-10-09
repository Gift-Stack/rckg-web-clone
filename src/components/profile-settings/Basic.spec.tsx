import { render, screen } from "@testing-library/react";
import Basic from "./Basic";

describe("Basic", () => {
	it("renders properly", async () => {
		render(<Basic countries={[]} values={{}} />);

		expect(screen.getByTestId("basic-form").children[0].className).toContain(
			"grid  grid-cols-1 md:grid-cols-2 gap-4"
		);
		expect(screen.getByTestId("basic-form").children[0].children.length).toBe(
			9
		);
		expect(screen.getByTestId("security-assurance").children.length).toBe(2);
		expect(screen.getByTestId("basic-button-area").children.length).toBe(1);
	});
});
