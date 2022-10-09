import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { StepDotState } from "./enum";
import StepDot from "./StepDot";

describe("StepDot", () => {
	it("renders properly", async () => {
		const currentIndex = jest.fn();
		render(
			<StepDot
				state={StepDotState.PRIMARY}
				index={0}
				currentIndex={currentIndex}
			/>
		);

		const dot = screen.getByTestId("rg-step-dot");
		act(() => {
			fireEvent.click(dot);
		});
		expect(dot).toBeInTheDocument();
		expect(dot.children.length).toBe(1);
		expect(dot.className).toContain("flex relative");
		expect(dot.children[0].className).toContain(StepDotState.PRIMARY);
		expect(dot.children[0].className).toContain(
			"rounded-full transition duration-500 ease-in-out h-3 w-3"
		);
		expect(currentIndex).toHaveBeenCalled();
	});

	it("renders default props", async () => {
		const currentIndex = jest.fn();
		render(<StepDot index={0} currentIndex={currentIndex} />);

		const dot = screen.getByTestId("rg-step-dot");
		expect(dot.children[0].className).toContain(StepDotState.DEFAULT);
	});
});
