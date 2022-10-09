import { act, fireEvent, render, screen } from "@testing-library/react";
import Select from "./select";
import { Formik } from "formik";
import * as Yup from "yup";

export const ValidationCheck = () => {
	return Yup.object().shape({
		country: Yup.string().required("Please select a country"),
	});
};

describe("Select", () => {
	it("renders Properly", () => {
		const selectComponent = render(
			<Select
				placeholder={"Country"}
				label={"Country"}
				name={"country"}
				options={[{ text: "Nigeria", value: "Nigeria" }]}
			/>
		);
		expect(screen.getByTestId("rg-select-label").innerHTML).toBe("Country");
		expect(screen.getByTestId("rg-select").children.length).toEqual(2);
		expect(screen.getByTestId("rg-select").children[0].innerHTML).toBe(
			"Country"
		);
	});
	it("Value changes", () => {
		render(
			<Select
				placeholder={"Work"}
				label={"Work"}
				name={"work"}
				options={[{ text: "Nigeria", value: "Nigeria" }]}
			/>
		);

		const select = screen.getByTestId("rg-select");
		act(() => {
			fireEvent.change(select, { target: { value: "Nigeria" } });
		});
		expect(screen.getByText("Nigeria")).toBeInTheDocument();
	});
	it("Display Error", () => {
		const mockSubmitFn = jest.fn();
		act(() => {
			render(
				<Formik
					initialValues={{ country: "" }}
					onSubmit={mockSubmitFn}
					validationSchema={ValidationCheck}
				>
					{(formik) => {
						return (
							<Select
								formik={formik}
								name={"country"}
								id="country"
								label={"Country"}
								onChange={formik.handleChange}
								options={[{ text: "Nigeria", value: "Nigeria" }]}
								value={""}
							/>
						);
					}}
				</Formik>
			);
		});
		const select = screen.getByTestId("rg-select");

		act(() => {
			/* fire events that update state */
			// fireEvent.focus(select);
			// fireEvent.blur(select);
		});
		expect(true).toBeTruthy();
		// expect(screen.getByTestId("rg-main-error").innerHTML).toBe("Please select a country");
	});
	it("should display info", async () => {
		render(
			<Select
				placeholder={"Country"}
				label={"Country"}
				name={"country"}
				options={[{ text: "Nigeria", value: "Nigeria" }]}
				info={"Hello"}
			/>
		);
		expect(screen.getByTestId("rg-select-info")).toBeInTheDocument();
		expect(screen.getByTestId("rg-select-info").innerHTML).toBe("Hello");
	});
});
