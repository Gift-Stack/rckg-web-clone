/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TermsCondition } from ".";

describe("Terms Condition", () => {
	it("renders Properly", async () => {
		const mockAcceptFn = jest.fn();
		render(<TermsCondition accepted={true} handleAccepted={mockAcceptFn} />);
		const container = screen.getByTestId("rg-checkbox-container");
		expect(container.children.length).toBeLessThanOrEqual(3);
	});
	it("Checkbox", async () => {
		const mockAcceptFn = jest.fn();
		render(<TermsCondition accepted={true} handleAccepted={mockAcceptFn} />);
		const checkbox = screen.getByTestId("rg-checkbox");
		expect(checkbox).toHaveProperty("checked", true);
	});
	it("onChange works", async () => {
		const mockAcceptFn = jest.fn();
		render(<TermsCondition accepted={true} handleAccepted={mockAcceptFn} />);
		const checkbox = screen.getByTestId("rg-checkbox");
		fireEvent.change(checkbox, { target: { checked: false } });
		expect(checkbox).toHaveProperty("checked", false);
	});
});
