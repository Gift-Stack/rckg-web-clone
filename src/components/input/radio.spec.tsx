import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Radio from "./radio";

describe("Basic", () => {
	it("renders properly", async () => {
		const handleChange = jest.fn();
		render(
			<Radio
				group={"document"}
				id={"passport"}
				label={"Passport"}
				onChange={handleChange}
				value={"Passport"}
			/>
		);
		const radio = screen.getByTestId("rg-radio");
		const radio_input = screen.getByTestId("rg-radio-input");
		act(() => {
			fireEvent.click(radio);
		});
		expect(radio).toBeInTheDocument();
		expect(radio_input).toBeInTheDocument();
		expect(handleChange).toHaveBeenCalled();
	});
});
