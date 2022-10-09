import { SecurityIcon, SuccessIcon } from "../../assets";
import Button from "../button";
import { ButtonState } from "../button/enum";
import React, { FC, useCallback, useState, useEffect } from "react";
import { useFormik } from "formik";
import OtpVerificationInput from "../input/otp";
import CountryPhoneInput from "../input/country-phone-input";
import { sortItems } from "../../utils";
import {
	hideModal,
	sendPhoneVerificationOtpAsync,
	showModal,
	verifyPhoneNumberAsync,
} from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useDebounceDispatch } from "../../hooks/useDebounceDispatch";
import { ModalTypesEnum } from "../modals/modalTypes";
import { useRouter } from "next/router";
import { withProvider } from "../../hoc/withProvider";

interface PhoneVerificationProps {
	countries: any[];
	isPhoneVerify: boolean;
}

const PhoneVerification: FC<PhoneVerificationProps> = ({
	countries,
	isPhoneVerify,
}) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const debouncedDispatch = useDebounceDispatch(1000);

	useEffect(() => {
		if (isPhoneVerify) {
			router.push(`/dashboard`).then();
		}
		//eslint-disable-next-line
	}, []);

	const [isInvalidOTP, setIsInvalid] = useState(false);
	const [otpValues, setOtpValues] = useState<string>("");
	const [phoneCode, setPhoneCode] = useState<string>("+234");
	const [otpError, setOtpError] = useState<string>("");

	const handleOnChange = (otp: string) => {
		setOtpValues(otp);
		if (!otp) {
			setOtpError("OTP is required!");
		} else if (otp.length < 6) {
			setOtpError("Invalid OTP");
		} else {
			setOtpError("");
		}
	};

	const formik = useFormik({
		initialValues: {
			mobile_number: "",
		},
		onSubmit: (values) => {
			if (!otpError && otpValues) {
				dispatch(
					verifyPhoneNumberAsync(
						{ otp: otpValues },
						() => {
							dispatch(
								showModal(ModalTypesEnum.ALERT_NUMBER_VERIFICATION, {
									message: "Mobile Number verified successfully!",
									svg: <SuccessIcon />,
								})
							);
							setTimeout(() => {
								dispatch(hideModal());
								return router.push(`/profile/[tab]`, "/profile/2").then();
							}, 4000);
							return;
						},
						() => {
							dispatch(
								showModal(ModalTypesEnum.ALERT_NUMBER_VERIFICATION, {
									message: "An Error Occurred",
								})
							);
							setTimeout(() => {
								dispatch(hideModal());
							}, 4000);
							return;
						}
					)
				);
			} else {
				setOtpError("OTP is required!");
			}
		},
		validate: (values) => {
			let errors = { mobile_number: "", otp: "" };
			if (values && !values.mobile_number) {
				errors.mobile_number = "Mobile number is required!";
				!otpValues && setOtpError("OTP is required!");
			} else if (values && values.mobile_number) {
				const regex = /^(?!0+$)(?:\(?\+\d{1,3}\)?[- ]?|0)?\d{10}$/gm;
				const value = `${phoneCode} ${values.mobile_number}`;
				if (value.match(regex)) {
					return;
				} else {
					errors.mobile_number = "Invalid mobile number";
				}
			}
			return errors;
		},
	});

	let handleGetCode = useCallback(() => {
		if (formik.values.mobile_number)
			debouncedDispatch(
				sendPhoneVerificationOtpAsync({
					phoneNumber: `${phoneCode}${formik.values.mobile_number}`,
				})
			);
		//eslint-disable-next-line
	}, [debouncedDispatch]);

	return (
		<>
			<div>
				<form
					onSubmit={formik.handleSubmit}
					data-testid={"phone-verification-form"}
					className={"profile__phone_verification"}
				>
					<div className={"sm:w-1/2 w-full m-auto verification_input"}>
						<CountryPhoneInput
							countries={countries && sortItems(countries, "name")}
							value={formik.values.mobile_number}
							formik={formik}
							setPhoneCode={(code: string) => setPhoneCode(code)}
						/>
					</div>
					<div className={"sm:w-1/2 w-full m-auto mt-8 verification_input"}>
						<p className={"text-sm-regular text-gray-deep font-normal"}>
							SMS Verification code
						</p>
						<div className={"lg:flex w-full otp-area text-center"}>
							<OtpVerificationInput
								length={6}
								onChangeOTP={handleOnChange}
								isInvalidOTP={isInvalidOTP}
								setIsInvalid={setIsInvalid}
							/>
							<button
								className={
									"bg-transparent text-primary-400 m-auto px-2 text-sm-regular lg:block hidden"
								}
								type={"button"}
								disabled={!formik.values.mobile_number}
								data-testid={"rg-get-code"}
								onClick={handleGetCode}
							>
								Get Code
							</button>
						</div>
						{otpError && (
							<div>
								<p
									className={"text-error-main text-labels mt-2"}
									data-testid="rg-main-error"
								>
									{otpError}
								</p>
							</div>
						)}
						<p className={"text-sm-regular text-gray-deep font-medium"}>
							Please enter the 6-digit verification code.
						</p>
						<button
							className={
								"bg-transparent text-primary-400 text-sm-regular mt-4 lg:hidden block"
							}
							type={"button"}
							data-testid={"rg-get-code"}
							onClick={handleGetCode}
						>
							Get Code
						</button>
					</div>
					<div
						className={"flex items-center my-10"}
						data-testid={"security-assurance"}
					>
						<SecurityIcon className="mr-1.5" />
						<p className={"text-neutral-300 text-sm-regular"}>
							Rocket Global will not share your personal details with third
							party applications.
						</p>
					</div>
					<div data-testid={"basic-button-area"}>
						<Button
							variant={ButtonState.PRIMARY}
							value={"Continue"}
							style={{ width: "100%" }}
							type={"submit"}
						/>
					</div>
				</form>
			</div>
		</>
	);
};

export default withProvider(PhoneVerification);
