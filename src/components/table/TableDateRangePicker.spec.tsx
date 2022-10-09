import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import TableDateRangePicker from "./TableDateRangePicker";

describe("TableSelect", () => {
	it("renders properly", async () => {
		const setInitialDate = jest.fn();
		const setFinalDate = jest.fn();
		render(
			<TableDateRangePicker
				getInitial={(value: string) => setInitialDate(value)}
				getFinal={(value: string) => setFinalDate(value)}
			/>
		);

		const container = screen.getByTestId(
			"rg-table-date-range-picker-container"
		);
		const initial = screen.getByTestId("rg-table-date-range-picker-initial");
		const final = screen.getByTestId("rg-table-date-range-picker-final");
		expect(container).toBeInTheDocument();
		expect(initial).toBeInTheDocument();
		expect(final).toBeInTheDocument();

		act(() => {
			fireEvent.change(initial, {
				target: { value: new Date(Date.now()).toISOString() },
			});
			fireEvent.change(final, {
				target: { value: new Date(Date.now()).toISOString() },
			});
		});
		expect(setInitialDate).toHaveBeenCalled();
		expect(setFinalDate).toHaveBeenCalled();
	});
});
