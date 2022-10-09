import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Tabs from ".";
import { TabsItem } from "./model";

const tabsItem: TabsItem[] = [
	{
		id: 1,
		name: ["Spot"],
	},
	{
		id: 2,
		name: ["Margin", "Cross 3x"],
	},
	{
		id: 3,
		name: ["Margin", "Isolated 10x"],
	},
];

const tabsItems2: TabsItem[] = [
	{
		id: 1,
		name: ["Limit"],
	},
	{
		id: 2,
		name: ["Market"],
	},
	{
		id: 3,
		name: ["Stop Limit"],
	},
];

describe("Tabs", () => {
	it("renders properly", async () => {
		const setOpenTab = jest.fn();
		render(<Tabs tabs={tabsItem} openTab={0} opened={setOpenTab} />);

		const tabs = screen.getByTestId("rg-spot-tabs");
		const tabs_list = screen.getByTestId("rg-spot-tabs-list");
		expect(tabs.children.length).toBe(1);
		expect(tabs_list.children.length).toBe(3);
		expect(tabs_list.className).toContain("flex mb-0 list-none");
	});

	it("render one name", async () => {
		const setOpenTab = jest.fn();
		render(<Tabs tabs={[tabsItem[0]]} openTab={0} opened={setOpenTab} />);

		const tabs_list = screen.getByTestId("rg-spot-tabs-list");
		const all_tabs = screen.getByTestId("rg-spot-tab");
		act(() => {
			fireEvent.click(all_tabs);
		});
		expect(tabs_list.children.length).toBe(1);
	});

	it("pass width prop and check if it exists", async () => {
		const setOpenTab = jest.fn();
		render(
			<Tabs tabs={tabsItems2} openTab={0} opened={setOpenTab} width={"w-1/2"} />
		);

		const tabs = screen.getByTestId("rg-spot-tabs");
		expect(tabs.className).toContain("flex");
		expect(tabs.children[0].className).toContain("w-1/2");
		expect(tabs.children.length).toBe(2);
	});
});
