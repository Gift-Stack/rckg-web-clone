import { render, screen } from "@testing-library/react";
import BasicFeatures from "./BasicFeatures";

describe("BasicFeatures", () => {
	it("should render", async () => {
		render(
			<BasicFeatures isCompleted={false} features={[]} requirements={[]} />
		);
		expect(screen.getByText("Basic Profile")).toBeInTheDocument();
	});
	it("should show START NOW BUTTON when not completed", () => {
		render(
			<BasicFeatures isCompleted={false} features={[]} requirements={[]} />
		);
		const completedButtonEl = screen.queryByTestId("rg-completed-button");
		const notCompletedButtonEl = screen.getByTestId("rg-not-completed-button");
		expect(completedButtonEl).toBeNull();
		expect(notCompletedButtonEl).toBeTruthy();
	});
	it("should show COMPLETED BUTTON when completed", () => {
		render(
			<BasicFeatures isCompleted={true} features={[]} requirements={[]} />
		);
		const completedButtonEl = screen.getByTestId("rg-completed-button");
		const notCompletedButtonEl = screen.queryByTestId(
			"rg-not-completed-button"
		);
		expect(completedButtonEl).toBeTruthy();
		expect(notCompletedButtonEl).toBeNull();
	});
	it("should render features", () => {
		const features = [
			{ key: "feature one key", value: "feature one value" },
			{ key: "feature two key", value: "feature two value" },
			{ key: "feature three key", value: "feature three value" },
		];
		render(
			<BasicFeatures isCompleted={true} features={features} requirements={[]} />
		);

		const featuresEl = screen.getByTestId("rg-basic-features");
		expect(featuresEl.children.length).toBe(features.length);
	});
	it("should render requirements", () => {
		const requirements = [
			"requirement one",
			"requirement two",
			"requirement three",
			"requirement four",
		];
		render(
			<BasicFeatures
				isCompleted={true}
				features={[]}
				requirements={requirements}
			/>
		);
		const requirementEl = screen.getByTestId("rg-basic-requirements");
		expect(requirementEl.children.length).toBe(requirements.length);
	});
});
