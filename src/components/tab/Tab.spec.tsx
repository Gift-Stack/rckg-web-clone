import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Tab from "./Tab";

describe("Tab", () => {
	it("renders properly", async () => {
		const setOpenTab = jest.fn();
		render(
			<Tab name={["Limit"]} tabIndex={0} openTab={0} setOpenTab={setOpenTab} />
		);

		const tab = screen.getByTestId("rg-spot-tab");
		const anchor = screen.getByTestId("rg-spot-tab-anchor");
		act(() => {
			fireEvent.click(anchor);
		});
		expect(setOpenTab).toHaveBeenCalled();
		expect(tab).toBeInTheDocument();
		expect(tab.innerHTML).toContain("Limit");
		expect(tab.children.length).toBe(1);
		expect(tab.className).toContain(
			"last:mr-0 border-b-2 text-center flex-1 border-blue"
		);
		expect(tab.children[0].children[0].className).toContain(
			"text-x-small font-medium px-2 block leading-normal text-neutral-400"
		);
	});

	it("renders longer titles", async () => {
		const setOpenTab = jest.fn();
		render(
			<Tab
				name={["Margin", "Isolated 10x"]}
				tabIndex={0}
				openTab={0}
				setOpenTab={setOpenTab}
			/>
		);

		const tab = screen.getByTestId("rg-spot-tab");
		expect(tab.innerHTML).toContain("Margin");
		expect(tab.innerHTML).toContain("Isolated 10x");
	});

	it("renders no title", async () => {
		const setOpenTab = jest.fn();
		render(<Tab name={[]} tabIndex={0} openTab={0} setOpenTab={setOpenTab} />);

		const tab = screen.getByTestId("rg-spot-tab");
		expect(tab.innerHTML).not.toContain("Margin");
	});
});
