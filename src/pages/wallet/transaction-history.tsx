import { useEffect, useState } from "react";
import Nav from "../../components/dashboard/wallet/nav";
import { NextPage } from "next";
import { WalletLayout } from "../../components";
import Button from "./../../components/button";
import { ButtonSize, ButtonState } from "./../../components/button/enum";
import { useDispatch } from "react-redux";

import {
	BnbBtc,
	BtcBtc,
	DodgeBtc,
	EthBtc,
	LtcBtc,
	TransactionCopy,
	TransactionLink,
	Funnel,
} from "../../assets";
import { capitalize, centeredEllipsis } from "../../utils";
import { DataState } from "../../components/table/enum";
import { CoinEnum, CoinPairEnum } from "../../types/enum";
import { formatToCurrency, getDateTimeWithoutA } from "../../constants";
import { TransactionStatusVariant } from "../../components/transaction/enum";
import Table from "../../components/table";
import TransactionHistoryTable from "../../components/table/TransactionHistoryTable";
import {
	transactionHistoryTableColumns,
	transactionHistoryTableConvertColumns,
	transactionHistoryTableData,
	transactionHistoryTableConvertData,
	transactionHistoryTableOptions,
} from "../../components/table/TransactionHistoryTable/data";
import {
	ITableColumn,
	ITableData,
	ITableOption,
} from "../../components/table/model";
import MobileTransactionHistoryTable from "../../components/table/TransactionHistoryTable/MobileTransactionHistoryTable";
import { showModal } from "../../redux/actions";
import { ModalTypesEnum } from "../../components/modals/modalTypes";

