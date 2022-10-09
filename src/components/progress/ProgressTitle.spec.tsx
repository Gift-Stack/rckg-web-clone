import { render, screen } from "@testing-library/react";
import { ProgressActiveState } from "./enum";
import ProgressTitle from "./ProgressTitle";

describe("ProgressTitle", () => {
	it("renders ProgressTitle properly", async () => {
		render(<ProgressTitle title={"Basic Info"} activeIndex={1} length={3} />);
		const progress = await screen.getByTestId("rg-progress-title");
		expect(progress.innerHTML).toContain("2 of 3");
		expect(progress.innerHTML).toContain("Basic Info");
	});

	it("confirm active index 0 added 1 to the index and renders 1/3", async () => {
		render(<ProgressTitle title={"Basic Info"} activeIndex={0} length={3} />);
		const progress = await screen.getByTestId("rg-progress-title");
		expect(progress.innerHTML).toContain("1 of 3");
	});
});
