import { CryptoSwitchIcon } from "../../../assets";
import Button from "../../button";
import { ButtonState } from "../../button/enum";
import React, { useEffect, useState } from "react";
import { CryptoT } from "types/crypto-txn.type";
import { cryptoList } from "components/crypto/crypto-list";
import CryptoSelectInput from "components/crypto/CryptoSelectInput";

export default function SwapCrypto() {
	const [showPreview, setShowPreview] = useState<Boolean>(false);
	const [disableButton, setDisableButton] = useState(true);
	const [fromCrypto, setFromCrypto] = useState<CryptoT>({
		value: 0,
		maxValue: 0,
		minValue: 0,
		availableBalance: 0.12345,
		name: "",
		image: "",
	});
	const [toCrypto, setToCrypto] = useState<CryptoT>({
		value: 0,
		maxValue: 0,
		minValue: 0,
		availableBalance: 0.12345,
		name: "",
		image: "",
	});

	useEffect(() => {
		setFromCrypto(cryptoList[0]);
		setToCrypto(cryptoList[1]);
	}, []);

	useEffect(() => {
		if (!fromCrypto.value || !toCrypto.value) {
			setDisableButton(true);
		} else {
			setDisableButton(false);
		}
	}, [fromCrypto.value, toCrypto.value]);

	const handleSwitchCrypto = (e: React.MouseEvent) => {
		e.stopPropagation();
		setFromCrypto(toCrypto);
		setToCrypto(fromCrypto);
	};

	return (
		<div className="flex flex-col  justify-center">
			<CryptoSelectInput
				onChange={(value) => setFromCrypto((prev) => ({ ...prev, value }))}
				title={"From"}
				cryptoList={cryptoList}
				crypto={fromCrypto}
				searchChange={(crypto) => setFromCrypto(crypto)}
				showAvailableCrypto
				showMaxButton
				setHasCryptoInputError={(value) => setDisableButton(value)}
				toggle={false}
				setToggle={(bool) => null}
			/>
			<div
				className="flex justify-center my-4 cursor-pointer"
				onClick={handleSwitchCrypto}
			>
				<CryptoSwitchIcon />
			</div>
			<CryptoSelectInput
				onChange={(value) => setToCrypto((prev) => ({ ...prev, value }))}
				title={"To"}
				cryptoList={cryptoList}
				crypto={toCrypto}
				searchChange={(crypto) => setToCrypto(crypto)}
				setHasCryptoInputError={(value) => setDisableButton(value)}
				toggle={true}
				setToggle={(bool) => null}
			/>

			{showPreview ? (
				<div data-testid={"preview-container"} className="">
					<div className="mb-10 mt-10 text-gray-400">
						<div className="flex justify-between text-sm-headline mb-4">
							<p className="">Price</p>
							<p>
								1 {fromCrypto.name} = 0.009063 {toCrypto.name}
							</p>
						</div>
						<div className="flex justify-between">
							<p className="text-sm-headline">You will receive</p>
							<p className="font-semibold text-md-headline">
								1 {fromCrypto.name}
							</p>
						</div>
					</div>
					<div
						data-testid={"preview-box"}
						className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-5"
					>
						<div>
							<Button
								state={ButtonState.NEUTRAL}
								onClick={() => setShowPreview(false)}
								value="Back"
								data-testid={"back-button"}
								style={{
									backgroundColor: "#E3EEFE",
									color: "black",
									width: "100%",
								}}
							/>
						</div>
						<div>
							<Button value="Confirm" style={{ width: "100%" }} />
						</div>
					</div>
				</div>
			) : (
				<Button
					onClick={() => setShowPreview(true)}
					value="Preview Conversion"
					style={{ marginTop: 40 }}
					data-testid={"preview-button"}
					disabled={disableButton}
				/>
			)}
		</div>
	);
}
