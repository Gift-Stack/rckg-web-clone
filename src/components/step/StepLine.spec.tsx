import { render, screen } from "@testing-library/react";
import { StepLineState } from "./enum";
import StepLine from "./StepLine";

describe("StepLine", () => {
	it("renders properly", async () => {
		render(<StepLine state={StepLineState.PRIMARY} />);

		const step_line = screen.getByTestId("rg-step-line");
		expect(step_line).toBeInTheDocument();
		expect(step_line.className).toContain(StepLineState.PRIMARY);
		expect(step_line.className).toContain(
			"flex-auto border-t-2 transition duration-500 ease-in-out"
		);
		expect(step_line.children.length).toBe(0);
	});

	it("renders with default props", async () => {
		render(<StepLine />);

		const step_line = screen.getByTestId("rg-step-line");
		expect(step_line.className).toContain(StepLineState.DEFAULT);
	});
});
