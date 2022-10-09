import { fireEvent, render, screen } from "@testing-library/react";
import { Formik } from "formik";
import { act } from "react-dom/test-utils";
import PhoneInput from "./PhoneInput";

describe("PhoneInput", () => {
	it("renders properly", async () => {
		const mockSubmitFn = jest.fn();
		render(
			<Formik initialValues={{ mobile_number: "" }} onSubmit={mockSubmitFn}>
				{(formik) => {
					return (
						<PhoneInput
							onChange={formik.handleChange}
							type={"tel"}
							name={"mobile_number"}
							placeholder={"Mobile Number"}
							value={formik.values.mobile_number}
							autoComplete="off"
						/>
					);
				}}
			</Formik>
		);

		const phone_container = screen.getByTestId("rg-phone-input-container");
		const phone = screen.getByTestId("rg-phone-input");

		expect(phone_container.children[0].className).toContain(
			"input__container rounded bg-primary-100 focus-within:bg-white"
		);
		expect(phone_container.children.length).toBe(1);
		expect(phone).toBeInTheDocument();
		expect(phone).toHaveProperty("type", "tel");
		expect(phone).toHaveProperty("maxLength", 10);
	});

	it("phone input type should be tel", async () => {
		const mockSubmitFn = jest.fn();
		render(
			<Formik initialValues={{ mobile_number: "" }} onSubmit={mockSubmitFn}>
				{(formik) => {
					return (
						<PhoneInput
							onChange={formik.handleChange}
							type={"tel"}
							name={"mobile_number"}
							placeholder={"Mobile Number"}
							value={formik.values.mobile_number}
							autoComplete="off"
						/>
					);
				}}
			</Formik>
		);

		const phone = screen.getByTestId("rg-phone-input");
		expect(phone).toHaveProperty("type", "tel");
	});

	it("phone input works as expected", async () => {
		const mockSubmitFn = jest.fn();
		render(
			<Formik initialValues={{ mobile_number: "" }} onSubmit={mockSubmitFn}>
				{(formik) => {
					return (
						<PhoneInput
							onChange={formik.handleChange}
							type={"number"}
							name={"mobile_number"}
							placeholder={"Mobile Number"}
							value={formik.values.mobile_number}
							autoComplete="off"
						/>
					);
				}}
			</Formik>
		);

		const phone = screen.getByTestId("rg-phone-input");
		act(() => {
			fireEvent.change(phone, { target: { value: "7034343434" } });
		});
		expect(phone).toHaveProperty("value", "7034343434");
	});
});
