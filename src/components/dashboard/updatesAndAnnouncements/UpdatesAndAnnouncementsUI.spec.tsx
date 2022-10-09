import { act, render, screen } from "@testing-library/react";
import { getDate } from "../../../constants";
import { UpdatesAndAnnouncementsUIProps } from "./model";
import UpdatesAndAnnouncementsUI from "./UpdatesAndAnnouncementsUI";

const updates: UpdatesAndAnnouncementsUIProps = {
	message:
		"Philippines Special: Trade & Earn on Binance P2P - 11,300 SLP Tokens to Be Won",
	date: new Date(Date.now()).toISOString(),
	underline: true,
};

describe("UpdatesAndAnnouncementsUI", () => {
	it("renders UpdatesAndAnnouncementsUI Properly", async () => {
		render(
			<UpdatesAndAnnouncementsUI
				message={updates.message}
				date={getDate(updates.date)}
				underline={updates.underline}
			/>
		);
		const updatesAndAnnouncementsUI = await screen.getByTestId(
			"rg-updatesAndAnnouncementsUI"
		);
		expect(updatesAndAnnouncementsUI.className).toContain("border-b");
		expect(updatesAndAnnouncementsUI.className).toContain("border-neutral-100");
		expect(updatesAndAnnouncementsUI.textContent).toContain(
			"Philippines Special"
		);
		expect(updatesAndAnnouncementsUI.textContent).toContain(
			getDate(new Date(Date.now()).toISOString())
		);
	});

	it("component does not have underline", async () => {
		render(
			<UpdatesAndAnnouncementsUI
				message={updates.message}
				date={getDate(updates.date)}
				underline={false}
			/>
		);
		const updatesAndAnnouncementsUI = await screen.getByTestId(
			"rg-updatesAndAnnouncementsUI"
		);
		expect(updatesAndAnnouncementsUI.className).not.toContain("border-b");
		expect(updatesAndAnnouncementsUI.className).not.toContain(
			"border-neutral-100"
		);
	});
});
