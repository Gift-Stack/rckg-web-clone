import { screen, render } from "@testing-library/react";
import { AuthForm } from ".";
import { expect } from "@jest/globals";

describe("Auth Form Container", () => {
	it("should render properly", async () => {
		render(
			<AuthForm>
				<h1>Login</h1>
			</AuthForm>
		);
		const container = screen.getByTestId("rg-auth-form-container");
		expect(container.children.length).toEqual(1);
	});
	it("Logo Area and logo should be present", async () => {
		render(
			<AuthForm>
				<h1>Login</h1>
			</AuthForm>
		);
		const logoArea = screen.getByTestId("rg-logo-area");
		expect(logoArea.children.length).toEqual(1);
	});
});
