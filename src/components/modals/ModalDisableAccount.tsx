import React from "react";
import Button from "../button";
import { ButtonSize, ButtonState } from "../button/enum";
import { useDispatch } from "react-redux";
import { showModal } from "../../redux/actions/modal.action";
import { hideModal } from "../../redux/actions";
import { ModalTypesEnum } from "./modalTypes";
import Modal from "./modal";
import { svgPositionVariants, titleVariants } from "./modal.enum";

const ModalDisableAccount: React.FC = () => {
	const dispatch = useDispatch();

	const disableAccount = () => {
		dispatch(showModal(ModalTypesEnum.CONFIRM_DISABLE_ACCOUNT));
	};

	return (
		<Modal
			title="Are you sure you want to disable your account?"
			titleVariants={titleVariants.DISABLE_ACCOUNT}
			svgPositionVariants={svgPositionVariants.DISABLE_ACCOUNT}
			onClose={() => dispatch(hideModal())}
		>
			<div className="modal__body">
				<p className="mb-6 font-normal text-sm-regular text-neutral-400">
					If you need to reactivate your account, which has been disabled
					earlier, please make sure it is secure now before you apply for
					reactivation.
				</p>
			</div>
			<div className="modal__foot mt-8">
				<Button
					variant={ButtonState.PRIMARY}
					value={"Disable"}
					size={ButtonSize.lg}
					onClick={disableAccount}
					style={{ width: "100%" }}
				/>
			</div>
		</Modal>
	);
};

export default ModalDisableAccount;
