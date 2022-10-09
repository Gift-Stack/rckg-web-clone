import React, { useContext } from "react";
import Button from "../button";
import { ButtonSize, ButtonState } from "../button/enum";
import { GoogleIcon, ProfileVerificationIcon } from "../../assets";
import Modal from "./modal";
import { useDispatch } from "react-redux";
import { hideModal } from "../../redux/actions";
import { _setTokenToStorage } from "../../utils";
import { useRouter } from "next/router";
import { modalContext } from "./root";
import { createKYCStageAsync } from "../../redux/actions/settings.action";

const ModalSecurityVerification: React.FC = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const modalData = useContext(modalContext);
	const remindMeLater = () => {
		let now = new Date();
		now.setTime(now.getTime() + 1 * 3600 * 1000);
		_setTokenToStorage("reminder", true, 1 / 48);
		return dispatch(hideModal());
	};

	const handleProfileVerificationProcess = () => {
		if (modalData.usersKYC.length <= 0) {
			dispatch(
				createKYCStageAsync(modalData.KYCStages[0].id, () => {
					dispatch(hideModal());
					return router.push(`/profile/[tab]`, "/profile/0").then();
				})
			);
		}
		if (
			modalData.profile &&
			modalData.phone &&
			modalData.usersKYC[0].verified
		) {
			return;
		}
		if (!modalData.profile) {
			dispatch(hideModal());
			return router.push(`/profile/[tab]`, "/profile/0").then();
		}
		if (!modalData.phone) {
			dispatch(hideModal());
			return router.push(`/profile/[tab]`, "/profile/1").then();
		}
		if (modalData.profile && modalData.phone) {
			dispatch(hideModal());
			return router.push(`/profile/[tab]`, "/profile/2").then();
		}
	};
	return (
		<Modal title="Security Verification" onClose={() => dispatch(hideModal())}>
			<div className="modal__body mt-7">
				<p className="mb-6 font-normal text-sm-regular text-gray-700">
					You are required to do the following in order to boost your account
					verification and security.
				</p>
				<div className="button-group">
					<Button
						variant={ButtonState.TERTIARY}
						value={"Google Authentication"}
						size={ButtonSize.sm}
						disabled={true}
						icon={<GoogleIcon />}
					/>

					<Button
						onClick={handleProfileVerificationProcess}
						variant={ButtonState.TERTIARY}
						value={"Profile Verification"}
						size={ButtonSize.sm}
						icon={<ProfileVerificationIcon />}
					/>
				</div>
			</div>
			<div className="modal__foot mt-8">
				<Button
					variant={ButtonState.PRIMARY}
					value={"Remind me later"}
					size={ButtonSize.lg}
					onClick={() => {
						remindMeLater();
					}}
					style={{ width: "100%" }}
				/>
			</div>
		</Modal>
	);
};

export default ModalSecurityVerification;
