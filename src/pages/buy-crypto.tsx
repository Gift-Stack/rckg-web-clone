import BuyCryptoContent from "components/crypto/buy-crypto/BuyCryptoContent";
import BuyCryptoPaymentMethods, {
	PaymentOptionsTypes,
} from "components/crypto/buy-crypto/BuyCryptoPaymentMethods";
import TransactionContainer from "components/crypto/TransactionContainer";
import Header from "components/dashboard/TopNav";
import SectionHeader from "components/shared/SectionHeader";
import { NextPage } from "next";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "redux/actions";
import { ModalTypesEnum } from "components/modals/modalTypes";
import { PAYMENT_DETAILS } from "redux/types";

const BuyCrypto: NextPage = () => {
	const [showBuy, setShowBuy] = useState<boolean>(true);
	const [amount, setAmount] = useState<number>(0);
	const [showPaymentMethods, setShowPaymentMethods] = useState<boolean>(false);
	const dispatch = useDispatch();
	const handleContinue = () => {
		setShowBuy(false);
		setShowPaymentMethods(true);
	};

	const handlePaymentContinue = (value: PaymentOptionsTypes) => {
		if (value.includes("Fiat")) {
			dispatch({
				type: PAYMENT_DETAILS,
				payload: { amount: 6000, reason: "buy crypto" },
			});
			dispatch(showModal(ModalTypesEnum.CREDIT_CARD_PAYMENT));
		}
	};

	return (
		<div className="bg-primary-100 h-screen">
			<Header />
			<SectionHeader
				title={"Buy Crypto"}
				description={
					"Buy Bitcoin, BNB, and other Cryptocurrencies conveniently"
				}
				mobileTitle={"Buy Crpto"}
			/>
			<TransactionContainer>
				<BuyCryptoContent
					handleContinue={handleContinue}
					showBuy={showBuy}
					setAmount={(amount: number) => setAmount(amount)}
				/>
				<BuyCryptoPaymentMethods
					showPaymentMethods={showPaymentMethods}
					amount={amount}
					handlePaymentContinue={handlePaymentContinue}
				/>
			</TransactionContainer>
		</div>
	);
};
export default BuyCrypto;
