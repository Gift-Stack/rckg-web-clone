import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ActivitySwitch from "./ActivitySwitch";

describe("ActivitySwitch", () => {
	it("renders properly", async () => {
		const handleSetActive = jest.fn();
		render(
			<ActivitySwitch
				handleSwitch={(value: string) => handleSetActive(value)}
				switchItem={["Login Activity", "Login Devices"]}
				active={"Login Activity"}
			/>
		);

		const activiySwicth = screen.getByTestId("user-activity-switch");
		const switch_ = screen.getByTestId("user-activity-switch-1");
		act(() => {
			fireEvent.click(switch_);
		});
		expect(activiySwicth).toBeInTheDocument();
		expect(handleSetActive).toHaveBeenCalled();
	});
});
