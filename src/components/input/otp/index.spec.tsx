import { act, fireEvent, render, screen } from "@testing-library/react";
import OtpVerificationInput from ".";

describe("OtpInput", () => {
	it.todo("OtpInput");
	// it("should render properly", async () => {
	// 	const length: number = 6;
	// 	const mockOTPChangeFn = jest.fn();
	// 	const { getAllByTestId } = render(
	// 		<OtpVerificationInput
	// 			length={length}
	// 			isInvalidOTP={false}
	// 			onChangeOTP={mockOTPChangeFn}
	// 			setIsInvalid={(otp) => null}
	// 		/>
	// 	);
	// 	const optComponents = getAllByTestId("rg-otp-input-single");
	// 	expect(optComponents.length).toBe(length);
	// });

	// it("should change input field color if otp is invalid with border width", async () => {
	// 	const mockOTPChangeFn = jest.fn();

	// 	const { getAllByTestId } = render(
	// 		<OtpVerificationInput
	// 			length={6}
	// 			isInvalidOTP={false}
	// 			onChangeOTP={mockOTPChangeFn}
	// 			setIsInvalid={(otp) => null}
	// 		/>
	// 	);
	// 	const optComponent = getAllByTestId("rg-otp-input-single");
	// 	const style = window.getComputedStyle(optComponent[0]);
	// 	expect(style.borderWidth).toBe("2px");
	// });

	// it("input should accept only APHANUMERIC", async () => {
	// 	const mockOTPChangeFn = jest.fn();
	// 	const { getAllByTestId } = render(
	// 		<OtpVerificationInput
	// 			length={6}
	// 			isInvalidOTP={false}
	// 			onChangeOTP={mockOTPChangeFn}
	// 			setIsInvalid={() => null}
	// 		/>
	// 	);
	// 	const inputs = getAllByTestId("rg-otp-input-single");
	// 	fireEvent.change(inputs[0], { target: { value: "1" } });
	// 	expect(getAllByTestId("rg-otp-input-single")[0]).toHaveValue("1");
	// 	expect(mockOTPChangeFn).toHaveBeenCalled();
	// });

	// it("input should ignore SPECIAL CHARACTERs on change", async () => {
	// 	const mockOTPChangeFn = jest.fn();

	// 	const { getAllByTestId } = render(
	// 		<OtpVerificationInput
	// 			length={6}
	// 			isInvalidOTP={false}
	// 			onChangeOTP={mockOTPChangeFn}
	// 			setIsInvalid={() => null}
	// 		/>
	// 	);
	// 	const inputs = getAllByTestId("rg-otp-input-single");
	// 	fireEvent.change(inputs[0], { target: { value: "@" } });
	// 	expect(getAllByTestId("rg-otp-input-single")[0]).not.toHaveValue();
	// });

	// it("should display ERROR Message when otp is invalid", () => {
	// 	const mockOTPChangeFn = jest.fn();

	// 	const { getByTestId } = render(
	// 		<OtpVerificationInput
	// 			length={6}
	// 			isInvalidOTP={true}
	// 			onChangeOTP={mockOTPChangeFn}
	// 			setIsInvalid={() => null}
	// 		/>
	// 	);
	// 	const otpContainer = getByTestId("rg-otp-container");
	// 	expect(otpContainer.children.length).toBe(2);
	// });
	// it("should display ERROR Message when otp is invalid", () => {
	// 	const mockOTPChangeFn = jest.fn();

	// 	const { getByTestId } = render(
	// 		<OtpVerificationInput
	// 			length={6}
	// 			isInvalidOTP={true}
	// 			onChangeOTP={mockOTPChangeFn}
	// 			setIsInvalid={() => null}
	// 		/>
	// 	);
	// 	const otpContainer = getByTestId("rg-otp-container");
	// 	const errorParagraph = getByTestId("rg-otp-error");
	// 	expect(errorParagraph).toBeInTheDocument();
	// 	expect(otpContainer.children.length).toBe(2);
	// });

	// it("first input should focus on render", () => {
	// 	const mockOTPChangeFn = jest.fn();

	// 	const { getAllByTestId } = render(
	// 		<OtpVerificationInput
	// 			length={6}
	// 			isInvalidOTP={false}
	// 			onChangeOTP={mockOTPChangeFn}
	// 			setIsInvalid={() => null}
	// 		/>
	// 	);
	// 	const otpComponents = getAllByTestId("rg-otp-input-single");
	// 	expect(otpComponents[0]).toHaveFocus();
	// });
});
