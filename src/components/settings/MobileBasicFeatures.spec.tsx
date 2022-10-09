import { render, screen } from "@testing-library/react";
import MobileBasicFeatures from "./MobileBasicFeatures";

describe("MobileMobileBasicFeatures", () => {
	it("should render", async () => {
		render(
			<MobileBasicFeatures
				isCompleted={false}
				features={[]}
				requirements={[]}
			/>
		);
		expect(screen.getByText("Requirements")).toBeInTheDocument();
	});
	it("should show START NOW BUTTON when not completed", () => {
		render(
			<MobileBasicFeatures
				isCompleted={false}
				features={[]}
				requirements={[]}
			/>
		);
		const completedButtonEl = screen.queryByTestId("rg-completed-button");
		const notCompletedButtonEl = screen.getByTestId("rg-not-completed-button");
		expect(completedButtonEl).toBeNull();
		expect(notCompletedButtonEl).toBeTruthy();
	});
	it("should show COMPLETED BUTTON when completed", () => {
		render(
			<MobileBasicFeatures isCompleted={true} features={[]} requirements={[]} />
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
			{
				tag: "tag one",
				key: "feature one key",
				value: "feature one value",
			},
			{
				tag: "tag two",
				key: "feature two key",
				value: "feature two value",
			},
			{
				tag: "tag three",
				key: "feature three key",
				value: "feature three value",
			},
		];
		render(
			<MobileBasicFeatures
				isCompleted={true}
				features={features}
				requirements={[]}
			/>
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
			<MobileBasicFeatures
				isCompleted={true}
				features={[]}
				requirements={requirements}
			/>
		);
		const requirementEl = screen.getByTestId("rg-basic-requirements");
		expect(requirementEl.children.length).toBe(requirements.length);
	});
});
