import FormError from "./index";
import { render, screen } from "@testing-library/react";

describe("Form Error", () => {
	it("should return password error", () => {
		render(
			<FormError
				errors={{
					password: "password length should be greater than or equals to 8",
				}}
				name={"password"}
				value={"chuckB"}
			/>
		);
		expect(screen.getByTestId("rg-password-error")).toBeTruthy();
		expect(screen.getByTestId("rg-password-length-error").className).toContain(
			"text-neutral-200"
		);
	});
	it("shouldn't have caps ", () => {
		render(
			<FormError
				errors={{ password: "should have at least one caps" }}
				name={"password"}
				value={"chuck"}
			/>
		);
		expect(screen.getByTestId("rg-password-hasCaps").className).toContain(
			"text-neutral-200"
		);
	});
	it("shouldn't have a special character", () => {
		render(
			<FormError
				errors={{ password: "should have at least 1 special character" }}
				name={"password"}
				value={"chuckBASS"}
			/>
		);
		expect(
			screen.getByTestId("rg-password-hasSpecialCharacter").className
		).toContain("text-neutral-200");
	});
	it("shouldn't have a number(Digit)", () => {
		render(
			<FormError
				errors={{ password: "should have at least 1 digit" }}
				name={"password"}
				value={"chuckBAD"}
			/>
		);
		expect(screen.getByTestId("rg-password-hasDigit").className).toContain(
			"text-neutral-200"
		);
	});
	it("should display main error if not password", () => {
		render(
			<FormError
				errors={{ name: "name must be 6 digit long" }}
				name={"name"}
				value={"aimes"}
			/>
		);
		expect(screen.getByTestId("rg-main-error").className).toContain(
			"text-error-main text-labels mt-2"
		);
		expect(screen.getByTestId("rg-main-error").innerHTML).toBe(
			"name must be 6 digit long"
		);
	});
});
