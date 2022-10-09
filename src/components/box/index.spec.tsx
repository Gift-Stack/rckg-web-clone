/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Box from ".";
import { BoxFillState, BoxOutlineState } from "./enum";

describe("Box", () => {
	it("renders Box Properly", async () => {
		render(
			<Box
				fill={BoxFillState.PRIMARY}
				outline={BoxOutlineState.NONE}
				height={"h-4"}
				width={"w-4"}
			/>
		);
		const box = await screen.findByTestId("rg-box");
		expect(box.className).toContain(BoxFillState.PRIMARY);
		expect(box.className).toContain(BoxOutlineState.NONE);
		expect(box.className).toContain("h-4");
		expect(box.className).toContain("w-4");
	});

	it("Box should have default value", async () => {
		render(<Box />);
		const box = await screen.findByTestId("rg-box");
		expect(box.className).toContain(BoxFillState.NONE);
		expect(box.className).toContain(BoxOutlineState.TERTIARY);
		expect(box.className).toContain("h-2");
		expect(box.className).toContain("w-2");
	});
});
