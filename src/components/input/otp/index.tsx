import React, { FC, useCallback, useEffect, useState } from "react";
import SingleOTPInput from "./SingleOTPInput";

export interface OTPVerificationProps {
	length: number;
	isInvalidOTP: boolean;
	onChangeOTP: (otp: string) => any;
	setIsInvalid: (value: boolean) => void;
}

const OtpVerificationInput: FC<OTPVerificationProps> = (props) => {
	const { onChangeOTP, setIsInvalid, isInvalidOTP, length, ...rest } = props;

	const [activeInput, setActiveInput] = useState(0);
	const [otpValues, setOTPValues] = useState(Array<string>(length).fill(""));

	// Helper to return OTP from inputs
	const handleOtpChange = useCallback(
		(otp: string[]) => {
			const otpValue = otp.join("");
			onChangeOTP(otpValue);
		},
		[onChangeOTP]
	);

	// Change OTP value at focussing input
	const changeCodeAtFocus = useCallback(
		(str: string) => {
			const updatedOTPValues = [...otpValues];
			updatedOTPValues[activeInput] = str;
			setOTPValues(updatedOTPValues);
			handleOtpChange(updatedOTPValues);
			setIsInvalid(false);
		},
		[activeInput, handleOtpChange, otpValues, setIsInvalid]
	);

	// Focus `inputIndex` input
	const focusInput = useCallback(
		(inputIndex: number) => {
			const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
			setActiveInput(selectedIndex);
		},
		[length]
	);

	const focusPrevInput = useCallback(() => {
		focusInput(activeInput - 1);
	}, [activeInput, focusInput]);

	const focusNextInput = useCallback(() => {
		focusInput(activeInput + 1);
	}, [activeInput, focusInput]);

	// Handle onFocus input
	const handleOnFocus = useCallback(
		(index: number) => () => {
			focusInput(index);
		},
		[focusInput]
	);

	// Handle onChange value for each input
	const handleOnChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const val = e.currentTarget.value;
			const alphaNumeric = /^[0-9]+$/;
			// const alphaNumeric = /^[a-zA-Z0-9]+$/;
			if (!val || !val.match(alphaNumeric)) {
				e.preventDefault();
				setIsInvalid(true);
				return;
			}
			changeCodeAtFocus(val);
			focusNextInput();
		},
		[changeCodeAtFocus, focusNextInput, setIsInvalid]
	);

	// Handle onBlur input
	const onBlur = useCallback(() => {
		setActiveInput(-1);
	}, []);

	useEffect(() => {
		if (isInvalidOTP) {
			onBlur();
		}
	}, [isInvalidOTP, onBlur]);

	// Handle onKeyDown input
	const handleOnKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			switch (e.key) {
				case "Backspace":
				case "Delete": {
					e.preventDefault();
					if (otpValues[activeInput]) {
						changeCodeAtFocus("");
					} else {
						focusPrevInput();
					}
					break;
				}
				case "ArrowLeft": {
					e.preventDefault();
					focusPrevInput();
					break;
				}
				case "ArrowRight": {
					e.preventDefault();
					focusNextInput();
					break;
				}
				default:
					break;
			}
		},
		[activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues]
	);

	const handleOnPaste = useCallback(
		(e: React.ClipboardEvent<HTMLInputElement>) => {
			e.preventDefault();
			const pastedData = e.clipboardData
				.getData("text/plain")
				.trim()
				.slice(0, length - activeInput)
				.split("");

			const alphaNumeric = /^[a-zA-Z0-9]+$/;
			const isAlphaNumeric = pastedData.join("").match(alphaNumeric);
			if (pastedData && isAlphaNumeric) {
				setIsInvalid(false);
				let nextFocusIndex = 0;
				const updatedOTPValues = [...otpValues];
				updatedOTPValues.forEach((val, index) => {
					if (index >= activeInput) {
						const changedValue = pastedData.shift() || val;
						if (changedValue) {
							updatedOTPValues[index] = changedValue;
							nextFocusIndex = index;
						}
					}
				});
				setOTPValues(updatedOTPValues);
				onChangeOTP(updatedOTPValues.join(""));
				setActiveInput(Math.min(nextFocusIndex + 1, length - 1));
				return;
			} else {
				setIsInvalid(true);
				return;
			}
		},
		[activeInput, length, onChangeOTP, otpValues, setIsInvalid]
	);

	return (
		<div data-testid="rg-otp-container" className="">
			<div className={`flex gap-2 lg:gap-3 p-1 justify-between`}>
				{otpValues.map((_, index) => {
					return (
						<SingleOTPInput
							data-testid={"rg-otp-input-single"}
							key={`SingleInput-${index}`}
							onChange={handleOnChange}
							type={"number"}
							focus={index === activeInput}
							onFocus={handleOnFocus(index)}
							value={otpValues && otpValues[index]}
							maxLength={1}
							onPaste={handleOnPaste}
							onKeyDown={handleOnKeyDown}
							autoFocus={true}
							className={`focus:outline-none bg-primary-100 text-neutral-400 w-full lg:w-14 h-12 rounded-l rounded-r text-center outline-red ${
								isInvalidOTP
									? "border border-error-main shadow-error focus-within:shadow-error focus-within:border-error-main "
									: "focus-within:shadow-active"
							}`}
							onBlur={onBlur}
						/>
					);
				})}
			</div>
			{isInvalidOTP && (
				<p
					data-testid={"rg-otp-error"}
					className={`text-center text-error-main mb-9 ${
						isInvalidOTP && "mt-3"
					}`}
				>
					You have entered an invalid OTP
				</p>
			)}
		</div>
	);
};

export default OtpVerificationInput;
