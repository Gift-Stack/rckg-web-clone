import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { hideModal } from "../../redux/actions";
import Modal from "./modal";
import { titleVariants, svgPositionVariants } from "./modal.enum";

const ModalConfirmDisableAccount: React.FC = () => {
	const dispatch = useDispatch();

	return (
		<Modal
			title="Request for disable account submitted."
			titleVariants={titleVariants.CONFIRM_DISABLE_ACCOUNT}
			svgPositionVariants={svgPositionVariants.DISABLE_ACCOUNT}
			onClose={() => dispatch(hideModal())}
			{...{ textAlign: "center", color: "red" }}
		/>
	);
};

export default ModalConfirmDisableAccount;
