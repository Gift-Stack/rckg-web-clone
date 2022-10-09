import Header from "components/dashboard/TopNav";
import Footer from "components/footer";
import { footerRowsData } from "components/footer/data";
import { ModalTypesEnum } from "components/modals/modalTypes";
import SectionHeader from "components/shared/SectionHeader";
import P2PMobileOrderDetails from "components/trading/p2p/P2PMobileOrderDetails";
import P2POrderDetails from "components/trading/p2p/P2POrderDetails";
import { NextPage } from "next";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "redux/actions";

const OrderDetails: NextPage = () => {
	const dispatch = useDispatch();
	const [isCancelled, setIsCancelled] = useState(false);
	const [hasMadePayment, setHasMadePayment] = useState(false);

	const onCancel = () => {
		setIsCancelled(true);
	};

	const onMadePayment = () => {
		setHasMadePayment(true);
	};

	const handlePayment = () => {
		dispatch(showModal(ModalTypesEnum.CONFIRM_P2P_PAYMENT, { onMadePayment }));
	};

	const handleCancel = () => {
		dispatch(
			showModal(ModalTypesEnum.CANCEL_P2P_PAYMENT, {
				onCancel,
			})
		);
	};
	return (
		<div className="bg-gray-60 sm:bg-primary-100">
			<Header />
			<SectionHeader
				title="P2P Trading"
				description="Peer-to-peer exchange (or P2P exchange) is a marketplace where people can trade crypto directly with each other on their own terms, in virtually any country."
				mobileTitle={"P2P Trading"}
			/>
			<P2POrderDetails
				isCancelled={isCancelled}
				hasMadePayment={hasMadePayment}
				handleCancel={handleCancel}
				handlePayment={handlePayment}
			/>
			<P2PMobileOrderDetails
				isCancelled={isCancelled}
				hasMadePayment={hasMadePayment}
				handleCancel={handleCancel}
				handlePayment={handlePayment}
			/>
			<div className="hidden sm:block">
				<Footer rows={footerRowsData} />
			</div>
		</div>
	);
};
export default OrderDetails;
