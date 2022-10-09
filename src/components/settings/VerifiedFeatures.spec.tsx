import { render, screen } from "@testing-library/react";
import VerifiedFeatures from "./VerifiedFeatures";

describe("VerifiedFeatures", () => {
	it("should render", async () => {
		render(
			<VerifiedFeatures isCompleted={false} features={[]} requirements={[]} />
		);
		expect(screen.getByText("Verified Plus")).toBeInTheDocument();
	});
	it("should show START NOW BUTTON when not completed", () => {
		render(
			<VerifiedFeatures isCompleted={false} features={[]} requirements={[]} />
		);
		const completedButtonEl = screen.queryByTestId("rg-completed-button");
		const notCompletedButtonEl = screen.getByTestId("rg-not-completed-button");
		expect(completedButtonEl).toBeNull();
		expect(notCompletedButtonEl).toBeTruthy();
	});
	it("should show COMPLETED BUTTON when completed", () => {
		render(
			<VerifiedFeatures isCompleted={true} features={[]} requirements={[]} />
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
			{ tag: "tag one", key: "feature one key", value: "feature one value" },
			{ tag: "tag two", key: "feature two key", value: "feature two value" },
			{
				tag: "tag three",
				key: "feature three key",
				value: "feature three value",
			},
		];
		render(
			<VerifiedFeatures
				isCompleted={true}
				features={features}
				requirements={[]}
			/>
		);

		const featuresEl = screen.getByTestId("rg-verified-features");
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
			<VerifiedFeatures
				isCompleted={true}
				features={[]}
				requirements={requirements}
			/>
		);
		const requirementEl = screen.getByTestId("rg-verified-requirements");
		expect(requirementEl.children.length).toBe(requirements.length);
	});
});
