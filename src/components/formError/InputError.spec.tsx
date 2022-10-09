import React from "react";
import InputError from "./InputError";
import { render, screen } from "@testing-library/react";

describe("InputError", () => {
	it("should render correctly", () => {
		render(<InputError />);
		expect(screen.queryByTestId("input-error-container")).toBeNull();
		expect(screen.queryByTestId("input-errors-container")).toBeNull();
	});
	it("should not render if no error message", () => {
		render(<InputError error={"error"} />);
		expect(screen.getByTestId("input-error-box")).toBeInTheDocument();
		expect(screen.queryByTestId("input-errors-box")).toBeNull();
	});
	it("should display list of errors", () => {
		render(<InputError errors={["error one", "error two", "error three"]} />);
		expect(screen.getByTestId("input-errors-container").children.length).toBe(
			3
		);
	});
});
