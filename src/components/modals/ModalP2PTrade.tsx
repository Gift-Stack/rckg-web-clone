import React from "react";
import Button from "../button";
import { ButtonSize, ButtonState } from "../button/enum";
import { useDispatch } from "react-redux";
import { hideModal } from "../../redux/actions";
import Modal from "./modal";
import { titleVariants } from "./modal.enum";

const ModalP2PConfirmTrade: React.FC = () => {
	const dispatch = useDispatch();

	const confirmTrade = () => {
		dispatch(hideModal());
	};

	return (
		<Modal
			title="Confim Successful Payment"
			titleVariants={titleVariants.CONFIRM_P2P_TRADE}
			svgCircle
			onClose={() => dispatch(hideModal())}
		>
			<div className="modal__body" data-testid="rg-modal-confirm-order">
				<p className="my-21 font-normal text-sm-regular text-neutral-400">
					Please confirm that payment has been made to the seller. Malicious
					clicks will lead to account frozen.
				</p>
				<p className="border-l-2 border-primary-400 pl-4 mb-4 text-neutral-400 text-sm-headline">
					Bank Transfer
				</p>
				<div className="mb-4">
					<p className="text-gray-deep text-labels">Name</p>
					<p className="text-neutral-400 text-sm-headline font-medium">
						Jennifer Doe
					</p>
				</div>
				<div className="mb-4">
					<p className="text-gray-deep text-labels">Bank Account Number</p>
					<p className="text-neutral-400 text-sm-headline font-medium">
						0012345678
					</p>
				</div>
				<div className="mb-4">
					<p className="text-gray-deep text-labels">Bank Name</p>
					<p className="text-neutral-400 text-sm-headline font-medium">
						Zenith Bank
					</p>
				</div>
			</div>
			<div className="modal__foot mt-8">
				<div className="bg-gray-faint rounded p-2.5 mt-4 mb-8 text-labels text-gray-dim">
					<p className="font-bold">WARNING!</p>
					<p>
						If you click on “I have made payment” without making the payment
						(you need to transfer the money to the payment account provided).
						Your account will potentially be suspended. The platform reserve the
						rights to claim any damage caused.
					</p>
				</div>
				<div className="flex justify-between items-center gap-x-6">
					<Button
						variant={ButtonState.GRAYALT}
						value={"Cancel"}
						size={ButtonSize.sm}
						onClick={confirmTrade}
						style={{ width: "100%" }}
					/>
					<Button
						variant={ButtonState.PRIMARY}
						value={"Confirm"}
						size={ButtonSize.sm}
						onClick={confirmTrade}
						style={{ width: "100%" }}
					/>
				</div>
			</div>
		</Modal>
	);
};

export default ModalP2PConfirmTrade;
