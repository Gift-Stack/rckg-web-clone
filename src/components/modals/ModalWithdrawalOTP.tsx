import React, { useState } from "react";
import Modal from "./modal";
import Button from "../button";
import { ButtonSize, ButtonState } from "../button/enum";
import { useDispatch, useSelector } from "react-redux";
import { showModal, hideModal } from "../../redux/actions";
import { AuthForm, FormHeading } from "../authentication";
import OtpVerificationInput from "../input/otp";
import useTimeLine from "../../hooks/useTimeline";
import { storageService } from "../../services";
import { RootState } from "../../redux/store";
import { resendLoginOtpAsync, verifyLoginAsync } from "../../redux/actions";
import { ModalTypesEnum } from "./modalTypes";

interface Props {
	handleSubmit: (otp: string) => void;
	setShowOTPModal: (arg: boolean) => void;
	resendWithdrawalOtp: () => void;
}

const ModalWithdrawalOTP: React.FC<any> = ({
	handleSubmit,
	setShowOTPModal,
	resendWithdrawalOtp,
}) => {
	const dispatch = useDispatch();
	const { minutes, secs } = useTimeLine(storageService.get("otpExpiration"));
	const [otpValues, setOtpValues] = useState<string>("");
	const [isInvalidOTP, setIsInvalid] = useState(false);
	const { loading } = useSelector((state: RootState) => state.auth);

	const handleOnChange = (otp: string) => {
		setOtpValues(otp);
	};

	return (
		// <Modal width={450} onClose={() => dispatch(hideModal())}>
		<Modal width={450} onClose={() => setShowOTPModal(false)}>
			<div
				className="flex flex-col justify-center items-center px-5 pb-8 mt-7"
				data-testid="rg-mobile-transaction-history-table-filter"
			>
				<AuthForm handleSubmit={(e: any) => e.preventDefault()}>
					<FormHeading
						heading={"Verify OTP"}
						subHeading={
							<span>
								Please enter the 6-digit verification code that was sent to{" "}
								{"identifier"}. The code expires after a short while.
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
							value={loading ? "Loading..." : "Verify Withdrawal"}
							size={ButtonSize.lg}
							disabled={!!loading || otpValues.length < 6}
							type={"submit"}
							onClick={() => handleSubmit(otpValues)}
						/>
					</div>
					<div>
						{minutes === 0 || minutes === null ? (
							<p
								className="text-center text-buttonText mt-8 cursor-pointer"
								onClick={resendWithdrawalOtp}
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
		</Modal>
	);
};

export default ModalWithdrawalOTP;
