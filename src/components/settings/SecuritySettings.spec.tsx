import { render, screen } from "@testing-library/react";
import SecuritySettings from "./SecuritySettings";
import customRender from "../../../__mocks__/customRender";

describe("SecuritySettings", () => {
	it("should render correctly", () => {
		customRender(<SecuritySettings />, {
			auth: { email: true },
		});
		expect(screen.getByText("Security Settings")).toBeInTheDocument();
	});

	it("should show hide 2fa icon ", () => {
		render(<SecuritySettings />);
		const hideIcon = screen.getByTestId("rg-hide-2fa");
		hideIcon.click();
		const showIcon = screen.getByTestId("rg-show-2fa");
		expect(showIcon).toBeInTheDocument();
	});

	it("should show 2fa section", () => {
		render(<SecuritySettings />);
		const hideIcon = screen.getByTestId("rg-hide-2fa");
		const twoFaArea = screen.getByTestId("rg-2fa-area");
		expect(twoFaArea).toBeInTheDocument();
		expect(twoFaArea.children.length).toBeLessThanOrEqual(3);
		hideIcon.click();
		expect(twoFaArea).not.toBeInTheDocument();
	});
});
