import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import TableSelect from "./TableSelect";

describe("TableSelect", () => {
	it("renders properly", async () => {
		const handleSelectChange = jest.fn();
		render(
			<TableSelect
				options={["All Coins", "NGN"]}
				label={"Coins"}
				placeholder={"Select Coin"}
				onChange={(value) => handleSelectChange("coin", value)}
			/>
		);

		const container = screen.getByTestId("rg-table-select-container");
		const select = screen.getByTestId("rg-table-select");
		const options = screen.getAllByTestId("rg-table-select-option");
		act(() => {
			fireEvent.change(select, { target: { value: "NGN" } });
		});
		expect(container).toBeInTheDocument();
		expect(container.children.length).toBe(2);
		expect(container.innerHTML).toContain("Coins");
		expect(select).toBeInTheDocument();
		expect(options).toHaveLength(3);
		expect(options[0].innerHTML).toContain("Select Coin");
		expect(handleSelectChange).toHaveBeenCalled();
	});

	it("renders empty option if empty option array is passed", async () => {
		const handleSelectChange = jest.fn();
		render(
			<TableSelect
				options={[]}
				label={"Coins"}
				placeholder={"Select Coin"}
				onChange={(value) => handleSelectChange("coin", value)}
			/>
		);

		const options = screen.getAllByTestId("rg-table-select-option");
		expect(options).toHaveLength(1);
	});
});
