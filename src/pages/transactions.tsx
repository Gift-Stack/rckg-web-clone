import { useEffect, useState } from "react";
import { NextPage } from "next";
import { DashboardLayout } from "../components";
import Button from "./../components/button";
import { ButtonSize, ButtonState } from "./../components/button/enum";
import TableDateRangePicker from "./../components/table/TableDateRangePicker";
import { RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";

import { EthBtc, TransactionCopy, TransactionLink, Funnel } from "../assets";
import Image from "next/image";
import { capitalize, centeredEllipsis } from "../utils";
import { DataState } from "../components/table/enum";
import { CoinEnum, CoinPairEnum } from "../types/enum";
import {
	formatToCurrency,
	getDateTimeWithoutA,
	getDateTimeFormatUK,
} from "../constants";
import {
	TransactionStatusVariant,
	TransactionStatus,
} from "../components/transaction/enum";
import Table from "../components/table";
import TransactionHistoryTable from "../components/table/TransactionHistoryTable";
import {
	transactionHistoryTableColumns,
	transactionHistoryTableConvertColumns,
	transactionHistoryTableData,
	transactionHistoryTableConvertData,
	transactionHistoryTableOptions,
} from "../components/table/TransactionHistoryTable/data";
import {
	ITableColumn,
	ITableData,
	ITableOption,
} from "../components/table/model";
import MobileTransactionHistoryTable from "../components/table/TransactionHistoryTable/MobileTransactionHistoryTable";
import {
	showModal,
	getDepositTransactionHistoryAsync,
	getWithDrawalTransactionHistoryAsync,
	getCryptoSwapHistoryAsync,
	getCoinsAsync,
	getCoinPairsAsync,
} from "../redux/actions";
import { ModalTypesEnum } from "../components/modals/modalTypes";
import TableSelect from "components/table/TableSelect";

const Transactions: NextPage = () => {
	const dispatch = useDispatch();
	const {
		depositTransactionHistory,
		withdrawalTransactionHistory,
		cryptoSwapHistory,
		allCoins,
		allCoinPairs,
	} = useSelector((state: RootState) => state.transactions);
	const [initialDate, setInitialDate] = useState<string>();
	const [finalDate, setFinalDate] = useState<string>();
	const [tableOptions, setTableOptions] = useState<ITableOption[]>([]);
	const [columns, setColumns] = useState<ITableColumn[]>([]);
	const [convertColumns, setConvertColumns] = useState<ITableColumn[]>([]);
	const [isConvert, setIsConvert] = useState<boolean>(false);
	useEffect(() => {
		dispatch(getCoinsAsync());
		dispatch(getCoinPairsAsync());
		dispatch(getDepositTransactionHistoryAsync({ type: "deposit" }));
		dispatch(getWithDrawalTransactionHistoryAsync({ type: "withdraw" }));
		dispatch(getCryptoSwapHistoryAsync({}));
		setTableOptions(transactionHistoryTableOptions);
		setColumns(transactionHistoryTableColumns);
		setConvertColumns(transactionHistoryTableConvertColumns);
	}, []);
	const formatCoinPairs = (assets: any[]) => {
		const filteredCoinPairs: any = [];
		filteredCoinPairs.push("All");
		const result = assets.map((a: any, i: number) => {
			filteredCoinPairs.push(a[0]);
		});
		return filteredCoinPairs;
	};
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
	const [typeKey, setTypeKey] = useState<any>("deposit");
	const [timeKey, setTimeKey] = useState<any>("");
	const [assetKey, setAssetKey] = useState<any>("");
	const [statusKey, setStatusKey] = useState<any>("");
	const [txIDKey, setTxIDKey] = useState<any>("");
	const [convertDateKey, setConvertDateKey] = useState<any>("");
	const [convertPairKey, setConvertPairKey] = useState<any>("");
	let filteredTransactionHistoryTableData = depositTransactionHistory;
	let filteredTransactionHistoryTableConvertData = cryptoSwapHistory;
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
		// dispatch(getCryptoSwapHistoryAsync({}))
		if (convertDateKey && convertDateKey != "All") {
			filteredTransactionHistoryTableConvertData =
				filteredTransactionHistoryTableConvertData?.filter((data: any) =>
					data.date.toLowerCase().includes(convertDateKey.toLocaleLowerCase())
				);
		}
		if (convertPairKey) {
			filteredTransactionHistoryTableConvertData =
				filteredTransactionHistoryTableConvertData?.filter(
					(data: any) =>
						convertPairKey
							.toLowerCase()
							.includes(data.quoteAsset.toLocaleLowerCase()) &&
						convertPairKey
							.toLowerCase()
							.includes(data.baseAsset.toLocaleLowerCase())
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
	useEffect(() => {
		if (typeKey === "deposit") {
			if (timeKey == "") {
				dispatch(getDepositTransactionHistoryAsync({ type: "deposit" }));
			} else if (timeKey === "day") {
				var nowDate = new Date();
				var dayStartDate = new Date();
				var tempDate = nowDate.getDate() - 1;
				dayStartDate.setDate(tempDate);
				dispatch(
					getDepositTransactionHistoryAsync({
						type: "deposit",
						fromDate: dayStartDate.toISOString(),
						toDate: nowDate.toISOString(),
					})
				);
			} else if (timeKey === "week") {
				var nowDate = new Date();
				var weekStartDate = new Date();
				var tempDate = nowDate.getDate() - 7;
				weekStartDate.setDate(tempDate);
				dispatch(
					getDepositTransactionHistoryAsync({
						type: "deposit",
						fromDate: weekStartDate.toISOString(),
						toDate: nowDate.toISOString(),
					})
				);
			} else {
				var nowDate = new Date();
				var monthStartDate = new Date();
				var tempDate = nowDate.getDate() - 31;
				monthStartDate.setDate(tempDate);
				dispatch(
					getDepositTransactionHistoryAsync({
						type: "deposit",
						fromDate: monthStartDate.toISOString(),
						toDate: nowDate.toISOString(),
					})
				);
			}
		} else {
			if (timeKey == "") {
				dispatch(getWithDrawalTransactionHistoryAsync({ type: "withdraw" }));
			} else if (timeKey === "day") {
				var nowDate = new Date();
				var dayStartDate = new Date();
				var tempDate = nowDate.getDate() - 1;
				dayStartDate.setDate(tempDate);
				dispatch(
					getWithDrawalTransactionHistoryAsync({
						type: "withdraw",
						fromDate: dayStartDate.toISOString(),
						toDate: nowDate.toISOString(),
					})
				);
			} else if (timeKey === "week") {
				var nowDate = new Date();
				var weekStartDate = new Date();
				var tempDate = nowDate.getDate() - 7;
				weekStartDate.setDate(tempDate);
				dispatch(
					getWithDrawalTransactionHistoryAsync({
						type: "withdraw",
						fromDate: weekStartDate.toISOString(),
						toDate: nowDate.toISOString(),
					})
				);
			} else {
				var nowDate = new Date();
				var monthStartDate = new Date();
				var tempDate = nowDate.getDate() - 31;
				monthStartDate.setDate(tempDate);
				dispatch(
					getWithDrawalTransactionHistoryAsync({
						type: "withdraw",
						fromDate: monthStartDate.toISOString(),
						toDate: nowDate.toISOString(),
					})
				);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timeKey]);

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
	if (typeKey === "deposit") {
		filteredTransactionHistoryTableData = depositTransactionHistory;
		if (assetKey) {
			filteredTransactionHistoryTableData =
				filteredTransactionHistoryTableData?.filter((data: any) =>
					data.asset.toLowerCase().includes(assetKey.toLocaleLowerCase())
				);
		}
		if (statusKey) {
			filteredTransactionHistoryTableData =
				filteredTransactionHistoryTableData?.filter(
					(data: any) => data.status == statusKey
				);
		}
		if (txIDKey) {
			filteredTransactionHistoryTableData =
				filteredTransactionHistoryTableData?.filter((data: any) =>
					data.txId.toLowerCase().includes(txIDKey.toLocaleLowerCase())
				);
		}
	} else {
		filteredTransactionHistoryTableData = withdrawalTransactionHistory;
		if (assetKey) {
			filteredTransactionHistoryTableData =
				filteredTransactionHistoryTableData?.filter((data: any) =>
					data.currency.toLowerCase().includes(assetKey.toLocaleLowerCase())
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
					data.withdrawOrderId
						.toLowerCase()
						.includes(txIDKey.toLocaleLowerCase())
				);
		}
	}

	const fetchCoinImage = (coins: any, coin: string) => {
		const coinData = coins.filter(
			(data: any) => data.coin.toLowerCase() === coin.toLocaleLowerCase()
		);
		return coinData[0]?.image;
	};

	const dataSource: ITableData[] =
		filteredTransactionHistoryTableData &&
		filteredTransactionHistoryTableData.length > 0
			? filteredTransactionHistoryTableData.map((row: any) => {
					if (typeKey === "deposit") {
						return {
							key: row.id,
							asset: (
								<div className="flex items-center pt-2 xl:pt-5">
									<div className="flex items-center w-10 h-10 coins">
										{fetchCoinImage(allCoins, row.asset) ? (
											<Image
												src={fetchCoinImage(allCoins, row.asset)}
												quality={"100"}
												alt={row.asset}
												width={30}
												height={30}
											/>
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
									{"deposit"}
								</div>
							),
							time: (
								<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
									{getDateTimeWithoutA(row.createdOn)}
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
										<div>{centeredEllipsis(row.address)}</div>
										<div
											onClick={() => handleLink("destination", row.address)}
											className={`ml-2 cursor-pointer`}
										>
											<TransactionLink />
										</div>
										<div
											onClick={() => handleCopy("destination", row.address)}
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
										<div>{centeredEllipsis(row.txId)}</div>
										<div
											onClick={() => handleLink("txID", row.txId)}
											className={`ml-2 cursor-pointer`}
										>
											<TransactionLink />
										</div>
										<div
											onClick={() => handleCopy("txID", row.txId)}
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
												row.status === 1
													? TransactionStatusVariant.SUCCESSFUL
													: row.status === 0
													? TransactionStatusVariant.PENDING
													: TransactionStatusVariant.FAILED
											}`}
										></div>
										<div>
											{row.status === 1
												? "Successful"
												: row.status === 0
												? "Pending"
												: "Failed"}
										</div>
									</div>
								</div>
							),
						};
					} else {
						return {
							key: row.id,
							asset: (
								<div className="flex items-center pt-2 xl:pt-5">
									<div className="">
										<div className={DataState.DEFAULT}>{row.currency}</div>
									</div>
								</div>
							),
							type: (
								<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
									{"withdrawal"}
								</div>
							),
							time: (
								<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
									{getDateTimeWithoutA(row.createdOn)}
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
										<div>{centeredEllipsis(row.address)}</div>
										<div
											onClick={() => handleLink("destination", row.address)}
											className={`ml-2 cursor-pointer`}
										>
											<TransactionLink />
										</div>
										<div
											onClick={() => handleCopy("destination", row.address)}
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
										<div>
											{row.withdrawOrderId
												? centeredEllipsis(row.withdrawOrderId)
												: centeredEllipsis(row.id)}
										</div>
										<div
											onClick={() => handleLink("txID", row.withdrawOrderId)}
											className={`ml-2 cursor-pointer`}
										>
											<TransactionLink />
										</div>
										<div
											onClick={() => handleCopy("txID", row.withdrawOrderId)}
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
												row.status === "successful"
													? TransactionStatusVariant.SUCCESSFUL
													: row.status === "approved"
													? TransactionStatusVariant.SUCCESSFUL
													: row.status === "pending"
													? TransactionStatusVariant.PENDING
													: TransactionStatusVariant.FAILED
											}`}
										></div>
										<div>
											{row.status === "successful"
												? "Successful"
												: row.status === "approved"
												? "Approved"
												: row.status === "pending"
												? "Pending"
												: "Failed"}
										</div>
									</div>
								</div>
							),
						};
					}
			  })
			: [];

	const convertDataSource: ITableData[] =
		filteredTransactionHistoryTableConvertData &&
		filteredTransactionHistoryTableConvertData.length > 0
			? filteredTransactionHistoryTableConvertData.map((row: any) => {
					return {
						key: row.swapId,
						date: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{getDateTimeFormatUK(row.swapTime)}
							</div>
						),
						pair: (
							<div className="flex items-center pt-2 xl:pt-5">
								{/* <div className="flex items-center w-10 h-10 coins">
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
                                </div> */}

								<div className="">
									<div className={DataState.DEFAULT}>
										{row.quoteAsset}
										{row.baseAsset}
									</div>
								</div>
							</div>
						),
						type: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{row.type ? row.type : "market"}
							</div>
						),
						from: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{formatToCurrency(row.quoteQty, 6)} {row.quoteAsset}
							</div>
						),
						to: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{formatToCurrency(row.baseQty, 6)} {row.baseAsset}
							</div>
						),
						price: (
							<div
								className={`pt-2 xl:pt-5 grid grid-rows-1 ${DataState.DEFAULT}`}
							>
								<div>{`1 ${row.quoteAsset} = ${formatToCurrency(
									1 / row.price,
									6
								)} ${row.baseAsset}`}</div>
								<div>{`1 ${row.baseAsset} = ${formatToCurrency(row.price, 6)} ${
									row.quoteAsset
								}`}</div>
							</div>
						),
						status: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								<div className={"flex items-center"}>
									<div
										className={`h-2 w-2 rounded-full mr-2 ${
											row.status === 1
												? TransactionStatusVariant.SUCCESSFUL
												: row.status === 2
												? TransactionStatusVariant.FAILED
												: TransactionStatusVariant.PENDING
										}`}
									></div>
									<div>
										{row.status === 1
											? "Successful"
											: row.status === 2
											? "Failed"
											: "Pending"}
									</div>
								</div>
							</div>
						),
					};
			  })
			: [];

	return (
		<DashboardLayout
			title={"Rocket Global Transactions"}
			keywords={"Wallet, Rocket, Dashboard, Account, Transaction History"}
			description={""}
		>
			<>
				<div className={"w-full mt-12"}>
					<TransactionHistoryTable
						tableOptions={tableOptions}
						cssClass="p-5 rounded bg-white h-full"
						title="Transaction History"
						handleOption={(value) => filterTableOptions(value)}
					>
						<div className={"w-full"}>
							{isConvert ? (
								<div className={"hidden sm:flex gap-x-4 xl:px-8 lg:px-4 px-2"}>
									<TableDateRangePicker
										getInitial={(value) => setInitialDate(value)}
										getFinal={(value) => setFinalDate(value)}
									/>
									<TableSelect
										options={formatCoinPairs(allCoinPairs)}
										label={"Order Type"}
										placeholder={"Select Order Type"}
										onChange={(value) => setConvertPairKey(value)}
										cssClass="p-1"
									/>
									<div className="flex justify-center items-end space-x-3">
										<Button
											variant={ButtonState.PRIMARY}
											size={ButtonSize.sm}
											value="Search"
											onClick={() => handleConvertSearch()}
										/>
										{/* <Button
                                            variant={ButtonState.OUTLINE}
                                            size={ButtonSize.sm}
                                            value="Reset"
                                            onClick={() => handleConvertReset()}
                                            cssClass={"my-1"}
                                        /> */}
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
													{/* <option value="">All</option> */}
													<option value="deposit">Deposit</option>
													<option value="withdrawal">Withdrawal</option>
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
													<option value="day">a Day</option>
													<option value="week">a Week</option>
													<option value="month">a Month</option>
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
													<option
														value={typeKey === "deposit" ? "1" : "successful"}
													>
														Successful
													</option>
													<option
														value={typeKey === "deposit" ? "2" : "failed"}
													>
														Failed
													</option>
													<option
														value={typeKey === "deposit" ? "0" : "pending"}
													>
														Pending
													</option>
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
							<div className={"w-full sm:hidden"}>
								<MobileTransactionHistoryTable
									isConvert={isConvert}
									data={filteredTransactionHistoryTableData}
									convertData={filteredTransactionHistoryTableConvertData}
									isDataDeposit={typeKey === "deposit" ? true : false}
									showPagination={true}
									showPageSize={true}
									fetchCoinImage={fetchCoinImage}
									allCoins={allCoins}
								/>
							</div>
						</div>
					</TransactionHistoryTable>
				</div>
			</>
		</DashboardLayout>
	);
};
export default Transactions;
