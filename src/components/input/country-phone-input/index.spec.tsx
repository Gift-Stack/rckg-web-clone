import { fireEvent, render, screen } from "@testing-library/react";
import { Formik } from "formik";
import { act } from "react-dom/test-utils";
import CountryPhoneInput from ".";
import PhoneInput from "./PhoneInput";

const countries = [
	{
		currency: "AFN",
		dialCode: "93",
		flag: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Afghanistan.svg",
		name: "Afghanistan",
		unicodeFlag: "🇦🇫",
	},
	{
		currency: "ALL",
		dialCode: "355",
		flag: "https://upload.wikimedia.org/wikipedia/commons/3/36/Flag_of_Albania.svg",
		name: "Albania",
		unicodeFlag: "🇦🇱",
	},
	{
		currency: "NGN",
		dialCode: "234",
		flag: "https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg",
		name: "Nigeria",
		unicodeFlag: "🇳🇬",
	},
];

describe("PhoneInput", () => {
	it("renders properly", async () => {
		const setPhoneCode = jest.fn(() => "+234");
		const mockSubmitFn = jest.fn();

		render(
			<Formik initialValues={{ mobile_number: "" }} onSubmit={mockSubmitFn}>
				{(formik) => {
					return (
						<CountryPhoneInput
							countries={countries}
							value={formik.values.mobile_number}
							formik={formik}
							setPhoneCode={setPhoneCode}
						/>
					);
				}}
			</Formik>
		);

		const rg_cpi = screen.getByTestId("rg-cpi");
		const rg_cpi_select = screen.getByTestId("rg-cpi-select");
		const rg_cpi_select_option = screen.getAllByTestId("rg-cpi-select-option");
		act(() => {
			fireEvent.change(rg_cpi_select, { target: { value: "234" } });
		});
		expect(rg_cpi.children.length).toBe(2);
		expect(rg_cpi.children[0].className).toContain(
			"flex focus-within:shadow-active focus-within:border focus-within:border-primary-400"
		);
		expect(rg_cpi.children[0].children.length).toBe(2);
		expect(setPhoneCode).toHaveBeenCalled();
		expect(rg_cpi_select_option.length).toBe(3);
		expect((rg_cpi_select_option[0] as HTMLOptionElement).selected).toBeFalsy();
		expect((rg_cpi_select_option[1] as HTMLOptionElement).selected).toBeFalsy();
		expect(
			(rg_cpi_select_option[2] as HTMLOptionElement).selected
		).toBeTruthy();
	});
});
