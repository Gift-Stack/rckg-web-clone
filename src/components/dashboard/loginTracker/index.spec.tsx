import { act, fireEvent, render, screen } from "@testing-library/react";
import { Tags } from "../../card/model";
import LoginTracker from ".";
import { Activity, Devices } from "./model";

const cardTags: Tags[] = [
	{
		name: "Activity",
		isActive: true,
	},
	{
		name: "Login Devices",
		isActive: false,
	},
];

const activities: Activity[] = [
	{
		id: 1,
		activity: "Logged in from Lagos, Nigeria",
		date: new Date(Date.now()).toISOString(),
		address: "197.211.58.66",
	},
	{
		id: 2,
		activity: "Logged in from Lagos, Nigeria",
		date: new Date(Date.now()).toISOString(),
		address: "197.211.58.66",
	},
];

const devices: Devices[] = [
	{
		id: 1,
		device: "Samsung S21",
		date: new Date(Date.now()).toISOString(),
		address: "197.211.58.66",
	},
	{
		id: 2,
		device: "Samsung S21",
		date: new Date(Date.now()).toISOString(),
		address: "197.211.58.66",
	},
];

describe("LoginTracker", () => {
	it("renders LoginTracker component Properly", async () => {
		const x = render(
			<LoginTracker
				activities={activities}
				devices={devices}
				cardTags={cardTags}
			/>
		);

		const tracker = await screen.getByTestId("rg-login-tracker");
		const card = await screen.getByTestId("rg-card");
		const activity = await screen.getAllByTestId("rg-activityUI");
		const tag = await screen.getAllByTestId("rg-tag");
		fireEvent.click(tag[1]);
		expect(tracker.children.length).toBe(1);
		expect(tracker.innerHTML).toContain(card.innerHTML);
		expect(activity.length).toBe(2);
	});
});
