import React from "react";
import Button from "../button";
import { ButtonSize, ButtonState } from "../button/enum";
import { useDispatch } from "react-redux";
import { hideModal } from "../../redux/actions";
import Modal from "./modal";
import { titleVariants } from "./modal.enum";

const ModalP2PCancelOrder: React.FC = () => {
	const dispatch = useDispatch();

	const confirmCancelOrder = () => {
		dispatch(hideModal());
	};

	return (
		<Modal
			title="Cancel order"
			titleVariants={titleVariants.CONFIRM_P2P_TRADE}
			svgCircle
			onClose={() => dispatch(hideModal())}
		>
			<div
				className="modal__body text-labels text-gray-dim "
				data-testid="rg-modal-cancel-order"
			>
				<ol className="mb-4">
					<li>
						1. You are about to cancel this order. Please be sure that you have
						not made payment to this seller. Rocket Global will not be held
						responsible for financial loss in this regards.{" "}
					</li>
					<li>
						2. Please note that canceling 3 orders in a day will stop you from
						trading for the rest of the day.
					</li>
				</ol>
				<div className="flex gap-x-4 items-center">
					<input type="checkbox" className="" />
					<p>I have not made any payment to this seller.</p>
				</div>
			</div>
			<div className="modal__foot mt-8">
				<div className="flex justify-between items-center gap-x-6">
					<Button
						variant={ButtonState.GRAYALT}
						value={"Cancel"}
						size={ButtonSize.sm}
						onClick={confirmCancelOrder}
						style={{ width: "100%" }}
					/>
					<Button
						variant={ButtonState.PRIMARY}
						value={"Confirm"}
						size={ButtonSize.sm}
						onClick={confirmCancelOrder}
						style={{ width: "100%" }}
					/>
				</div>
			</div>
		</Modal>
	);
};

export default ModalP2PCancelOrder;
