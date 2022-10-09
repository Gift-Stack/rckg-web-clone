/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Button from ".";
import { ButtonSize, ButtonState } from "./enum";
import { EmailIcon } from "../../assets";

describe("Button", () => {
	it("renders Button Properly", async () => {
		render(
			<Button
				size={ButtonSize.lg}
				variant={ButtonState.PRIMARY}
				value={"Click Me"}
				type={"button"}
			/>
		);
		const button = await screen.findByTestId("rg-button");
		expect(button.className).toContain(ButtonState.PRIMARY);
		expect(button.innerHTML).toEqual("Click Me");
		expect(button.className).toContain(ButtonSize.lg);
		expect(button.getAttribute("type")).toEqual("button");
	});

	it("Variant === Primary", async () => {
		render(
			<Button
				size={ButtonSize.lg}
				variant={ButtonState.PRIMARY}
				value={"Click Me"}
				type={"button"}
			/>
		);
		const button = await screen.findByTestId("rg-button");
		expect(button.className).toContain(ButtonState.PRIMARY);
	});

	it("Variant === SECONDARY", async () => {
		render(
			<Button
				size={ButtonSize.lg}
				variant={ButtonState.SECONDARY}
				value={"Click Me"}
				type={"button"}
			/>
		);
		const button = await screen.findByTestId("rg-button");
		expect(button.className).toContain(ButtonState.SECONDARY);
	});

	it("Variant === TERTIARY", async () => {
		render(
			<Button
				size={ButtonSize.lg}
				variant={ButtonState.TERTIARY}
				value={"Click Me"}
				type={"button"}
			/>
		);
		const button = await screen.findByTestId("rg-button");

		expect(button.className).toContain(ButtonState.TERTIARY);
	});
	it("Size == Large", async () => {
		render(<Button value={"Click Us"} type={"submit"} size={ButtonSize.lg} />);
		const button = await screen.findByTestId("rg-button");
		expect(button.className).toContain(ButtonSize.lg);
	});
	it("Size == Small", async () => {
		render(<Button value={"Click Us"} type={"submit"} size={ButtonSize.sm} />);
		const button = await screen.findByTestId("rg-button");
		expect(button.className).toContain(ButtonSize.sm);
	});
	it("disabled should be truthy", async () => {
		render(<Button value={"RUN"} disabled={true} />);
		const button = await screen.findByTestId("rg-button");
		expect(button.getAttribute("disabled")).toBeDefined();
		expect(button).toBeDisabled();
	});

	it("Button should have default value", async () => {
		render(<Button />);
		const button = await screen.getByTestId("rg-button");
		expect(button.innerHTML).toContain("Click Me");
	});
	it("Button should have a default variant", async () => {
		render(<Button />);
		const button = await screen.getByTestId("rg-button");
		expect(button.className).toContain(ButtonState.PRIMARY);
	});
	it("Button should have a default size", async () => {
		render(<Button />);
		const button = await screen.getByTestId("rg-button");
		expect(button.className).toContain(ButtonSize.lg);
	});
	it("Button should display icon", async () => {
		render(<Button icon={<EmailIcon />} />);
		const button = await screen.getByTestId("rg-button");
		const icon = await screen.getByTestId("rg-icon");
		expect(button.children).toHaveLength(1);
		expect(icon).toBeInTheDocument();
	});
	it("Button shouldn't have icon", async () => {
		render(<Button />);
		const button = await screen.getByTestId("rg-button");
		expect(button.children).toHaveLength(0);
	});
});
