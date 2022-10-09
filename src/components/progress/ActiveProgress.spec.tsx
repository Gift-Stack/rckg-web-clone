import { render, screen } from "@testing-library/react";
import { ProgressActiveState } from "./enum";
import ActiveProgress from "./ActiveProgress";

describe("ActiveProgress", () => {
	it("renders ActiveProgress Properly with all possible data", async () => {
		render(<ActiveProgress length={3} state={ProgressActiveState.PRIMARY} />);
		const progress = await screen.getByTestId("rg-active-progress");
		expect(progress.className).toContain(ProgressActiveState.PRIMARY);
		expect(progress.style.width).toBe((1 / 3) * 100 + "%");
	});
});
