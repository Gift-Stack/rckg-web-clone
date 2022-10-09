import React, { useContext } from "react";
import Modal from "./modal";
import { useDispatch } from "react-redux";
import { hideModal } from "../../redux/actions";
import {
	BlackArrowForward,
	Bitcoin,
	FiatDeposit,
	BuyUsingCard,
	BuyUsingP2P,
} from "../../assets";
import { modalContext } from "./root";

interface Props {}

const ModalInitializeDeposit: React.FC<Props> = ({}) => {
	const dispatch = useDispatch();
	const modalData = useContext(modalContext);
	return (
		<Modal onClose={() => dispatch(hideModal())}>
			<div className="modal__body" data-testid="rg-modal-initialize-deposit">
				<div className="flex flex-col justify-center items-center px-9 pb-8">
					<p className={"font-normal text-md-headline text-center"}>Deposit</p>
					<p
						className={
							"font-normal text-small text-center text-neutral-300 mt-3"
						}
					>
						{" "}
						Select a way to deposit
					</p>
				</div>
				<div
					className={"cursor-pointer mb-3"}
					onClick={modalData.cryptoDeposit}
					data-testid="rg-modal-initialize-deposit-cryptoDeposit"
				>
					<div
						className={
							"flex justify-between space-x-4 bg-deposit-box border-2 border-deposit-border p-6"
						}
					>
						<div>
							<Bitcoin />
						</div>
						<div>
							<div className={"text-sm-regular"}>Crypto Deposit</div>
							<div className={"text-labels text-neutral-300"}>
								I already have crypto and want to transfer them to my account.
							</div>
						</div>
						<div className={"flex items-center"}>
							<BlackArrowForward />
						</div>
					</div>
				</div>
				<div
					className={"cursor-pointer mb-3"}
					onClick={modalData.fiatDeposit}
					data-testid="rg-modal-initialize-deposit-fiatDeposit"
				>
					<div
						className={
							"flex justify-between space-x-4 bg-deposit-box border-2 border-deposit-border p-6"
						}
					>
						<div>
							<FiatDeposit />
						</div>
						<div>
							<div className={"text-sm-regular"}>Fiat Deposit</div>
							<div className={"text-labels text-neutral-300"}>
								I want to deposit fiat money (such as EUR, AUD, etc.) from my
								bank account to my account.
							</div>
						</div>
						<div className={"flex items-center"}>
							<BlackArrowForward />
						</div>
					</div>
				</div>
				<div
					className={"cursor-pointer mb-3"}
					onClick={modalData.buyUsingCard}
					data-testid="rg-modal-initialize-deposit-buyUsingCard"
				>
					<div
						className={
							"flex justify-between space-x-4 bg-deposit-box border-2 border-deposit-border p-6"
						}
					>
						<div>
							<BuyUsingCard />
						</div>
						<div>
							<div className={"text-sm-regular"}>Buy using Card</div>
							<div className={"text-labels text-neutral-300"}>
								Visa, Mastercard and other supported bank cards.
							</div>
						</div>
						<div className={"flex items-center"}>
							<BlackArrowForward />
						</div>
					</div>
				</div>
				<div
					className={"cursor-pointer"}
					onClick={modalData.buyUsingP2P}
					data-testid="rg-modal-initialize-deposit-buyUsingP2P"
				>
					<div
						className={
							"flex justify-between space-x-4 bg-deposit-box border-2 border-deposit-border p-6"
						}
					>
						<div>
							<BuyUsingP2P />
						</div>
						<div>
							<div className={"text-sm-regular"}>Buy using P2P</div>
							<div className={"text-labels text-neutral-300"}>
								Use bank transfer and other methods to buy crypto via
								Peer-to-Peer.
							</div>
						</div>
						<div className={"flex items-center"}>
							<BlackArrowForward />
						</div>
					</div>
				</div>
			</div>
			<div className="pt-8"></div>
		</Modal>
	);
};

export default ModalInitializeDeposit;
