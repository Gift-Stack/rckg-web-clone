import React, { FC, ReactElement, createContext } from "react";
import { useSelector } from "react-redux";
import { ModalTypesEnum } from "./modalTypes";
import ModalDisableAccount from "./ModalDisableAccount";
import ModalConfirmDisableAccount from "./ModalConfirmDisableAccount";
import ModalP2PConfirmTrade from "./ModalP2PTrade";
import {
	ModalAdvancedAlert,
	ModalSimpleAlert,
	ModalInitializeDeposit,
	ModalWalletTransactionHistoryFilter,
} from "./index";
import { RootState } from "../../redux/store";
import ModalSecurityVerification from "./ModalSecurityVerification";
import ModalTransferCrypto from "./ModalTransferCrypto";
import ModalCCPayment from "./ModalCCPayment";
import ModalCCError from "./ModalCCError";
import ModalCCSUCCESS from "./ModalCCSUCCESS";
import ModalP2PCancelOrder from "./ModalP2PCancelOrder";
import ModalFilterP2pOrderList from "./ModalFilterP2pOrderList";
import ModalP2PConfirmPayment from "./ModalP2PConfirmPayment";
import ModalPCancelP2PPayment from "./ModalPCancelP2PPayment";
import ModalWithdrawalOTP from "./ModalWithdrawalOTP";

interface ModalRootContainerProps {}

export const MODAL_COMPONENTS: Record<any, ReactElement<any>> = {
	[ModalTypesEnum.ALERT_NUMBER_VERIFICATION]: <ModalSimpleAlert />,
	[ModalTypesEnum.SECURITY_VERIFICATION]: <ModalSecurityVerification />,
	[ModalTypesEnum.TRANSFER_CRYPTO]: <ModalTransferCrypto />,
	[ModalTypesEnum.TRANSFER_CRYPTO_SUCCESS]: <ModalAdvancedAlert />,
	[ModalTypesEnum.TRANSFER_CRYPTO_FAILURE]: <ModalAdvancedAlert />,
	[ModalTypesEnum.CREDIT_CARD_PAYMENT]: <ModalCCPayment />,
	[ModalTypesEnum.CREDIT_CARD_PAYMENT_FAILURE]: <ModalCCError />,
	[ModalTypesEnum.CREDIT_CARD_PAYMENT_SUCCESS]: <ModalCCSUCCESS />,
	[ModalTypesEnum.SECURITY_VERIFICATION]: <ModalSecurityVerification />,
	[ModalTypesEnum.DEPOSIT]: <ModalInitializeDeposit />,
	[ModalTypesEnum.DISABLE_ACCOUNT_VERIFICATION]: <ModalDisableAccount />,
	[ModalTypesEnum.CONFIRM_DISABLE_ACCOUNT]: <ModalConfirmDisableAccount />,
	[ModalTypesEnum.TRANSFER_CRYPTO]: <ModalTransferCrypto />,
	[ModalTypesEnum.TRANSFER_CRYPTO_SUCCESS]: <ModalAdvancedAlert />,
	[ModalTypesEnum.TRANSFER_CRYPTO_FAILURE]: <ModalAdvancedAlert />,
	[ModalTypesEnum.WALLET_TRANSACTION_HISTORY_FILTER]: (
		<ModalWalletTransactionHistoryFilter />
	),
	[ModalTypesEnum.FILTER_P2P_ORDER_LIST]: <ModalFilterP2pOrderList />,
	[ModalTypesEnum.CONFIRM_P2P_PAYMENT]: <ModalP2PConfirmPayment />,
	[ModalTypesEnum.CANCEL_P2P_PAYMENT]: <ModalPCancelP2PPayment />,
	[ModalTypesEnum.CONFIRM_P2P_TRADE]: <ModalP2PConfirmTrade />,
	[ModalTypesEnum.CANCEL_P2P_ORDER]: <ModalP2PCancelOrder />,
	[ModalTypesEnum.WITHDRAWAL_OTP]: <ModalWithdrawalOTP />,
};

export const modalContext = createContext<Record<any, any>>({});

const ModalRootContainer: FC<ModalRootContainerProps> = () => {
	const { modalType, modalData } = useSelector(
		(state: RootState) => state.modal
	);
	if (!modalType) {
		//no modal
		return null;
	}
	const SpecificModal = MODAL_COMPONENTS[modalType];

	return (
		<modalContext.Provider value={modalData}>
			{SpecificModal}
		</modalContext.Provider>
	);
};

export default ModalRootContainer;
