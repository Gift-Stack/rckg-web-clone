import { act, fireEvent, render, screen } from "@testing-library/react";
import { IconTypes, SettingActionState, Status } from "./enum";
import Setting from "./Setting";

describe("Setting", () => {
	it("renders Setting properly", async () => {
		const handleClick = jest.fn();
		render(
			<Setting
				name={"2FA Settings"}
				icon={IconTypes.TWO_FA}
				state={SettingActionState.INACTIVE}
				status={Status.OFF}
				onClick={handleClick}
			/>
		);
		const setting = await screen.getByTestId("rg-SettingUI");
		const status = await screen.getByText(Status.OFF);
		act(() => {
			fireEvent.click(status);
		});
		expect(handleClick).toHaveBeenCalled();
		expect(setting.innerHTML).toContain("2FA Settings");
		expect(status.className).toContain(SettingActionState.INACTIVE);
	});

	it("confirm setting action state is active and status is verify", async () => {
		const handleClick = jest.fn();
		render(
			<Setting
				name={"Verify Identity"}
				icon={IconTypes.VERIFY_IDENTITY}
				state={SettingActionState.ACTIVE}
				status={Status.VERIFY}
				onClick={handleClick}
			/>
		);
		const setting = await screen.getByTestId("rg-SettingUI");
		const status = await screen.getByText(Status.VERIFY);
		expect(status.className).toContain(SettingActionState.ACTIVE);
		expect(setting.innerHTML).toContain(Status.VERIFY);
	});

	it("confirm setting status is setup", async () => {
		const handleClick = jest.fn();
		render(
			<Setting
				name={"Anti-phishing"}
				icon={IconTypes.ANTI_PHISHING}
				state={SettingActionState.ACTIVE}
				status={Status.SETUP}
				onClick={handleClick}
			/>
		);
		const setting = await screen.getByTestId("rg-SettingUI");
		expect(setting.innerHTML).toContain(Status.SETUP);
	});

	it("confirm setting status is turn on", async () => {
		const handleClick = jest.fn();
		render(
			<Setting
				name={"Withdrawal Whitelist"}
				icon={IconTypes.WITHDRAWAL_WHITELIST}
				state={SettingActionState.INACTIVE}
				status={Status.TURN_ON}
				onClick={handleClick}
			/>
		);
		const setting = await screen.getByTestId("rg-SettingUI");
		expect(setting.innerHTML).toContain(Status.TURN_ON);
	});
});
