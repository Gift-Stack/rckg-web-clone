import { fireEvent, render, screen } from "@testing-library/react";
import { Formik } from "formik";
import { act } from "react-dom/test-utils";
import PhoneVerification from "./PhoneVerification";

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
];

describe("PhoneVerification", () => {
	it("renders properly", async () => {
		const onSubmit = jest.fn();
		const handleGetCode = jest.fn();
		const { getAllByTestId } = render(
			<Formik initialValues={{ mobile_number: "" }} onSubmit={onSubmit}>
				{(formik) => {
					return <PhoneVerification countries={[]} isPhoneVerify={false}/>;
				}}
			</Formik>
		);

		const phone_form = screen.getByTestId("phone-verification-form");
		const security_assurance = screen.getByTestId("security-assurance");
		const basic_button_area = screen.getByTestId("basic-button-area");
		const rg_cpi = screen.getByTestId("rg-cpi");
		const rg_get_code = await screen.getAllByTestId("rg-get-code");
		const inputs = getAllByTestId("rg-otp-input-single");
		const phoneinput = screen.getByTestId("rg-phone-input");
		fireEvent.change(inputs[0], { target: { value: "1" } });
		act(() => {
			fireEvent.submit(phone_form);
			fireEvent.click(rg_get_code[0]);
			fireEvent.click(rg_get_code[1]);
			fireEvent.change(phoneinput, { target: { value: "07039347005" } });
		});
		act(() => {
			fireEvent.change(phoneinput, { target: { value: "070" } });
		});
		// expect(getAllByTestId("rg-otp-input-single")[0]).toHaveValue("1");
		expect(phone_form.children.length).toBe(4);
		expect(security_assurance.children.length).toBe(2);
		expect(basic_button_area.children.length).toBe(1);
		expect(rg_cpi).toBeInTheDocument();
		expect(rg_get_code[0]).toBeInTheDocument();
		expect(rg_get_code[1]).toBeInTheDocument();
		expect(rg_get_code.length).toBe(2);
	});
});
