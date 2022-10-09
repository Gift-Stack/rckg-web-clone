import { FC, useState } from "react";
import TransactionInput from "../TransactionInput";
import TransactionSelect from "../TransactionSelect";
import TransactionTips from "../TransactionTips";
import { WithdrawCryptoProps } from "./model";
import { ScaleLoader } from "react-spinners";

const WithdrawCrypto: FC<WithdrawCryptoProps> = ({
	coinSelectToggle,
	setCoinSelectToggle,
	coinSelectData,
	coinSelectLabel,
	coinSelectPlaceholder,
	networkSelectToggle,
	setNetworkSelectToggle,
	networkSelectData,
	networkSelectLabel,
	networkSelectPlaceholder,
	tips,
	showTips = true,
	selectedItem,
	onAddressInput,
	amount,
	onAmountInput,
	availableCoinBalance,
	showSearch,
	searchPlaceholder,
	searchText,
	handleSearch,
	selectedCoinInfo,
}) => {
	const [convert, setConvert] = useState<number>(0);
	const [coin, setCoin] = useState<string>("");
	const handleAmount = (value: string): void => {
		setConvert(value ? parseFloat(value) : 0);
		onAmountInput(value);
	};
	const handleSelectedItem = (index: number): void => {
		selectedItem(index, coinSelectLabel);
		setCoin(coinSelectData.find((c) => c.id === index)?.name || "");
	};
	return (
		<div data-testid={"transaction-withdraw-crypto"}>
			<div className={"mt-2"}>
				<TransactionSelect
					toggle={coinSelectToggle}
					setToggle={(bool) => setCoinSelectToggle(bool)}
					selectItems={coinSelectData}
					label={coinSelectLabel}
					placeholder={coinSelectPlaceholder}
					selectedItem={(index: number) => handleSelectedItem(index)}
					showSearch={showSearch}
					searchPlaceholder={searchPlaceholder}
					searchText={searchText}
					handleSearch={handleSearch}
				/>
			</div>
			{selectedCoinInfo && !networkSelectData.length && (
				<div className="flex justify-center mt-8">
					<ScaleLoader color={"#0069FF"} />
				</div>
			)}
			{networkSelectData && networkSelectData.length ? (
				<>
					<div className={"mt-5"}>
						<TransactionSelect
							toggle={networkSelectToggle}
							setToggle={(bool) => setNetworkSelectToggle(bool)}
							selectItems={networkSelectData}
							label={networkSelectLabel}
							placeholder={networkSelectPlaceholder}
							selectedItem={(index: number) =>
								selectedItem(index, networkSelectLabel)
							}
						/>
					</div>
					<div className={"mt-5"}>
						<TransactionInput
							name={"address"}
							type={"text"}
							label={"Address"}
							onChange={(value) => onAddressInput(value)}
						/>
					</div>

					<div className={"mt-5"}>
						<TransactionInput
							name={"amount"}
							type={"number"}
							value={amount}
							label={"Amount"}
							extras={"MAX"}
							onChange={(value) => handleAmount(value)}
							handleExtras={() =>
								onAmountInput(availableCoinBalance.toString())
							}
						/>
					</div>
				</>
			) : (
				<></>
			)}

			{coin && (
				<div className={"text-left w-full flex justify-center"}>
					<div
						className={
							"w-full md:w-4/6 lg:w-3/6 xl:w-2/6 text-gray-400 text-labels md:text-sm-headline py-2"
						}
					>
						<small>
							Available: {availableCoinBalance} {coin}
						</small>
					</div>
				</div>
			)}

			<div className={"mt-5"}>
				{showTips && <TransactionTips tips={tips} />}
			</div>
		</div>
	);
};

export default WithdrawCrypto;
