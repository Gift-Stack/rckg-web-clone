import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Progress from ".";
import { ProgressActiveState } from "./enum";
import { items } from "./data";

describe("Progress", () => {
	it("renders Progress component properly", async () => {
		render(<Progress items={items} activeIndex={0} />);

		const progress = await screen.getByTestId("rg-progress");
		const progressTitle = await screen.getByTestId("rg-progress-title");
		const activeProgress = screen.getAllByTestId("rg-active-progress");

		act(() => {
			fireEvent.click(progress);
		});
		expect(progress.children.length).toBe(2);
		expect(progressTitle.innerHTML).toContain("Basic Info");
		expect(progressTitle.innerHTML).toContain("1 of 3");
		expect(activeProgress.length).toBe(1);
		expect(activeProgress[0].className).toContain(ProgressActiveState.PRIMARY);
		expect(activeProgress[0].style.width).toBe((1 / 3) * 100 + "%");
	});

	it("confirm onFinish is clicked when active index exceeds the total number of indexes", async () => {
		render(<Progress items={items} activeIndex={2} />);

		const progress = await screen.getByTestId("rg-progress");

		act(() => {
			fireEvent.click(progress);
		});
	});
});