const WalletTransactionHistory: NextPage = () => {
	const dispatch = useDispatch();
	const links = [
		{ title: "Spot Account", uri: "/wallet/spot-account" },
		{ title: "Transaction history", uri: "/wallet/transaction-history" },
	];
	const [tableOptions, setTableOptions] = useState<ITableOption[]>([]);
	const [columns, setColumns] = useState<ITableColumn[]>([]);
	const [convertColumns, setConvertColumns] = useState<ITableColumn[]>([]);
	const [isConvert, setIsConvert] = useState<boolean>(false);
	useEffect(() => {
		setTableOptions(transactionHistoryTableOptions);
		setColumns(transactionHistoryTableColumns);
		setConvertColumns(transactionHistoryTableConvertColumns);
	}, []);

	const filterTableOptions = (value: string) => {
		setIsConvert(value === "Convert" ? true : false);
		const tableOptions_ = tableOptions.map((option) => {
			return {
				name: option.name,
				isActive: option.name === value ? true : false,
			};
		});
		setTableOptions(tableOptions_);
	};
	const [typeKey, setTypeKey] = useState<any>("");
	const [timeKey, setTimeKey] = useState<any>("");
	const [assetKey, setAssetKey] = useState<any>("");
	const [statusKey, setStatusKey] = useState<any>("");
	const [txIDKey, setTxIDKey] = useState<any>("");
	const [convertDateKey, setConvertDateKey] = useState<any>("");
	const [convertPairKey, setConvertPairKey] = useState<any>("");
	let filteredTransactionHistoryTableData = transactionHistoryTableData;
	let filteredTransactionHistoryTableConvertData =
		transactionHistoryTableConvertData;
	const handleFilterModal = () => {
		dispatch(
			showModal(ModalTypesEnum.WALLET_TRANSACTION_HISTORY_FILTER, {
				typeKey: typeKey,
				setTypeKey: setTypeKey,
				timeKey: timeKey,
				setTimeKey: setTimeKey,
				assetKey: assetKey,
				setAssetKey: setAssetKey,
				statusKey: statusKey,
				setStatusKey: setStatusKey,
				txIDKey: txIDKey,
				setTxIDKey: setTxIDKey,
			})
		);
	};

	const handleConvertSearch = () => {
		if (convertDateKey) {
			filteredTransactionHistoryTableConvertData =
				filteredTransactionHistoryTableConvertData?.filter((data: any) =>
					data.date.toLowerCase().includes(convertDateKey.toLocaleLowerCase())
				);
		}
		if (convertPairKey) {
			filteredTransactionHistoryTableConvertData =
				filteredTransactionHistoryTableConvertData?.filter(
					(data: any) =>
						data.pair.toLowerCase() === convertPairKey.toLocaleLowerCase()
				);
		}
	};
	const handleConvertReset = () => {
		setConvertDateKey("");
		setConvertPairKey("");
	};

	const handleTypeFilter = (value: string) => {
		setTypeKey(value);
	};

	const handleTimeFilter = (value: string) => {
		setTimeKey(value);
	};

	const handleAssetFilter = (value: string) => {
		setAssetKey(value);
	};

	const handleStatusFilter = (value: string) => {
		setStatusKey(value);
	};

	const handleTxIDFilter = (value: string) => {
		setTxIDKey(value);
	};

	const handleLink = (type: string, link: string): void => {};

	const handleCopy = (type: string, copy: string): void => {};
	if (typeKey) {
		filteredTransactionHistoryTableData =
			filteredTransactionHistoryTableData?.filter((data: any) =>
				data.type.toLowerCase().includes(typeKey.toLocaleLowerCase())
			);
	}
	if (timeKey) {
		filteredTransactionHistoryTableData =
			filteredTransactionHistoryTableData?.filter((data: any) =>
				data.time.toLowerCase().includes(timeKey.toLocaleLowerCase())
			);
	}
	if (assetKey) {
		filteredTransactionHistoryTableData =
			filteredTransactionHistoryTableData?.filter((data: any) =>
				data.asset.toLowerCase().includes(assetKey.toLocaleLowerCase())
			);
	}
	if (statusKey) {
		filteredTransactionHistoryTableData =
			filteredTransactionHistoryTableData?.filter((data: any) =>
				data.status.toLowerCase().includes(statusKey.toLocaleLowerCase())
			);
	}
	if (txIDKey) {
		filteredTransactionHistoryTableData =
			filteredTransactionHistoryTableData?.filter((data: any) =>
				data.txID.toLowerCase().includes(txIDKey.toLocaleLowerCase())
			);
	}

	const dataSource: ITableData[] =
		filteredTransactionHistoryTableData &&
		filteredTransactionHistoryTableData.length > 0
			? filteredTransactionHistoryTableData.map((row) => {
					return {
						key: row.id,
						asset: (
							<div className="flex items-center pt-2 xl:pt-5">
								<div className="flex items-center w-10 h-10 coins">
									{row.asset === CoinEnum.DOGE ? (
										<DodgeBtc />
									) : CoinEnum.LTC ? (
										<LtcBtc />
									) : CoinEnum.BNB ? (
										<BnbBtc />
									) : CoinEnum.BTC ? (
										<BtcBtc />
									) : (
										<EthBtc />
									)}
								</div>

								<div className="ml-1">
									<div className={DataState.DEFAULT}>{row.asset}</div>
								</div>
							</div>
						),
						type: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{row.type}
							</div>
						),
						time: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{getDateTimeWithoutA(row.time)}
							</div>
						),
						amount: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{formatToCurrency(row.amount, 6)}
							</div>
						),
						destination: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								<div className={"flex items-center"}>
									<div>{centeredEllipsis(row.destination)}</div>
									<div
										onClick={() => handleLink("destination", row.destination)}
										className={`ml-2 cursor-pointer`}
									>
										<TransactionLink />
									</div>
									<div
										onClick={() => handleCopy("destination", row.destination)}
										className={`ml-2 cursor-pointer`}
									>
										<TransactionCopy />
									</div>
								</div>
							</div>
						),
						txID: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								<div className={"flex items-center"}>
									<div>{centeredEllipsis(row.txID)}</div>
									<div
										onClick={() => handleLink("txID", row.txID)}
										className={`ml-2 cursor-pointer`}
									>
										<TransactionLink />
									</div>
									<div
										onClick={() => handleCopy("txID", row.txID)}
										className={`ml-2 cursor-pointer`}
									>
										<TransactionCopy />
									</div>
								</div>
							</div>
						),
						status: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								<div className={"flex items-center"}>
									<div
										className={`h-2 w-2 rounded-full mr-2 ${
											TransactionStatusVariant[row.status]
										}`}
									></div>
									<div>{capitalize(row.status)}</div>
								</div>
							</div>
						),
					};
			  })
			: [];

	const convertDataSource: ITableData[] =
		filteredTransactionHistoryTableConvertData &&
		filteredTransactionHistoryTableConvertData.length > 0
			? filteredTransactionHistoryTableConvertData.map((row) => {
					return {
						key: row.id,
						date: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{getDateTimeWithoutA(row.date)}
							</div>
						),
						pair: (
							<div className="flex items-center pt-2 xl:pt-5">
								<div className="flex items-center w-10 h-10 coins">
									{row.pair === CoinPairEnum.DOGE_BTC ? (
										<DodgeBtc />
									) : CoinPairEnum.LTC_BTC ? (
										<LtcBtc />
									) : CoinPairEnum.BNB_BTC ? (
										<BnbBtc />
									) : CoinPairEnum.BTC_BTC ? (
										<BtcBtc />
									) : (
										<EthBtc />
									)}
								</div>

								<div className="ml-1">
									<div className={DataState.DEFAULT}>{row.pair}</div>
								</div>
							</div>
						),
						type: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{row.type}
							</div>
						),
						from: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{row.from.amount} {row.from.value}
							</div>
						),
						to: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{row.from.amount} {row.from.value}
							</div>
						),
						price: (
							<div
								className={`pt-2 xl:pt-5 grid grid-rows-1 ${DataState.DEFAULT}`}
							>
								<div>{row.price.value1}</div>
								<div>{row.price.value1}</div>
							</div>
						),
						status: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								<div className={"flex items-center"}>
									<div
										className={`h-2 w-2 rounded-full mr-2 ${
											TransactionStatusVariant[row.status]
										}`}
									></div>
									<div>{capitalize(row.status)}</div>
								</div>
							</div>
						),
					};
			  })
			: [];

	return (
		<WalletLayout
			title={"Rocket Global Transaction History"}
			keywords={"Wallet, Rocket, Dashboard, Account, Transaction History"}
			description={""}
			links={links}
		>
			<>
				<div className={"w-full lg:flex md:grid"}>
					<Nav links={links} />
				</div>
				<div className={"w-full mt-12"}>
					<TransactionHistoryTable
						tableOptions={tableOptions}
						cssClass="p-5 rounded bg-white h-full"
						title="Transaction History"
						handleOption={(value) => filterTableOptions(value)}
					>
						<div className={"w-full"}>
							{isConvert ? (
								<div className={"md:grid-cols-5 gap-4 mt-6 hidden md:grid"}>
									<div>
										<span
											className={
												"font-normal text-gray-deep leading-4 text-small"
											}
										>
											Date
										</span>
										<div className="sm:grid border border-neutral-150 rounded relative text-gray-600 w-full">
											<select
												value={convertDateKey}
												className="py-3 text-labels w-full rounded-md pl-3 focus:outline-none bg-white text-gray-900"
												onChange={(e: React.FormEvent<HTMLSelectElement>) =>
													setConvertDateKey(e.currentTarget.value)
												}
											>
												<option value="">All</option>
												<option value="Deposit">Deposit</option>
												<option value="Withdrawal">Withdrawal</option>
											</select>
										</div>
									</div>
									<div>
										<span
											className={
												"font-normal text-gray-deep leading-4 text-small"
											}
										>
											Pair
										</span>
										<div className="sm:grid border border-neutral-150 rounded relative text-gray-600 w-full">
											<select
												value={convertPairKey}
												className="py-3 text-labels w-full rounded-md pl-3 focus:outline-none bg-white text-gray-900"
												onChange={(e: React.FormEvent<HTMLSelectElement>) =>
													setConvertPairKey(e.currentTarget.value)
												}
											>
												<option value="">All</option>
												<option value="DOGE/BTC">DOGE/BTC</option>
												<option value="LTC/BTC">LTC/BTC</option>
												<option value="BNB/BTC">BNB/BTC</option>
												<option value="BTC/BTC">BTC/BTC</option>
												<option value="ETH/BTC">ETH/BTC</option>
												<option value="BTC/USDT">BTC/USDT</option>
												<option value="BTC/ETH">BTC/ETH</option>
											</select>
										</div>
									</div>
									<div className="flex justify-center items-end space-x-3">
										<Button
											variant={ButtonState.PRIMARY}
											size={ButtonSize.sm}
											value="Search"
											onClick={() => handleConvertSearch()}
										/>
										<Button
											variant={ButtonState.OUTLINE}
											size={ButtonSize.sm}
											value="Reset"
											onClick={() => handleConvertReset()}
											cssClass={"my-1"}
										/>
									</div>
								</div>
							) : (
								<>
									<div className={"md:grid-cols-5 gap-4 mt-6 hidden md:grid"}>
										<div>
											<span
												className={
													"font-normal text-gray-deep leading-4 text-small"
												}
											>
												Type
											</span>
											<div className="sm:grid border border-neutral-150 rounded relative text-gray-600 w-full">
												<select
													value={typeKey}
													className="py-3 text-labels w-full rounded-md pl-3 focus:outline-none bg-white text-gray-900"
													onChange={(e: React.FormEvent<HTMLSelectElement>) =>
														handleTypeFilter(e.currentTarget.value)
													}
												>
													<option value="">All</option>
													<option value="Deposit">Deposit</option>
													<option value="Withdrawal">Withdrawal</option>
												</select>
											</div>
										</div>
										<div>
											<span
												className={
													"font-normal text-gray-deep leading-4 text-small"
												}
											>
												Time
											</span>
											<div className="sm:grid border border-neutral-150 rounded relative text-gray-600 w-full">
												<select
													value={timeKey}
													className="py-3 text-labels w-full rounded-md pl-3 focus:outline-none bg-white text-gray-900"
													onChange={(e: React.FormEvent<HTMLSelectElement>) =>
														handleTimeFilter(e.currentTarget.value)
													}
												>
													<option value="">All</option>
												</select>
											</div>
										</div>
										<div>
											<span
												className={
													"font-normal text-gray-deep leading-4 text-small"
												}
											>
												Asset
											</span>
											<div className="sm:grid border border-neutral-150 rounded relative text-gray-600 w-full">
												<select
													value={assetKey}
													className="py-3 text-labels w-full rounded-md pl-3 focus:outline-none bg-white text-gray-900"
													onChange={(e: React.FormEvent<HTMLSelectElement>) =>
														handleAssetFilter(e.currentTarget.value)
													}
												>
													<option value="">All</option>
													<option value="DOGE">DOGE</option>
													<option value="LTC">LTC</option>
													<option value="BNB">BNB</option>
													<option value="BTC">BTC</option>
												</select>
											</div>
										</div>
										<div>
											<span
												className={
													"font-normal text-gray-deep leading-4 text-small"
												}
											>
												Status
											</span>
											<div className="sm:grid border border-neutral-150 rounded relative text-gray-600 w-full">
												<select
													value={statusKey}
													className="py-3 text-labels w-full rounded-md pl-3 focus:outline-none bg-white text-gray-900"
													onChange={(e: React.FormEvent<HTMLSelectElement>) =>
														handleStatusFilter(e.currentTarget.value)
													}
												>
													<option value="">All</option>
													<option value="Successful">Successful</option>
													<option value="failed">Failed</option>
													<option value="pending">Pending</option>
												</select>
											</div>
										</div>
										<div>
											<span
												className={
													"font-normal text-gray-deep leading-4 text-small"
												}
											>
												TxID
											</span>
											<div className="sm:grid border border-neutral-150 rounded relative text-gray-600 w-full">
												<input
													type="text"
													value={txIDKey}
													className="py-3 text-labels w-full rounded-md pl-3 focus:outline-none bg-white text-gray-900"
													placeholder={"Enter TxID"}
													autoComplete="off"
													onChange={(e: React.FormEvent<HTMLInputElement>) =>
														handleTxIDFilter(e.currentTarget.value)
													}
												/>
											</div>
										</div>
									</div>
									<div className={"w-full md:hidden"}>
										<div
											onClick={handleFilterModal}
											className={
												"flex space-x-1 justify-end my-5 text-lightBlue text-sm-regular cursor-pointer"
											}
										>
											<Funnel />
											<p>Filter</p>
										</div>
									</div>
								</>
							)}
							<div className={"w-full hidden sm:block"}>
								<Table
									columns={isConvert ? convertColumns : columns}
									dataSource={isConvert ? convertDataSource : dataSource}
									showPagination={true}
									showPageSize={true}
								/>
							</div>
							<div className={"w-full md:hidden"}>
								<MobileTransactionHistoryTable
									isConvert={isConvert}
									data={filteredTransactionHistoryTableData}
									convertData={filteredTransactionHistoryTableConvertData}
									isDataDeposit={true}
									fetchCoinImage={() => {}}
									allCoins={[]}
								/>
							</div>
						</div>
					</TransactionHistoryTable>
				</div>
			</>
		</WalletLayout>
	);
};
export default WalletTransactionHistory;
