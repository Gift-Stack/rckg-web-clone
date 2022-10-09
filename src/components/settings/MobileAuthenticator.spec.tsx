import { fireEvent, render, screen } from "@testing-library/react";
import MobileAuthenticator from "./MobileAuthenticator";

describe("MobileAuthenticator", () => {
	it("should render correctly", () => {
		const handleEmailAuth = jest.fn();
		const handleSetShowAuthSetUp = jest.fn();
		const handleSmsSetup = jest.fn();

		render(
			<MobileAuthenticator
				handleEmailAuth={handleEmailAuth}
				handleSmsSetup={handleSmsSetup}
				handleSetShowAuthSetUp={handleSetShowAuthSetUp}
				isPhoneVerify={true}
				emailAuthentication={false}
				phoneAuthentication={false}
			/>
		);
		expect(screen.getByText("Authenticator")).toBeInTheDocument();
	});

	it("should call set state function", () => {
		const handleEmailAuth = jest.fn();
		const handleSetShowAuthSetUp = jest.fn();
		const handleSmsSetup = jest.fn();
		render(
			<MobileAuthenticator
				handleEmailAuth={handleEmailAuth}
				handleSmsSetup={handleSmsSetup}
				handleSetShowAuthSetUp={handleSetShowAuthSetUp}
				isPhoneVerify={true}
				emailAuthentication={false}
				phoneAuthentication={false}
			/>
		);
		const backButtonEl = screen.getByTestId("rg-authenticator-back-button");

		fireEvent.click(backButtonEl);
		expect(handleSetShowAuthSetUp).toHaveBeenCalledTimes(1);
	});
});
