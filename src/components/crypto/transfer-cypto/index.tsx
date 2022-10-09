import { CryptoSwitchIcon } from "./../../../assets";
import Button from "./../../../components/button";
import { ModalTypesEnum } from "./../../../components/modals/modalTypes";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "./../../../redux/actions";
import { transferCrypto } from "./../../../redux/actions/crypto-txn.action";
import { CryptoT } from "./../../../types/crypto-txn.type";
import { cryptoList } from "../crypto-list";
import CryptoSelectInput from "../CryptoSelectInput";
import TradeTypeSelectInput from "../TradeTypeSelectInput";

export default function TransferCrypto() {
	const dispatch = useDispatch();
	const [disableButton, setDisableButton] = useState(true);
	const tradeTypeOptions = ["Fiat and Spot", "P2P"];
	const [fromTradeType, setFromTradeType] = useState<"Fiat and Spot" | "P2P">(
		tradeTypeOptions[0] as "Fiat and Spot"
	);
	const [toTradeType, setToTradeType] = useState<"Fiat and Spot" | "P2P">(
		tradeTypeOptions[1] as "P2P"
	);
	const [cryptoCoin, setCryptoCoin] = useState<CryptoT>({
		maxValue: 10,
		minValue: 2,
		availableBalance: 4.589,
		value: 0,
		name: "BNB",
		image: "/images/test/bnb.png",
	});

	useEffect(() => {
		if (cryptoCoin.value) {
			setDisableButton(false);
		}
	}, [cryptoCoin.value]);

	const handleSwitchCrypto = (e: React.MouseEvent) => {
		e.stopPropagation();
		setFromTradeType(toTradeType);
		setToTradeType(fromTradeType);
	};

	const handleConfirm = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		dispatch(
			transferCrypto(
				"home",
				(res: any) => {
					dispatch(showModal(ModalTypesEnum.TRANSFER_CRYPTO_SUCCESS));
				},
				(err: any) => {
					dispatch(showModal(ModalTypesEnum.TRANSFER_CRYPTO_FAILURE));
				}
			)
		);
	};

	const handleSetFromTrade = (value: string) => {
		setFromTradeType(value === "P2P" ? "P2P" : "Fiat and Spot");
		setToTradeType(value !== "P2P" ? "P2P" : "Fiat and Spot");
	};

	const handleSetToTrade = (value: string) => {
		setFromTradeType(value === "Fiat and Spot" ? "P2P" : "Fiat and Spot");
		setToTradeType(value !== "Fiat and Spot" ? "P2P" : "Fiat and Spot");
	};

	return (
		<div data-testid={"transfer-crypto-container"} className="px-6 pb-6">
			<p className="text-gray-deep font-medium text-x-sm-headline text-center mb-10">
				Internal transfers are free on Rocket Global
			</p>
			<div>
				<TradeTypeSelectInput
					onChange={(value) => handleSetFromTrade(value)}
					options={tradeTypeOptions}
					title={"From"}
					value={fromTradeType}
				/>
				<div
					className="flex justify-center my-6 cursor-pointer"
					onClick={handleSwitchCrypto}
				>
					<CryptoSwitchIcon />
				</div>
				<TradeTypeSelectInput
					onChange={(value) => handleSetToTrade(value)}
					options={tradeTypeOptions}
					title={"To"}
					value={toTradeType}
				/>
			</div>

			<div className="pt-9 mt-9 border-t border-gray-200">
				<CryptoSelectInput
					onChange={(value) => setCryptoCoin((prev) => ({ ...prev, value }))}
					title={"Coin"}
					cryptoList={cryptoList}
					crypto={cryptoCoin}
					searchChange={(crypto) => setCryptoCoin(crypto)}
					showMaxButton
					setHasCryptoInputError={(value) => setDisableButton(value)}
					toggle={true}
					setToggle={(bool) => null}
				/>
				<Button
					onClick={handleConfirm}
					value="Confirm"
					style={{ marginTop: 40, width: "100%" }}
					data-testid={"confirm-button"}
					disabled={disableButton}
				/>
			</div>
		</div>
	);
}
