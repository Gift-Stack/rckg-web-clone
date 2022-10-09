import React, { useContext } from "react";
import Button from "../button";
import { ButtonSize, ButtonState } from "../button/enum";
import Modal from "./modal";
import { useDispatch } from "react-redux";
import { hideModal } from "../../redux/actions";
import { _setTokenToStorage } from "../../utils";
import { modalContext } from "./root";
import ItemValueCard from "./../../components/trading/p2p/ItemValueCard";
import { titleVariants } from "./modal.enum";

const ModalP2PConfirmPayment: React.FC = () => {
	const dispatch = useDispatch();
	const modalData = useContext(modalContext);

	return (
		<Modal
			title="Confim Successful Payment"
			onClose={() => dispatch(hideModal())}
			width={483}
			titleVariants={titleVariants.P2P_CONFIRM}
		>
			<div className="px-5 font-montserrat">
				<div className="flex flex-col gap-3 pb-5 ">
					<p className="text-labels">
						Please confirm that payment has been made to the seller. Malicious
						clicks will lead to account frozen.
					</p>
					<p className="border-l-2 h-auto border-primary-light pl-5">
						Bank Transfer
					</p>
					<ItemValueCard item={"Name"} value={"Jennifer Doe"} />
					<ItemValueCard item={"Bank Account Number"} value={"0012345678"} />
					<ItemValueCard item={"Bank Name"} value={"Zenith Bank"} />
				</div>
			</div>
			<div className="border-t-x border-gray-50 font-montserrat">
				<div className="px-5">
					<div className="bg-gray-faint p-3 rounded my-6 text-neutral-400 text-small">
						<h2 className="font-semibold">WARNING!</h2>
						<p className="">
							If you click on “I have made payment” without making the payment
							(you need to transfer the money to the payment account provided).
							Your account will potentially be suspended. The platform reserve
							the rights to claim any damage caused.
						</p>
					</div>
					<div className="flex flex-nowrap gap-4 sm:gap-5 pb-9">
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
							onClick={() => {
								modalData.onMadePayment();
								dispatch(hideModal());
							}}
							style={{ width: "100%" }}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ModalP2PConfirmPayment;
