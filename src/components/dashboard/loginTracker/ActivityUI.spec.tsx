import { render, screen } from "@testing-library/react";
import { getDateTime } from "../../../constants";
import ActivityUI from "./ActivityUI";

describe("ActivityUI", () => {
	it("renders ActivityUI properly", async () => {
		render(
			<ActivityUI
				activity={"Logged in from Lagos, Nigeria"}
				date={new Date(Date.now()).toISOString()}
				address={"197.211.58.66"}
				underline={true}
			/>
		);
		const activity = await screen.getByTestId("rg-activityUI");
		expect(activity.className).toContain("border-b");
		expect(activity.className).toContain("border-neutral-100");
		// expect(activity.innerHTML).toContain(
		// 	getDateTime(new Date(Date.now()).toISOString().split(" ")[0])
		// );
		expect(activity.innerHTML).toContain("197.211.58.66");
		expect(activity.innerHTML).toContain("Logged in from Lagos, Nigeria");
	});

	it("ActivityUI should not be underlines", async () => {
		render(
			<ActivityUI
				activity={"Logged in from Lagos, Nigeria"}
				date={new Date(Date.now()).toISOString()}
				address={"197.211.58.66"}
				underline={false}
			/>
		);
		const activity = await screen.getByTestId("rg-activityUI");
		expect(activity.className).not.toContain("border-b");
		expect(activity.className).not.toContain("border-neutral-100");
	});
});
