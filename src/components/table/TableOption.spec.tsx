import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { TableOptionState } from "./enum";
import TableOption from "./TableOption";

describe("TableOption", () => {
	it("renders properly", async () => {
		const handleClick = jest.fn();
		render(<TableOption optionClick={handleClick} value={"BTC"} />);

		const option = screen.getByTestId("rg-table-option");
		act(() => {
			fireEvent.click(option);
		});
		expect(option).toBeInTheDocument();
		expect(option.innerHTML).toContain("BTC");
		expect(option.className).toContain(TableOptionState.PRIMARY);
		expect(option.className).not.toContain(TableOptionState.SECONDARY);
		expect(handleClick).toHaveBeenCalled();
	});

	it("has secondary style class", async () => {
		const handleClick = jest.fn();
		render(
			<TableOption
				optionClick={handleClick}
				value={"BTC"}
				variant={TableOptionState.SECONDARY}
			/>
		);

		const option = screen.getByTestId("rg-table-option");
		expect(option.className).toContain(TableOptionState.SECONDARY);
	});

	it("has tertiary style class", async () => {
		const handleClick = jest.fn();
		render(
			<TableOption
				optionClick={handleClick}
				value={"BTC"}
				variant={TableOptionState.TERTIARY}
			/>
		);

		const option = screen.getByTestId("rg-table-option");
		expect(option.className).toContain(TableOptionState.TERTIARY);
	});
});
