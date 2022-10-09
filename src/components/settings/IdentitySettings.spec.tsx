import { render, screen } from "@testing-library/react";
import IdentitySettings from "./IdentitySettings";

describe("IdentitySettings", () => {
	it("should render correctly", () => {
		render(<IdentitySettings isEmailVerify={false} />);
		expect(screen.getByTestId("identity-settings")).toBeTruthy();
	});
});
