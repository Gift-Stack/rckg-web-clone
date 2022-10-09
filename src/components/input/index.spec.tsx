/**
 * @jest-environment jsdom
 */
import { act, fireEvent, render, screen } from "@testing-library/react";
import Input from ".";
import { Eye } from "../../assets";
import { Formik } from "formik";

import * as Yup from "yup";
import { passwordRegExp } from "../../constants";

export const ValidationCheck = () => {
	return Yup.object().shape({
		full_name: Yup.string()
			.required("Full Name must be a string")
			.min(4, "Must be more than 4 character"),
		password: Yup.string()
			.required("Please Enter your password")
			.matches(
				passwordRegExp,
				"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
			),
	});
};

describe("Input", () => {
	it("renders Input Properly", () => {
		const mockSubmitFn = jest.fn();

		render(
			<Formik initialValues={{ phone_number: "" }} onSubmit={mockSubmitFn}>
				{(formik) => {
					return (
						<Input
							formik={formik}
							label={"Phone Number"}
							name={"phone"}
							type={"phone"}
							id={"phone_number"}
							onChange={formik.handleChange}
							value={formik.values.phone_number}
						/>
					);
				}}
			</Formik>
		);
		const inputComponent = screen.getByTestId("rg-input-component");
		const label = screen.getByTestId("rg-input-label");
		expect(inputComponent.children.length).toBe(3);
		expect(inputComponent).toBeInTheDocument();
		expect(label).toHaveProperty("htmlFor", "phone_number");
		expect(label.innerHTML).toBe("Phone Number");
	});
	it("input type should be text", async () => {
		const mockSubmitFn = jest.fn();

		render(
			<Formik initialValues={{ full_name: "" }} onSubmit={mockSubmitFn}>
				{(formik) => {
					return (
						<Input
							formik={formik}
							name={"full_name"}
							label={"Full Name"}
							id="full_name"
							onChange={formik.handleChange}
							value={formik.values.full_name}
						/>
					);
				}}
			</Formik>
		);
		const input = screen.getByTestId("rg-input");
		expect(input).toHaveProperty("type", "text");
	});

	it("Input works as expected", async () => {
		const mockSubmitFn = jest.fn();
		act(() => {
			render(
				<Formik initialValues={{ full_name: "" }} onSubmit={mockSubmitFn}>
					{(formik) => {
						return (
							<Input
								formik={formik}
								name={"full_name"}
								id="full_name"
								label={"Full Name"}
								type={"text"}
								onChange={formik.handleChange}
								value={formik.values.full_name}
							/>
						);
					}}
				</Formik>
			);
		});
		const input = screen.getByTestId("rg-input");
		act(() => {
			/* fire events that update state */
			fireEvent.change(input, { target: { value: "John Doe" } });
		});
		expect(input).toHaveProperty("value", "John Doe");
	});

	it("Input component children length should be 4", async () => {
		const mockSubmitFn = jest.fn();

		render(
			<Formik initialValues={{ full_name: "" }} onSubmit={mockSubmitFn}>
				{(formik) => {
					return (
						<Input
							name={"full_name"}
							label={"Full Name"}
							formik={formik}
							type={"text"}
							icon={<Eye />}
							info={"Hello world"}
							onChange={formik.handleChange}
							value={formik.values.full_name}
						/>
					);
				}}
			</Formik>
		);
		const inputComponent = screen.getByTestId("rg-input-component");
		expect(inputComponent.children.length).toBe(4);
	});

	it("input container children length should be 1", async () => {
		const mockSubmitFn = jest.fn();

		render(
			<Formik initialValues={{ full_name: "" }} onSubmit={mockSubmitFn}>
				{(formik) => {
					return (
						<Input
							name={"full_name"}
							label={"Full Name"}
							type={"text"}
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.full_name}
						/>
					);
				}}
			</Formik>
		);
		const inputContainer = screen.getByTestId("rg-input-container");
		expect(inputContainer.children.length).toBe(1);
	});

	it("input container children length should be 2", async () => {
		const mockSubmitFn = jest.fn();

		render(
			<Formik initialValues={{ full_name: "" }} onSubmit={mockSubmitFn}>
				{(formik) => {
					return (
						<Input
							name={"full_name"}
							label={"Full Name"}
							type={"text"}
							icon={<Eye />}
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.full_name}
						/>
					);
				}}
			</Formik>
		);
		const inputContainer = screen.getByTestId("rg-input-container");
		expect(inputContainer.children.length).toBe(2);
	});

	it("Input Label", async () => {
		const mockSubmitFn = jest.fn();

		render(
			<Formik initialValues={{ full_name: "" }} onSubmit={mockSubmitFn}>
				{(formik) => {
					return (
						<Input
							name={"full_name"}
							label={"Full Name"}
							type={"text"}
							id="full_name"
							icon={<Eye />}
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.full_name}
						/>
					);
				}}
			</Formik>
		);
		const label = screen.getByTestId("rg-input-label");
		expect(label).toHaveProperty("htmlFor", "full_name");
	});
	it("Input should have info", async () => {
		const mockSubmitFn = jest.fn();

		render(
			<Formik initialValues={{ full_name: "" }} onSubmit={mockSubmitFn}>
				{(formik) => {
					return (
						<Input
							name={"full_name"}
							label={"Full Name"}
							type={"text"}
							id="full_name"
							icon={<Eye />}
							info={"Hello"}
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.full_name}
						/>
					);
				}}
			</Formik>
		);
		const info = screen.getByTestId("rg-input-info");
		expect(info.innerHTML).toBe("Hello");
	});
	it("info should  display", async () => {
		const mockSubmitFn = jest.fn();

		render(
			<Formik initialValues={{ full_name: "" }} onSubmit={mockSubmitFn}>
				{(formik) => {
					return (
						<Input
							name={"full_name"}
							label={"Full Name"}
							type={"text"}
							id="full_name"
							icon={<Eye />}
							info={"Hello"}
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.full_name}
						/>
					);
				}}
			</Formik>
		);
		const info = screen.getByTestId("rg-input-info");
		expect(info).toBeInTheDocument();
	});
	it("Should render error proper", async () => {
		const mockSubmitFn = jest.fn();

		act(() => {
			render(
				<Formik
					initialValues={{ full_name: "" }}
					validationSchema={ValidationCheck}
					onSubmit={mockSubmitFn}
				>
					{(formik) => {
						return (
							<Input
								formik={formik}
								name={"full_name"}
								id="full_name"
								label={"Full Name"}
								type={"text"}
								onChange={formik.handleChange}
								value={formik.values.full_name}
							/>
						);
					}}
				</Formik>
			);
		});
		const input = screen.getByTestId("rg-input");
		const mainError = screen.getByTestId("rg-main-error");
		act(() => {
			/* fire events that update state */
			fireEvent.focus(input);
			fireEvent.change(input, { target: { value: "Jo" } });
		});
		expect(input).toHaveProperty("value", "Jo");
		expect(mainError).toBeInTheDocument();
	});
	it("Should render error component for input type password correctly ", async () => {
		const mockSubmitFn = jest.fn();
		act(() => {
			render(
				<Formik
					initialValues={{ password: "" }}
					validationSchema={ValidationCheck}
					onSubmit={mockSubmitFn}
				>
					{(formik) => {
						return (
							<Input
								formik={formik}
								name={"password"}
								id="password"
								label={"Password"}
								type={"password"}
								onChange={formik.handleChange}
								value={formik.values.password}
							/>
						);
					}}
				</Formik>
			);
		});
		const input = screen.getByTestId("rg-input");
		act(() => {
			/* fire events that update state */
			fireEvent.change(input, { target: { value: "Jo" } });
			fireEvent.blur(input);
		});

		const passwordError = screen.getByTestId("rg-password-error");
		expect(input).toHaveProperty("value", "Jo");
		expect(passwordError).toBeInTheDocument();
	});
});
