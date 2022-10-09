import React, { useContext, useState } from "react";
import Button from "../button";
import { ButtonSize, ButtonState } from "../button/enum";
import Modal from "./modal";
import { useDispatch } from "react-redux";
import { hideModal } from "../../redux/actions";
import { _setTokenToStorage } from "../../utils";
import { modalContext } from "./root";
import { titleVariants } from "./modal.enum";
import Checkbox from "./../../components/input/checkbox";

const ModalPCancelP2PPayment: React.FC = () => {
	const dispatch = useDispatch();
	const modalData = useContext(modalContext);

	const [hasNotPaid, setHasNotPaid] = useState(false);

	const handleCancel = () => {
		if (hasNotPaid) {
			modalData.onCancel();
			dispatch(hideModal());
		}
	};
	return (
		<Modal
			title="Cancel order"
			onClose={() => dispatch(hideModal())}
			width={483}
			titleVariants={titleVariants.P2P_CONFIRM}
		>
			<div className="font-montserrat">
				<div className="px-5">
					<div className="mb-4">
						<div className="flex gap-3">
							<div>1.</div>
							You are about to cancel this order. Please be sure that you have
							not made payment to this seller. Rocket Global will not be held
							responsible for financial loss in this regards.
						</div>
						<div className="flex gap-3">
							<div>2.</div>
							Please note that canceling 3 orders in a day will stop you from
							trading for the rest of the day.
						</div>
					</div>

					<Checkbox
						label={
							<span className="ml-3">
								I have not made any payment to this seller.
							</span>
						}
						accepted={hasNotPaid}
						handleAccepted={() => setHasNotPaid(!hasNotPaid)}
					/>

					<div className="flex mt-4 flex-nowrap gap-4 sm:gap-5 pb-9">
						<Button
							variant={ButtonState.NEUTRALP2P}
							value="Cancel"
							onClick={() => dispatch(hideModal())}
							size={ButtonSize.sm}
							style={{ width: "100%" }}
						/>
						<Button
							size={ButtonSize.sm}
							value="Confirm"
							onClick={handleCancel}
							style={{ width: "100%" }}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ModalPCancelP2PPayment;
