import { fireEvent, render, screen } from "@testing-library/react";
import { List, More, Play } from "../../../assets";
import { act } from "react-dom/test-utils";
import { ITableAction } from "../model";
import { orderListTableActions, orderListTableOptions } from "./data";
import OrderListTableContainer from "./OrderListTableContainer";

const _setTableActions = (): ITableAction[] => {
	const data: ITableAction[] = orderListTableActions.map((a) => {
		return {
			name: a.name,
			action: (
				<>
					<div className="flex items-center transaction-select-item text-neutral-400">
						<span className={"ml-2"}>
							{a.name === "Watch Tutorial" ? (
								<Play />
							) : a.name === "Orders" ? (
								<List />
							) : (
								<More />
							)}
						</span>
						<span className="font-normal ml-2 block truncate lg:text-labels text-x-small">
							{a.name}
						</span>
					</div>
				</>
			),
		};
	});
	return data;
};

describe("OrderListTableContainer", () => {
	it("renders properly", async () => {
		const filterTableOptions = jest.fn();
		const handleTableAction = jest.fn();
		const handleFilter = jest.fn();
		const handleDownload = jest.fn();
		render(
			<OrderListTableContainer
				cssClass="sm:py-8 sm:px-0 py-5 px-5 rounded bg-white h-full"
				title="Market"
				tableOptions={orderListTableOptions}
				handleOption={(value) => filterTableOptions(value)}
				tableActions={_setTableActions()}
				handleAction={(value) => handleTableAction(value)}
				filter={handleFilter}
				handleDownload={handleDownload}
			>
				<div>Test</div>
			</OrderListTableContainer>
		);

		const container = screen.getByTestId("rg-order-list-table-container");
		const options = screen.getAllByTestId("rg-table-option");
		const actions = screen.getAllByTestId(
			"rg-order-list-table-container-action"
		);
		const download = screen.getByTestId(
			"rg-order-list-table-container-download"
		);
		const filter = screen.getByTestId("rg-order-list-table-container-filter");
		expect(container).toBeInTheDocument();
		expect(container.children.length).toBe(2);
		expect(container.children[1].className).toContain(
			"sm:py-8 sm:px-0 py-5 px-5 rounded bg-white h-full"
		);
		expect(options).toHaveLength(2);
		expect(actions).toHaveLength(3);
		act(() => {
			fireEvent.click(options[0]);
			fireEvent.click(actions[0]);
			fireEvent.click(download);
			fireEvent.click(filter);
		});
		expect(filterTableOptions).toHaveBeenCalled();
		expect(handleTableAction).toHaveBeenCalled();
		expect(handleFilter).toHaveBeenCalled();
		expect(handleDownload).toHaveBeenCalled();
	});

	it("renders empty table options and actions", async () => {
		const filterTableOptions = jest.fn();
		const handleTableAction = jest.fn();
		const handleFilter = jest.fn();
		const handleDownload = jest.fn();
		render(
			<OrderListTableContainer
				cssClass="sm:py-8 sm:px-0 py-5 px-5 rounded bg-white h-full"
				title="Market"
				tableOptions={[]}
				handleOption={(value) => filterTableOptions(value)}
				tableActions={[]}
				handleAction={(value) => handleTableAction(value)}
				filter={handleFilter}
				handleDownload={handleDownload}
			>
				<div>Test</div>
			</OrderListTableContainer>
		);

		const emptyOptions = screen.getByTestId("rg-order-list-table-empty-option");
		const emptyActions = screen.getByTestId("rg-order-list-table-empty-action");
		expect(emptyOptions).toBeInTheDocument();
		expect(emptyActions).toBeInTheDocument();
	});
});
