import React from "react";
import Modal from "./modal";
import { useDispatch } from "react-redux";
import { hideModal } from "../../redux/actions";
import TransferCrypto from "../crypto/transfer-cypto";
import { headerMarginVariants, titleVariants } from "./modal.enum";

interface Props {
	// children: React.ReactElement;
}

const ModalTransferCrypto: React.FC<Props> = () => {
	const dispatch = useDispatch();
	return (
		<Modal
			width={667}
			title="Transfer"
			titleVariants={titleVariants.TRANSFER_CRYPTO}
			onClose={() => dispatch(hideModal())}
			headerMarginVariants={headerMarginVariants.TRANSFER_CRYPTO}
		>
			<TransferCrypto />
		</Modal>
	);
};

export default ModalTransferCrypto;
