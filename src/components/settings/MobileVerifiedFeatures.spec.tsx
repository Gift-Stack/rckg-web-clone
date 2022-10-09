import { render, screen } from "@testing-library/react";
import MobileVerifiedFeatures from "./MobileVerifiedFeatures";

describe("MobileVerifiedFeatures", () => {
	it("should render", async () => {
		render(
			<MobileVerifiedFeatures
				isCompleted={false}
				features={[]}
				requirements={[]}
				isFailedVerification={false}
			/>
		);
		expect(screen.getByText("Requirements")).toBeInTheDocument();
	});
	it("should show START NOW BUTTON when not completed", () => {
		render(
			<MobileVerifiedFeatures
				isCompleted={false}
				features={[]}
				requirements={[]}
				isFailedVerification={false}
			/>
		);
		const completedButtonEl = screen.queryByTestId("rg-completed-button");
		const notCompletedButtonEl = screen.getByTestId("rg-not-completed-button");
		expect(completedButtonEl).toBeNull();
		expect(notCompletedButtonEl).toBeTruthy();
	});
	it("should show COMPLETED BUTTON when completed", () => {
		render(
			<MobileVerifiedFeatures
				isCompleted={true}
				features={[]}
				requirements={[]}
				isFailedVerification={false}
			/>
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
			<MobileVerifiedFeatures
				isCompleted={true}
				features={features}
				requirements={[]}
				isFailedVerification
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
			<MobileVerifiedFeatures
				isCompleted={true}
				features={[]}
				requirements={requirements}
				isFailedVerification={false}
			/>
		);
		const requirementEl = screen.getByTestId("rg-verified-requirements");
		expect(requirementEl.children.length).toBe(requirements.length);
	});
});
