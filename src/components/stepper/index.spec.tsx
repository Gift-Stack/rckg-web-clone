import { render, screen } from "@testing-library/react";
import Stepper from "./index";

describe("Stepper", () => {
	it("renders component", async () => {
		render(<Stepper />);
		expect(screen.getByTestId("rocket-stepper").children.length).toBe(1);
		expect(
			screen.getByTestId("rocket-stepper").children[0].children.length
		).toBe(1);
		expect(
			screen.getByTestId("rocket-stepper").children[0].children[0].children
				.length
		).toBe(1);
		expect(screen.getByTestId("rocket-stepper")).toBeInTheDocument();
	});
});
