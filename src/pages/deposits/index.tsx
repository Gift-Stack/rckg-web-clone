import {
	EthBtc,
	NavBackIcon,
	TransactionCopy,
	TransactionLink,
	USDT,
} from "assets";
import Image from "next/image";
import Footer from "components/footer";
import { footerRowsData } from "components/footer/data";
import Table from "components/table";
import { DataState } from "components/table/enum";
import { depositTransactionTableColumns } from "components/table/TransactionTable/data";
import { ITableColumn, ITableData } from "components/table/model";
import TransactionTable from "components/table/TransactionTable";
import MobileTransactionTable from "components/table/TransactionTable/MobileTransactionTable";
import {
	IPaymentType,
	ITransactionSelectItem,
	ITransactionTab,
} from "components/transaction/model";
import TransactionSwitch from "components/transaction/TransactionSwitch";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { centeredEllipsis } from "utils";
import {
	PaymentType,
	TransactionStatusVariant,
} from "components/transaction/enum";
import { CoinEnum } from "types/enum/coinEnum";
import { getDateTimeWithoutA } from "../../constants";
import DepositCrypto from "components/transaction/Deposit/DepositCrypto";
import {
	transactionTips,
	depositTransactionTabs,
	currencySelectItems,
	depositPaymentTypes,
} from "components/transaction/data";
import DepositFiat from "components/transaction/Deposit/DepositFiat";
import { CurrencyEnum } from "types/enum";
import { TransactionLayout } from "components/layout/TransactionLayout";
import NavBack from "components/nav-back";
import { useRouter } from "next/router";
import {
	getDepositAddressAsync,
	getNetworksAsync,
	getCoinsAsync,
	getDepositHistoryAsync,
} from "redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { IDepositPayload, IHistoryTable } from "services/transactionsService";
import {
	IDepositHistory,
	IDepositHistoryItem,
} from "components/table/TransactionTable/model";

