import { CryptoSwitchIcon } from "../../../assets";
import Button from "../../button";
import { ButtonState } from "../../button/enum";
import React, { FC, useEffect, useState } from "react";
import CryptoSelectInput from "../CryptoSelectInput";
import { CryptoT } from "types/crypto-txn.type";
import { IVariousAssetsBalance, SwapCryptoProps, SwapPayload } from "../model";
import { AllCoin } from "redux/reducers/transactions.reducer";

const SwapCrypto: FC<SwapCryptoProps> = ({
	allCoins,
	variousAssetsBalance,
	getSwapList,
	swapList,
	setPayload,
	cyptoSwapFee,
	performSwap,
	cryptoSwap,
	fromSelectToggle,
	setFromSelectToggle,
	toSelectToggle,
	setToSelectToggle,
}) => {
	const [_allCoins, _setAllCoins] = useState<any>([]);
	const [assetsBalance, setAssetsBalance] = useState<CryptoT[]>([]);
	const [showPreview, setShowPreview] = useState<Boolean>(false);
	const [disableButton, setDisableButton] = useState(true);
	const [fromCrypto, setFromCrypto] = useState<CryptoT>({
		value: 0,
		maxValue: 0,
		minValue: 0,
		availableBalance: 0,
		name: "",
		image: "",
	});
	const [toCrypto, setToCrypto] = useState<CryptoT>({
		value: 0,
		maxValue: 0,
		minValue: 0,
		availableBalance: 0,
		name: "",
		image: "",
	});
	const [error, setError] = useState<string>("");
	const [toCryptos, setToCryptos] = useState<CryptoT[]>([]);

	useEffect(() => {
		handleCryptoSelect();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fromCrypto, toCrypto]);

	useEffect(() => {
		if (
			!fromCrypto.value ||
			!cyptoSwapFee ||
			!cyptoSwapFee?.minRequiredBalance ||
			fromCrypto.name === toCrypto.name
		) {
			setDisableButton(true);
		} else {
			setDisableButton(false);
		}
		setShowPreview(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cyptoSwapFee, fromCrypto, toCrypto]);

	useEffect(() => {
		if (fromCrypto.name) {
			getSwapList(fromCrypto.name);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fromCrypto.name]);

	useEffect(() => {
		if (variousAssetsBalance.length) {
			setFromCrypto(formatAssetBalance(variousAssetsBalance)[0]);
			setAssetsBalance(formatAssetBalance(variousAssetsBalance));
			// _setAllCoins(formatAllCoins(allCoins, swapList));
		}
	}, [variousAssetsBalance, allCoins]);

	useEffect(() => {
		if (cryptoSwap && cryptoSwap.swapId) {
			setToCrypto({
				value: 0,
				maxValue: 0,
				minValue: 0,
				availableBalance: 0,
				name: "",
				image: "",
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cryptoSwap]);

	useEffect(() => {
		if (swapList?.length) {
			formatAllCoins(allCoins, swapList);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [swapList, allCoins]);

	const handleSwitchCrypto = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (fromCrypto.name && toCrypto.name) {
			const userCryptos = formatAssetBalance(variousAssetsBalance);
			const allCryptos = toCryptos;
			const found = userCryptos.find((c) => c.name === toCrypto.name);
			if (found) {
				const _fromCrypto = userCryptos.find((c) => c.name === found.name);
				const _toCrypto = allCryptos.find((c) => c.name === found.name);
				_fromCrypto && setFromCrypto(_fromCrypto);
				_toCrypto && setToCrypto(_toCrypto);
			} else {
				setError("Coin is not available");
			}
		}
	};

	const handleCryptoSelect = () => {
		if (fromCrypto.name && toCrypto.name && fromCrypto.name === toCrypto.name) {
			setError("No two matching coins are allowed");
		} else {
			setError("");
			if (parseFloat(fromCrypto.value.toString()) > 0 && toCrypto.name) {
				const payload: SwapPayload = {
					quoteAsset: fromCrypto.name,
					baseAsset: toCrypto.name,
					quoteQty: fromCrypto.value.toString(),
				};
				setTimeout(() => {
					setPayload(payload);
				}, 1000);
			}
		}
	};

	const fetchCoinImage = (coins: any, coin: string) => {
		const coinData = coins.filter(
			(data: any) => data.coin.toLowerCase() === coin.toLocaleLowerCase()
		);
		return coinData[0]?.image;
	};

	const formatAssetBalance = (
		assetBalance: IVariousAssetsBalance[]
	): CryptoT[] => {
		const balance = assetBalance.map((a) => {
			return {
				maxValue: parseFloat(a.free),
				minValue: 0,
				availableBalance: parseFloat(a.free),
				value: 0,
				name: a.asset,
				image: fetchCoinImage(allCoins, a.asset)
					? fetchCoinImage(allCoins, a.asset)
					: "/images/test/ltc.png",
			};
		});
		return balance;
	};

	const formatAllCoins = (allCoins: AllCoin[], swapList: string[][]) => {
		let all = allCoins.map((a: AllCoin) => {
			return {
				maxValue: 0,
				minValue: 0,
				availableBalance: 0,
				value: 0,
				name: a.coin,
				image: fetchCoinImage(allCoins, a.coin),
			};
		});
		setToCrypto({
			value: 0,
			maxValue: 0,
			minValue: 0,
			availableBalance: 0,
			name: "",
			image: "",
		});
		all = all.filter(
			(a) => a.name !== fromCrypto.name && isAvailable(swapList, a)
		);
		setToCryptos(all);
	};

	const isAvailable = (arr: string[][], item: CryptoT) => {
		const contains = arr.find((a) => a.includes(item.name));
		return contains;
	};

	return (
		<div className="flex flex-col justify-center">
			<CryptoSelectInput
				onChange={(value) => setFromCrypto((prev) => ({ ...prev, value }))}
				title={"From"}
				cryptoList={assetsBalance}
				crypto={fromCrypto}
				searchChange={(crypto) => setFromCrypto(crypto)}
				showAvailableCrypto
				showMaxButton
				setHasCryptoInputError={(value) => setDisableButton(value)}
				cyptoSwapFee={cyptoSwapFee}
				toggle={fromSelectToggle}
				setToggle={(bool) => setFromSelectToggle(bool)}
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
				cryptoList={toCryptos}
				crypto={toCrypto}
				searchChange={(crypto) => setToCrypto(crypto)}
				setHasCryptoInputError={(value) => setDisableButton(value)}
				cyptoSwapFee={cyptoSwapFee}
				toggle={toSelectToggle}
				setToggle={(bool) => setToSelectToggle(bool)}
			/>

			{showPreview ? (
				<div data-testid={"preview-container"} className="">
					<div className="mb-10 mt-10 text-gray-400">
						<div className="flex justify-between text-sm-headline mb-4">
							<p className="">Price</p>
							<p>
								1 {fromCrypto.name} ={" "}
								{Number((1 / Number(cyptoSwapFee?.price)).toFixed(7))}{" "}
								{toCrypto.name}
							</p>
						</div>
						<div className="flex justify-between">
							<p className="text-sm-headline">You will receive</p>
							<p className="font-semibold text-md-headline">
								{cyptoSwapFee?.baseQty} {toCrypto.name}
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
							<Button
								onClick={performSwap}
								value="Confirm"
								style={{ width: "100%" }}
							/>
						</div>
					</div>
				</div>
			) : (
				<>
					<Button
						onClick={() => setShowPreview(true)}
						value="Preview Conversion"
						style={{ marginTop: 40 }}
						data-testid={"preview-button"}
						disabled={disableButton}
					/>
					{error && (
						<div className={"text-labels text-center text-error-main"}>
							{error}
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default SwapCrypto;
