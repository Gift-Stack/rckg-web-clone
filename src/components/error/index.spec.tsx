/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { ErrorUI } from "./ErrorUi";

describe("Error UI", () => {
	it("renders Properly", async () => {
		const resetErrorBoundaryFn = jest.fn();
		render(
			<ErrorUI
				error={"Oops an error occurred"}
				resetErrorBoundary={resetErrorBoundaryFn}
			/>
		);
		const container = screen.getByTestId("rg-error-ui-alert");
		expect(container.children.length).toEqual(3);
	});
});
