import { render, screen } from "@testing-library/react";
import UpdatesAndAnnouncements from ".";
import { Updates } from "./model";

const updates: Updates[] = [
	{
		id: 1,
		message:
			"Philippines Special: Trade & Earn on Binance P2P - 11,300 SLP Tokens to Be Won",
		date: new Date(Date.now()).toISOString(),
	},
	{
		id: 2,
		message:
			"Philippines Special: Trade & Earn on Binance P2P - 11,300 SLP Tokens to Be Won",
		date: new Date(Date.now()).toISOString(),
	},
];

describe("UpdatesAndAnnouncements", () => {
	it("renders UpdatesAndAnnouncements components Properly", async () => {
		render(<UpdatesAndAnnouncements updates={updates} />);

		const updatesAndAnnouncements = await screen.getByTestId(
			"rg-updatesAndAnnouncements"
		);
		const card = await screen.getByTestId("rg-card");
		const updatesAndAnnouncementsUI = screen.getAllByTestId(
			"rg-updatesAndAnnouncementsUI"
		);
		expect(updatesAndAnnouncements.innerHTML).toContain(card.innerHTML);
		expect(updatesAndAnnouncementsUI.length).toBe(2);
	});
});