const Deposits: NextPage = () => {
	const [coinSelectData, setCoinSelectData] = useState<
		ITransactionSelectItem[]
	>([]);
	const [networkSelectData, setNetworkSelectData] = useState<
		ITransactionSelectItem[]
	>([]);
	const [currencySelectData, setCurrencySelectData] = useState<
		ITransactionSelectItem[]
	>([]);
	const [page, setPage] = useState<number>(1);
	const [active, setActive] = useState<string>("Deposit Crypto");
	const [columns, setColumns] = useState<ITableColumn[]>([]);
	const [coinSelectToggle, setCoinSelectToggle] = useState<boolean>(false);
	const [networkSelectToggle, setNetworkSelectToggle] =
		useState<boolean>(false);
	const [currencySelectToggle, setCurrencySelectToggle] =
		useState<boolean>(false);
	const [transactionTabs, setTransactionTabs] = useState<ITransactionTab[]>([]);
	const [selectedCoin, setSelectedCoin] = useState<any>(null);
	const [selectedNetwork, setSelectedNetwork] = useState<any>(null);
	const [selectedCurrency, setSelectedCurrency] = useState<any>(null);
	const [selectedPaymentType, setSelectedPaymentType] = useState<string>("");
	const [paymentTypes, setPaymentTypes] = useState<IPaymentType[]>([]);
	const [address, setAddress] = useState<null | string>(null);
	const router = useRouter();
	const dispatch = useDispatch();
	const { allCoins, allNetworks, depositAddress, depositHistory } = useSelector(
		(state: RootState) => state.transactions
	);
	const [searchText, setSearchText] = useState<string>("");
	const [filteredCoins, setFilteredCoins] = useState(allCoins);

	useEffect(() => {
		setColumns(depositTransactionTableColumns);
		setTransactionTabs(depositTransactionTabs);
		setCurrencySelectData(_setCurrencySelectData());
		sortPaymentTypes("Recommended");
	}, []);

	useEffect(() => {
		if (allCoins && allCoins.length) {
			setCoinSelectData(_setCoinSelectData(allCoins));
			setFilteredCoins(_setCoinSelectData(allCoins));
		}
	}, [allCoins]);

	useEffect(() => {
		if (allNetworks && allNetworks.length) {
			setNetworkSelectData(_setNetworkSelectData(allNetworks));
		} else {
			if (selectedCoin) {
				const data: IDepositPayload = {
					coin: selectedCoin.name,
				};
				dispatch(getDepositAddressAsync(data));
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allNetworks]);

	useEffect(() => {
		if (depositAddress) {
			setAddress(depositAddress.address);
		}
	}, [depositAddress]);

	useEffect(() => {
		dispatch(getCoinsAsync());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const data: IHistoryTable = {
			page,
		};
		dispatch(getDepositHistoryAsync(data));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	const fetchCoinImage = (coins: any, coin: string) => {
		const coinData = coins.filter(
			(data: any) => data.coin.toLowerCase() === coin.toLocaleLowerCase()
		);
		return coinData[0]?.image;
	};

	const dataSource: ITableData[] =
		depositHistory && depositHistory.items && depositHistory.items.length > 0
			? depositHistory.items.map((row: IDepositHistoryItem) => {
					return {
						key: row.insertTime,
						coin: (
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
						date_time: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{getDateTimeWithoutA(row.insertTime)}
							</div>
						),
						deposit_amount: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{row.amount}
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
						tx_id: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								<div className={"flex items-center"}>
									<div>{centeredEllipsis(row.txId)}</div>
									<div
										onClick={() => handleLink("tx_id", row.txId)}
										className={`ml-2 cursor-pointer`}
									>
										<TransactionLink />
									</div>
									<div
										onClick={() => handleCopy("tx_id", row.txId)}
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

	const _setCoinSelectData = (coins: any[]): ITransactionSelectItem[] => {
		const data: ITransactionSelectItem[] = coins.map((c) => {
			return {
				id: c.coin,
				item: (
					<>
						<div className="flex items-center transaction-select-item text-neutral-400">
							<span>
								{c.image ? (
									<Image
										src={c.image}
										quality={"100"}
										alt={c.coin}
										width={30}
										height={30}
									/>
								) : (
									<EthBtc />
								)}
							</span>
							<span className="font-normal ml-3 block truncate">
								{c.name} - {c.coin}
							</span>
						</div>
					</>
				),
				selected: false,
				name: c.coin,
			};
		});
		return data;
	};

	const _setNetworkSelectData = (networks: any[]): ITransactionSelectItem[] => {
		const data: ITransactionSelectItem[] = networks.map((n) => {
			return {
				id: n.network,
				item: (
					<>
						<div className="flex items-center transaction-select-item text-neutral-400">
							<span className="font-normal ml-3 block truncate">
								{n.name} - {n.network}
							</span>
						</div>
					</>
				),
				selected: false,
				name: n.network,
				network: n.name,
			};
		});
		return data;
	};

	const _setCurrencySelectData = (): ITransactionSelectItem[] => {
		const data: ITransactionSelectItem[] = currencySelectItems.map((c) => {
			return {
				id: c.id,
				item: (
					<>
						<div className="flex items-center transaction-select-item text-neutral-400">
							<span>
								{c.name === CurrencyEnum.USDT ? (
									<USDT />
								) : CurrencyEnum.NAIRA ? (
									<USDT />
								) : (
									<USDT />
								)}
							</span>
							<span className="font-normal ml-3 block truncate">{c.name}</span>
						</div>
					</>
				),
				selected: false,
				name: c.name,
			};
		});
		return data;
	};

	const handleLink = (type: string, link: string): void => {
		navigator.clipboard.writeText(link);
	};

	const handleCopy = (type: string, copy: string): void => {
		navigator.clipboard.writeText(copy);
	};

	const handleSetActive = (value: string): void => {
		setActive(value);
		setSelectedCoin(null);
		setSelectedNetwork(null);
		setSelectedCurrency(null);
		setSelectedPaymentType("");
	};

	const handleSelectClose = (e?: any): void => {
		if (e.target?.name !== "search-input") {
			coinSelectToggle && setCoinSelectToggle(false);
			networkSelectToggle && setNetworkSelectToggle(false);
			currencySelectToggle && setCurrencySelectToggle(false);
		}
	};

	const sortPaymentTypes = (tab: string): void => {
		if (tab === "Recommended") {
			setPaymentTypes(
				depositPaymentTypes.filter((t) => t.name === PaymentType.CARD)
			);
		} else {
			setPaymentTypes(
				depositPaymentTypes.filter((t) => t.name !== PaymentType.CARD)
			);
		}
	};

	const filterTransactionTabs = (value: string) => {
		const transactionTabs_ = transactionTabs.map((tag) => {
			return {
				name: tag.name,
				isActive: tag.name === value ? true : false,
			};
		});
		sortPaymentTypes(value);
		setTransactionTabs(transactionTabs_);
	};

	const handleSelectedItem = (index: number, select: string) => {
		if (select === "Coin") {
			setNetworkSelectData([]);
			setSelectedNetwork(null);
			setAddress(null);
			setSelectedCoin(coinSelectData.find((c) => c.id === index));
			const coin: any = coinSelectData.find((c) => c.id === index);
			if (coin) {
				const data: IDepositPayload = {
					coin: coin.name,
				};
				dispatch(getNetworksAsync(data));
			}
		}

		if (select === "Network") {
			setSelectedNetwork(networkSelectData.find((n) => n.id === index));
			const network: any = networkSelectData.find((n) => n.id === index);
			const data: IDepositPayload = {
				coin: selectedCoin.name,
				network: network.name,
			};
			dispatch(getDepositAddressAsync(data));
		}
		select === "Currency" &&
			setSelectedCurrency(currencySelectData.find((c) => c.id === index));
	};

	const handlePaymentType = (value: string) => {
		setSelectedPaymentType(value);
	};

	const copyAddress = (value: string) => {
		navigator.clipboard.writeText(value);
	};

	const handleSearch = (e?: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e?.target.value ?? "");
		const searchKey = e?.target.value;
		if (searchKey) {
			const _filteredCrypto = filteredCoins.filter((crypto: any) =>
				crypto.name.toLowerCase().includes(searchKey.toLocaleLowerCase())
			);
			setFilteredCoins(_filteredCrypto);
		} else {
			setFilteredCoins(_setCoinSelectData(allCoins));
			setSearchText("");
		}
	};

	return (
		<TransactionLayout
			title={"Rocket Global Transaction"}
			keywords={"Login, Rocket, Transaction, Deposit Crypto, Deposit Fiat"}
			description={""}
		>
			<>
				<div className={"hidden sm:block"}>
					<NavBack
						name={"Back to Wallet"}
						icon={<NavBackIcon />}
						onClick={() => router.push("/wallet")}
					/>
				</div>
				<div className={"w-full transaction bg-white mt-0 sm:mt-10"}>
					<div
						onClick={handleSelectClose}
						className={"w-full py-6 px-8 lg:px-20"}
					>
						<div className={"mobile-nav-back block sm:hidden"}>
							<NavBack
								name={"Back to Wallet"}
								icon={<NavBackIcon />}
								onClick={() => router.push("/wallet/spot-account")}
							/>
						</div>
						<div className={"mt-4 mb-4"}>
							<TransactionSwitch
								handleSwitch={(value: string) => null}
								// handleSwitch={(value: string) => handleSetActive(value)}
								switchItem={["Deposit Crypto", "Deposit Fiat"]}
								active={active}
							/>
						</div>

						{active === "Deposit Crypto" ? (
							<DepositCrypto
								coinSelectToggle={coinSelectToggle}
								setCoinSelectToggle={(bool) => setCoinSelectToggle(!bool)}
								coinSelectData={filteredCoins}
								coinSelectLabel={"Coin"}
								coinSelectPlaceholder={"Select Coin"}
								networkSelectToggle={networkSelectToggle}
								setNetworkSelectToggle={(bool) => setNetworkSelectToggle(!bool)}
								networkSelectData={networkSelectData}
								networkSelectLabel={"Network"}
								networkSelectPlaceholder={"Select Network"}
								address={address}
								tips={transactionTips}
								showSearch
								handleSearch={handleSearch}
								searchText={searchText}
								searchPlaceholder="Search Coin"
								selectedItem={(index: number, select: string) =>
									handleSelectedItem(index, select)
								}
								selectedCoinInfo={selectedCoin}
								selectedNetwork={selectedNetwork}
								handleCopy={(value: string) => copyAddress(value)}
							/>
						) : (
							<DepositFiat
								currencySelectToggle={currencySelectToggle}
								setCurrencySelectToggle={(bool) =>
									setCurrencySelectToggle(!bool)
								}
								currencySelectData={currencySelectData}
								currencySelectLabel={"Currency"}
								currencySelectPlaceholder={"Select Currency"}
								networkSelectToggle={networkSelectToggle}
								setNetworkSelectToggle={(bool) => setNetworkSelectToggle(!bool)}
								networkSelectData={networkSelectData}
								networkSelectLabel={"Network"}
								networkSelectPlaceholder={"Select Network"}
								transactionTabs={transactionTabs}
								handleTransactionTabs={(value) => filterTransactionTabs(value)}
								selectedItem={(index: number, select: string) =>
									handleSelectedItem(index, select)
								}
								currency={selectedCurrency && selectedCurrency.name}
								paymentTypes={paymentTypes}
								handlePaymentType={(value: string) => handlePaymentType(value)}
							/>
						)}

						<TransactionTable
							cssClass="p-1 xl:p-5 rounded bg-white h-full"
							title={"Recent Deposits"}
						>
							<div className={"w-full"}>
								<div className={"w-full hidden sm:block"}>
									<Table
										columns={columns}
										dataSource={dataSource}
										showPagination={true}
										showPageSize={true}
										setCurrentPage={(value: number) => setPage(value)}
										pageSize={
											depositHistory ? depositHistory.meta.itemsPerPage : 10
										}
										totalPages={
											depositHistory ? depositHistory.meta.totalPages : 0
										}
									/>
								</div>
								<div className={"w-full md:hidden"}>
									<MobileTransactionTable
										dataSource={dataSource}
										pageSize={
											depositHistory ? depositHistory.meta.itemsPerPage : 10
										}
									/>
								</div>
							</div>
						</TransactionTable>
					</div>
					<Footer rows={footerRowsData} />
				</div>
			</>
		</TransactionLayout>
	);
};
export default Deposits;
