import { CryptoSwitchIcon } from "../../../assets";
import Button from "../../button";
import React, { useEffect, useState } from "react";
import { cryptoList } from "../crypto-list";
import CryptoSelectInput from "../CryptoSelectInput";
import { CryptoT } from "types/crypto-txn.type";

interface BuyCryptoContentProps {
	handleContinue: () => void;
	showBuy: boolean;
	setAmount: (amount: number) => void;
}
export default function BuyCryptoContent({
	handleContinue,
	showBuy,
	setAmount,
}: BuyCryptoContentProps) {
	const [hasCryptoInputError, setHasCryptoInputError] = useState(false);
	const [fromCrypto, setFromCrypto] = useState<CryptoT>({
		value: 0,
		maxValue: 0,
		minValue: 0,
		availableBalance: 2.5454,
		name: "",
		image: "",
	});
	const [toCrypto, setToCrypto] = useState<CryptoT>({
		value: 0,
		maxValue: 0,
		minValue: 0,
		availableBalance: 2.5454,
		name: "",
		image: "",
	});

	const handleCalcAmount = () => {
		setAmount(5000);
	};
	useEffect(() => {
		setFromCrypto(cryptoList[0]);
		setToCrypto(cryptoList[1]);
		handleCalcAmount();
		//eslint-disable-next-line
	}, []);

	const handleSwitchCrypto = (e: React.MouseEvent) => {
		e.stopPropagation();
		setFromCrypto(toCrypto);
		setToCrypto(fromCrypto);
		handleCalcAmount;
	};
	return (
		<>
			{showBuy && (
				<div
					data-testid={"buy-crypto-content"}
					className="flex flex-col  justify-center"
				>
					<CryptoSelectInput
						onChange={(value) => setFromCrypto((prev) => ({ ...prev, value }))}
						title={"Spend"}
						cryptoList={cryptoList}
						crypto={fromCrypto}
						searchChange={(crypto) => setFromCrypto(crypto)}
						showAvailableCrypto
						setHasCryptoInputError={() => setHasCryptoInputError}
						toggle={true}
						setToggle={(bool) => null}
					/>
					<div
						data-testid={"switch-crypto-button"}
						className="flex justify-center my-4 cursor-pointer"
						onClick={handleSwitchCrypto}
					>
						<CryptoSwitchIcon />
					</div>
					<CryptoSelectInput
						onChange={(value) => setToCrypto((prev) => ({ ...prev, value }))}
						title={"Receive"}
						cryptoList={cryptoList}
						crypto={toCrypto}
						searchChange={(crypto) => setToCrypto(crypto)}
						setHasCryptoInputError={() => setHasCryptoInputError}
						toggle={true}
						setToggle={(bool) => null}
					/>
					<Button
						onClick={() => handleContinue()}
						value="Continue"
						style={{ marginTop: 64 }}
						data-testid={"continue-button"}
						disabled={hasCryptoInputError}
					/>
				</div>
			)}
		</>
	);
}
