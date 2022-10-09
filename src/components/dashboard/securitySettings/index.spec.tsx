import { render, screen } from "@testing-library/react";
import SecuritySettings from ".";
import { IconTypes, SettingActionState, Status } from "./enum";
import { AllSettings } from "./model";

const securitySettings: AllSettings[] = [
	{
		id: 1,
		name: "2FA Settings",
		icon: IconTypes.TWO_FA,
		state: SettingActionState.INACTIVE,
		status: Status.OFF,
	},
	{
		id: 2,
		name: "Verify Identity",
		icon: IconTypes.VERIFY_IDENTITY,
		state: SettingActionState.ACTIVE,
		status: Status.VERIFY,
	},
];

describe("SecuritySettings", () => {
	it("renders SecuritySettings component Properly", async () => {
		render(<SecuritySettings allSettings={securitySettings} />);

		const settings = await screen.getByTestId("rg-security-settings");
		const card = await screen.getByTestId("rg-card");
		const setting = screen.getAllByTestId("rg-SettingUI");

		expect(settings.innerHTML).toContain(card.innerHTML);
		expect(setting.length).toBe(2);
	});
});
