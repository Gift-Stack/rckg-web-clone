import CreditCardPayment from "../credit-card/CreditCardPayment";
import React from "react";
import { useDispatch } from "react-redux";
import { hideModal } from "../../redux/actions";
import Modal from "./modal";
import { titleVariants } from "./modal.enum";

export default function ModalCCPayment() {
	const dispatch = useDispatch();
	return (
		<Modal
			title="Pay with New Card"
			width={654}
			onClose={() => dispatch(hideModal())}
			titleVariants={titleVariants.CC_PAYMENT}
		>
			<CreditCardPayment />
		</Modal>
	);
}
