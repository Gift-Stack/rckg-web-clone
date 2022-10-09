import React, { useContext } from "react";
import Modal from "./modal";
import { useDispatch } from "react-redux";
import { hideModal } from "../../redux/actions";
import { SuccessIcon } from "../../assets";
import { modalContext } from "./root";

interface Props {}

const ModalCCSuccess: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const modalData = useContext(modalContext);
	return (
		<Modal onClose={() => dispatch(hideModal())}>
			<div className="flex flex-col justify-center items-center px-9 pb-8">
				<SuccessIcon />
				<p className={"font-normal text-small text-neutral-300 mt-6"}>
					{modalData.message}
				</p>
			</div>
		</Modal>
	);
};

export default ModalCCSuccess;
