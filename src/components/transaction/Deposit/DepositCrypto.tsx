import { TransactionCopy } from "../../../assets";
import { FC } from "react";
import TransactionSelect from "../TransactionSelect";
import TransactionTips from "../TransactionTips";
import { DepositCryptoProps } from "./model";
import { ScaleLoader } from "react-spinners";

const DepositCrypto: FC<DepositCryptoProps> = ({
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
	address,
	selectedItem,
	handleCopy,
	showSearch,
	handleSearch,
	searchText,
	selectedCoinInfo,
	selectedNetwork,
	searchPlaceholder,
}) => {
	const transactionTips = [
		{
			id: 1,
			tip: `Please make sure you send only ${selectedCoinInfo?.name} to this deposit address.`,
		},
		{
			id: 2,
			tip: `Ensure the network is ${selectedNetwork?.network} - ${selectedNetwork?.name}.`,
		},
	];

	return (
		<div data-testid={"transaction-deposit-crypto"}>
			<div className={"mt-2"}>
				<TransactionSelect
					toggle={coinSelectToggle}
					setToggle={(bool) => setCoinSelectToggle(bool)}
					selectItems={coinSelectData}
					label={coinSelectLabel}
					placeholder={coinSelectPlaceholder}
					selectedItem={(index: number) => selectedItem(index, coinSelectLabel)}
					showSearch={showSearch}
					handleSearch={handleSearch}
					searchText={searchText}
					searchPlaceholder={searchPlaceholder}
				/>
			</div>
			{selectedCoinInfo && !networkSelectData.length && (
				<div className="flex justify-center mt-8">
					<ScaleLoader color={"#0069FF"} />
				</div>
			)}
			{networkSelectData && networkSelectData.length ? (
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
			) : (
				<></>
			)}

			{address ? (
				<>
					<div className={"mt-5"}>
						<div className={"text-left w-full flex justify-center"}>
							<div
								className={
									"w-full md:w-4/6 lg:w-3/6 xl:w-2/6 text-neutral-400 text-labels md:text-sm-headline py-2"
								}
							>
								Address
							</div>
						</div>
						<div className={"text-left w-full flex justify-center"}>
							<div
								className={
									"flex items-center justify-between w-full md:w-4/6 lg:w-3/6 xl:w-2/6 text-neutral-400 font-medium text-sm-regular md:text-sm-headline"
								}
							>
								{address}
								<div
									data-testid={"transaction-deposit-crypto-copy"}
									onClick={() => handleCopy(address)}
									className={`ml-2 cursor-pointer`}
								>
									<TransactionCopy />
								</div>
							</div>
						</div>
					</div>
					<div className={"mt-5"}>
						<TransactionTips tips={transactionTips} />
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default DepositCrypto;
