import React, { useContext } from "react";
import Modal from "./modal";
import { useDispatch } from "react-redux";
import { hideModal } from "../../redux/actions";
import { modalContext } from "./root";

interface Props {}

const ModalAdvancedAlert: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const modalData = useContext(modalContext);

	return (
		<Modal onClose={() => dispatch(hideModal())}>
			<div className="flex flex-col justify-center items-center px-9 pb-8 mt-7">
				{modalData.svg}
				<p className={"font-normal text-md-headline text-center mt-6"}>
					{modalData.status}
				</p>
				<p
					className={"font-normal text-small text-center text-neutral-300 mt-3"}
				>
					{modalData.message}
				</p>
				<div className={"flex space-x-7 pt-10"}>
					{modalData.priButton} {modalData.secButton}
				</div>
			</div>
		</Modal>
	);
};

export default ModalAdvancedAlert;
