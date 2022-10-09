import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Step from ".";
import { StepDotState, StepLineState } from "./enum";

describe("Step", () => {
	it("renders properly", async () => {
		const handleClick = jest.fn();
		render(
			<Step
				stepLength={5}
				stepDotDefaultState={StepDotState.DEFAULT}
				stepDotActiveState={StepDotState.PRIMARY}
				stepLineDefaultState={StepLineState.DEFAULT}
				stepLineActiveState={StepLineState.PRIMARY}
				setStepLengthPercentage={handleClick}
			/>
		);

		const step_container = screen.getByTestId("rg-step-container");
		const step = screen.getByTestId("rg-step");
		const dot = screen.getAllByTestId("rg-step-dot");
		const step_line = screen.getAllByTestId("rg-step-line");
		act(() => {
			fireEvent.click(dot[1]);
		});
		expect(step_container).toBeInTheDocument();
		expect(step_container.children.length).toBe(1);
		expect(step_container.children.length).toBe(1);
		expect(step).toBeInTheDocument();
		expect(step.children.length).toBe(9);
		expect(dot.length).toBe(5);
		expect(step_line.length).toBe(4);
		expect(handleClick).toHaveBeenCalled();
	});

	it("click on the first step", async () => {
		const handleClick = jest.fn();
		render(
			<Step
				stepLength={5}
				stepDotDefaultState={StepDotState.DEFAULT}
				stepDotActiveState={StepDotState.PRIMARY}
				stepLineDefaultState={StepLineState.DEFAULT}
				stepLineActiveState={StepLineState.PRIMARY}
				setStepLengthPercentage={handleClick}
			/>
		);
		const dot = screen.getAllByTestId("rg-step-dot");
		act(() => {
			fireEvent.click(dot[0]);
		});
		expect(handleClick).toHaveBeenCalled();
	});

	it("click on the last step", async () => {
		const handleClick = jest.fn();
		render(
			<Step
				stepLength={5}
				stepDotDefaultState={StepDotState.DEFAULT}
				stepDotActiveState={StepDotState.PRIMARY}
				stepLineDefaultState={StepLineState.DEFAULT}
				stepLineActiveState={StepLineState.PRIMARY}
				setStepLengthPercentage={handleClick}
			/>
		);
		const dot = screen.getAllByTestId("rg-step-dot");
		act(() => {
			fireEvent.click(dot[4]);
		});
		expect(handleClick).toHaveBeenCalled();
	});
});
