import { ProfileSettingsLayout } from "../../components/layout/ProfileSettingLayout";
import BackComponent from "../../components/profile-settings/BackComponent";
import { useRouter } from "next/router";
import Button from "../../components/button";
import { ButtonState } from "../../components/button/enum";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import OtpVerificationInput from "../../components/input/otp";
import React, { SyntheticEvent, useState } from "react";
import useTimeLine from "../../hooks/useTimeline";
import { storageService } from "../../services";
import { confirmChangePassword, resendOtpAsync } from "../../redux/actions";

const Index = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const {} = useSelector((state: RootState) => state.auth);
	const [isInvalidOTP, setIsInvalid] = useState(false);
	const [otpValues, setOtpValues] = useState<string>("");
	const { loading, emailConfirmationOtpExpiringTime, email } = useSelector(
		(state: RootState) => state.auth
	);
	const { minutes, secs } = useTimeLine(
		emailConfirmationOtpExpiringTime ||
			storageService.get("emailConfirmationOtpExpiringTime")
	);

	const handleOtpValues = (otp: string) => setOtpValues(otp);

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		const data = {
			otp: otpValues,
		};
		if (!otpValues || otpValues.length !== 6) setIsInvalid(true);

		dispatch(
			confirmChangePassword(data, async (res: any) => {
				setOtpValues("");
				router.push(`/`).then();
			})
		);
	};

	return (
		<ProfileSettingsLayout
			title={"Rocket Global Confirm password"}
			keywords={"Rocket global"}
			description={"Rocket"}
		>
			<>
				<BackComponent path={"/settings/account"} />
				<div className={"bg-white py-10 px-2 lg:px-72"}>
					<div className={"lg:container "}>
						<div>
							<form
								onSubmit={handleSubmit}
								data-testid={"change-password-form"}
								className={"profile__change-password"}
							>
								<div className={"mb-10"}>
									<h3 className={"text-center text-headline text-neutral-400 "}>
										Enter OTP
									</h3>
									<p
										className={
											"mt-6 text-center text-sm-regular text-neutral-300"
										}
									>
										An OTP was sent to your registered email address{" "}
										{email && email}. The code expires after a 5 minutes.
									</p>
								</div>
								<div>
									<OtpVerificationInput
										length={6}
										onChangeOTP={handleOtpValues}
										isInvalidOTP={isInvalidOTP}
										setIsInvalid={setIsInvalid}
									/>
								</div>
								<div className={"cursor-pointer"}>
									{minutes === 0 || minutes === null ? (
										<p
											className="text-center text-buttonText my-6"
											onClick={() => {
												dispatch(
													resendOtpAsync({ identifier: email }, () => {})
												);
											}}
										>
											Resend OTP
										</p>
									) : (
										<p className="text-center text-buttonText my-6">
											Resend OTP in {minutes}:{secs}
										</p>
									)}
								</div>
								<Button
									disabled={otpValues.length !== 6}
									variant={ButtonState.PRIMARY}
									value={"Continue"}
									style={{ width: "100%" }}
									type={"submit"}
								/>
							</form>
						</div>
					</div>
				</div>
			</>
		</ProfileSettingsLayout>
	);
};

export default Index;
