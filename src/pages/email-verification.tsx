import { NextPage } from "next";
import { EmailVerificationSide } from "../assets";
import Button from "../components/button";
import { ButtonSize, ButtonState } from "../components/button/enum";
import {
	AuthSidePanel,
	FormHeading,
	AuthForm,
} from "../components/authentication";
import { Layout } from "../components";
import React, { SyntheticEvent, useEffect, useState } from "react";
import OtpVerificationInput from "components/input/otp";
import { useRouter } from "next/router";
import useTimeLine from "../hooks/useTimeline";
import { resendOtpAsync, verifyAccountAsync } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { storageService } from "../services";

const EmailVerification: NextPage = () => {
	const [isInvalidOTP, setIsInvalid] = useState(false);
	const [otpValues, setOtpValues] = useState<string>("");
	const { emailConfirmationOtpExpiringTime } = useSelector(
		(state: RootState) => state.auth
	);
	const router = useRouter();
	const { email, verifyType }: any = router.query;
	const { minutes, secs } = useTimeLine(
		emailConfirmationOtpExpiringTime ||
			storageService.get("emailConfirmationOtpExpiringTime")
	);
	const dispatch = useDispatch();
	const { loading } = useSelector((state: RootState) => state.auth);

	const handleOnChange = (otp: string) => {
		setOtpValues(otp);
	};

	useEffect(() => {
		if (verifyType && verifyType.toLowerCase() == "registered") {
			dispatch(resendOtpAsync({ identifier: email }, () => {}));
		}
		//eslint-disable-next-line
	}, []);

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		if (!otpValues || otpValues.length !== 6) {
			setIsInvalid(true);
		} else {
			const data = {
				emailOrPhoneNumber: email,
				otp: otpValues,
			};
			dispatch(
				verifyAccountAsync(data, async (res: any) => {
					setOtpValues("");
					await router.push(`/`);
				})
			);
		}
	};

	return (
		<Layout
			title={"Rocket Global Email Verification"}
			keywords={"Login, Rocket"}
			description={""}
		>
			<div className="flex auth">
				<AuthSidePanel
					svg={<EmailVerificationSide />}
					heading={"Trade without limits"}
					paragraph={
						"Dont be restricted to trades within your country. " +
						"With Rocket Global you get unlimited access to unlimited trades at the best rates ever!"
					}
				/>

				<AuthForm>
					<FormHeading
						heading={"Email Verification"}
						subHeading={
							<span>
								Please enter the 6-digit verification code that was sent to{" "}
								{email}. The code expires after a short while.
							</span>
						}
					/>

					<OtpVerificationInput
						length={6}
						onChangeOTP={handleOnChange}
						isInvalidOTP={isInvalidOTP}
						setIsInvalid={setIsInvalid}
					/>

					<div className={"auth__btnSection"}>
						<Button
							variant={ButtonState.PRIMARY}
							value={loading ? "Loading..." : "Verify Account"}
							size={ButtonSize.lg}
							disabled={!!loading || otpValues.length < 6}
							type={"submit"}
							onClick={handleSubmit}
						/>
					</div>
					<div>
						{minutes === 0 || minutes === null ? (
							<p
								className="text-center text-buttonText mt-8 cursor-pointer"
								onClick={() => {
									dispatch(resendOtpAsync({ identifier: email }, () => {}));
								}}
							>
								Resend OTP
							</p>
						) : (
							<p className="text-center text-buttonText mt-8">
								Resend OTP in {minutes}:{secs}
							</p>
						)}
					</div>
				</AuthForm>
			</div>
		</Layout>
	);
};
export default EmailVerification;
