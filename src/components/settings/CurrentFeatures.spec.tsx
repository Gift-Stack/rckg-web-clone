import { render, screen } from "@testing-library/react";
import CurrentFeatures from "./CurrentFeatures";

describe("CurrentFeatures", () => {
	it("should render correctly", () => {
		render(<CurrentFeatures isCompleted={false} features={[]} />);
		expect(screen.getByText("Current Features")).toBeInTheDocument();
	});
	it("should show completed element", () => {
		render(<CurrentFeatures isCompleted={true} features={[]} />);
		const completedEl = screen.getByTestId("rg-current-completed");
		const notCompletedEl = screen.queryByTestId("rg-current-not-completed");
		expect(completedEl).toBeTruthy();
		expect(notCompletedEl).toBeNull();
	});
	it("should show not completed element", () => {
		render(<CurrentFeatures isCompleted={false} features={[]} />);
		const completedEl = screen.queryByTestId("rg-current-completed");
		const notCompletedEl = screen.getByTestId("rg-current-not-completed");
		expect(notCompletedEl).toBeTruthy();
		expect(completedEl).toBeNull();
	});
	it("should render features when completed", () => {
		const features = [
			{ key: "feature one key", value: "feature one value" },
			{ key: "feature two key", value: "feature two value" },
			{ key: "feature three key", value: "feature three value" },
		];
		render(<CurrentFeatures isCompleted={true} features={features} />);
		const completedEl = screen.queryByTestId("rg-current-completed");
		expect(completedEl?.children.length).toBe(features.length);
	});
});
