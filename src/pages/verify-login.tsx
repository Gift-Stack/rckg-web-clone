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
import { resendLoginOtpAsync, verifyLoginAsync } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { storageService } from "../services";
import { getUserDevice, getUserIP } from "../redux/actions/analytics.action";
import { useGlobalContext } from "context/global.context";

const LoginVerification: NextPage = () => {
	const [isInvalidOTP, setIsInvalid] = useState(false);
	const [otpValues, setOtpValues] = useState<string>("");
	const router = useRouter();
	const { identifier }: any = router.query;

	const dispatch = useDispatch();
	const { loading } = useSelector((state: RootState) => state.auth);
	const { minutes, secs } = useTimeLine(storageService.get("otpExpiration"));
	const handleOnChange = (otp: string) => {
		setOtpValues(otp);
	};

	useEffect(() => {
		dispatch(getUserIP());
		dispatch(getUserDevice());
		//eslint-disable-next-line
	}, []);

	const { userIpAddress, userDevice, userGeoData } = useSelector(
		(state: RootState) => state.analytics
	);
	const { otpExpiration } = useSelector((state: RootState) => state.auth);

	const { redirectAfterLoginUri, setRedirectAfterLoginUri } =
		useGlobalContext();

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		if (!otpValues || otpValues.length !== 6) {
			setIsInvalid(true);
		} else {
			const userAnalytics = {
				ipAddress: userIpAddress,
				geoData: userGeoData,
				deviceInfo: userDevice,
			};
			const data = {
				identifier,
				otp: otpValues,
				...userAnalytics,
			};
			dispatch(
				verifyLoginAsync(data, async (_: any) => {
					if (redirectAfterLoginUri) {
						router.push(redirectAfterLoginUri).then();
						setRedirectAfterLoginUri("");
					} else {
						router.push("/dashboard").then();
					}
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
						heading={"Verify Login"}
						subHeading={
							<span>
								Please enter the 6-digit verification code that was sent to{" "}
								{identifier}. The code expires after a short while.
							</span>
						}
					/>

					<OtpVerificationInput
						length={6}
						onChangeOTP={handleOnChange}
						isInvalidOTP={isInvalidOTP}
						setIsInvalid={setIsInvalid}
					/>

					<div className={"auth__btnSection mt-10"}>
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
									dispatch(resendLoginOtpAsync({ identifier }, () => {}));
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
export default LoginVerification;
