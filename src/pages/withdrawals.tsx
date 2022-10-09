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
import { capitalize, centeredEllipsis, showToast } from "utils";
import {
	PaymentType,
	TransactionStatusVariant,
	TransactionStatus,
} from "components/transaction/enum";
import { CoinEnum } from "types/enum/coinEnum";
import { formatToCurrency, getDateTimeWithoutA } from "../constants";
import {
	coinSelectItems,
	networkSelectItems,
	depositTransactionTabs,
	currencySelectItems,
	depositPaymentTypes,
} from "components/transaction/data";
import { CurrencyEnum } from "types/enum";
import Button from "components/button";
import { ButtonSize, ButtonState } from "components/button/enum";
import { TransactionLayout } from "components/layout/TransactionLayout";
import WithdrawCrypto from "components/transaction/Withdrawal/WithdrawCrypto";
import WithdrawFiat from "components/transaction/Withdrawal/WithdrawFiat";
import NavBack from "components/nav-back";
import { useRouter } from "next/router";
import { RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchCryptoWithdrawalHistoryAsync,
	fetchCryptoWithdrawalFeeAsync,
	postCryptoWithdrawalAsync,
	getCoinsAsync,
	getNetworksAsync,
	getVariousAssetsBalanceAsync,
	fetchWithdrawalOTPAsync,
} from "redux/actions";
import { IHistoryTable } from "services/withdrawalService";
import { IDepositPayload } from "services/transactionsService";
import { ScaleLoader } from "react-spinners";

import { ModalTypesEnum } from "components/modals/modalTypes";
import { hideModal, showModal } from "redux/actions";
import ModalWithdrawalOTP from "components/modals/ModalWithdrawalOTP";

const Withdrawals: NextPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { history } = useSelector((state: RootState) => state.withdrawal);
	const { allCoins, allNetworks, variousAssetsBalance } = useSelector(
		(state: RootState) => state.transactions
	);
	const { email, phone } = useSelector((state: RootState) => state.auth);

	const { usersKYC, firstName } = useSelector(
		(state: RootState) => state.profile
	);

	const [coinSelectData, setCoinSelectData] = useState<
		ITransactionSelectItem[]
	>([]);
	const [networkSelectData, setNetworkSelectData] = useState<
		ITransactionSelectItem[]
	>([]);
	const [currencySelectData, setCurrencySelectData] = useState<
		ITransactionSelectItem[]
	>([]);
	const [showTips, setShowTips] = useState<boolean>(false);
	const [page, setPage] = useState<number>(1);
	const [active, setActive] = useState<string>("Withdraw Crypto");
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
	const [data, setData] = useState<any>(null);
	const [address, setAddress] = useState<string>("");
	const [amount, setAmount] = useState<string>("");
	const [availableCoinBalance, setAvailableCoinBalance] = useState<number>(0);
	const [disableSubmitButton, setDisableSubmitButton] = useState<boolean>(true);
	const [withdrawalTransactionInfo, setWithdrawalTransactionInfo] =
		useState<any>();
	const [searchText, setSearchText] = useState<string>("");
	const [filteredCoins, setFilteredCoins] = useState(allCoins);
	const [submitting, setSubmitting] = useState(false);
	const [showOTPModal, setShowOTPModal] = useState(false);
	const getHistorydata: IHistoryTable = {
		page,
	};

	useEffect(() => {
		// dispatch(showModal(ModalTypesEnum.WITHDRAWAL_OTP));
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
		}
	}, [allNetworks]);

	useEffect(() => {
		dispatch(getCoinsAsync());
		dispatch(getVariousAssetsBalanceAsync());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		dispatch(fetchCryptoWithdrawalHistoryAsync(getHistorydata));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	const transactionTips = [
		{
			id: 1,
			tip: `Please make sure you send only ${withdrawalTransactionInfo?.currency} to this deposit address.`,
		},
		{
			id: 2,
			tip: `The minimum withdrawal is ${withdrawalTransactionInfo?.withdrawMin} ${withdrawalTransactionInfo?.currency}.`,
		},
		{
			id: 3,
			tip: `Network fee is  ${withdrawalTransactionInfo?.totalFee}.`,
		},
	];

	const fetchCoinImage = (coins: any, coin: string) => {
		const coinData = coins.filter(
			(data: any) => data.coin.toLowerCase() === coin.toLocaleLowerCase()
		);
		return coinData[0]?.image;
	};

	const dataSource: ITableData[] =
		history && history.length > 0
			? history.map((row: any) => {
					return {
						key: row.id,
						coin: (
							<div className="flex items-center pt-2 xl:pt-5">
								<div className="flex items-center w-10 h-10 coins">
									{fetchCoinImage(allCoins, row.coin) ? (
										<Image
											src={fetchCoinImage(allCoins, row.coin)}
											quality={"100"}
											alt={row.coin}
											width={30}
											height={30}
										/>
									) : (
										<EthBtc />
									)}
								</div>

								<div className="ml-1">
									<div className={DataState.DEFAULT}>{row.coin}</div>
								</div>
							</div>
						),
						date_time: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{getDateTimeWithoutA(row.submittedTimeStamp)}
							</div>
						),
						deposit_amount: (
							<div className={`pt-2 xl:pt-5 ${DataState.DEFAULT}`}>
								{formatToCurrency(row.amount, 9)}
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
									<div>{centeredEllipsis(row.id)}</div>
									<div
										onClick={() => handleLink("tx_id", row.id)}
										className={`ml-2 cursor-pointer`}
									>
										<TransactionLink />
									</div>
									<div
										onClick={() => handleCopy("tx_id", row.id)}
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
											row.status === TransactionStatus.SUCCESSFUL
												? TransactionStatusVariant[TransactionStatus.SUCCESSFUL]
												: TransactionStatus.PENDING
												? TransactionStatusVariant[TransactionStatus.PENDING]
												: TransactionStatusVariant[TransactionStatus.FAILED]
										}`}
									></div>
									<div>{capitalize(row.status)}</div>
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
		setShowTips(false);
		if (select === "Coin") {
			setNetworkSelectData([]);
			setSelectedNetwork(null);
			setAddress("");
			setAmount("");
			setSelectedCoin(coinSelectData.find((c) => c.id === index));
			const coin: any = coinSelectData.find((c) => c.id === index);
			if (coin) {
				const data: IDepositPayload = {
					coin: coin.name,
				};
				dispatch(getNetworksAsync(data));
				variousAssetsBalance
					?.filter((data: any) => data.asset === coin.name)
					.map((assetData: any) => setAvailableCoinBalance(assetData.free));
			}
		}
		select === "Network" &&
			setSelectedNetwork(networkSelectData.find((n) => n.id === index));
		select === "Currency" &&
			setSelectedCurrency(currencySelectData.find((c) => c.id === index));
	};

	const handlePaymentType = (value: string) => {
		setSelectedPaymentType(value);
	};

	const transactionFee = async () => {
		let _data;
		if (active === "Withdraw Crypto") {
			_data = {
				coin: selectedCoin?.name,
				network: selectedNetwork?.name,
				address: address,
				amount: Number(amount),
			};

			setData(_data);
			dispatch(
				fetchCryptoWithdrawalFeeAsync(_data, async (res: any) => {
					setWithdrawalTransactionInfo(res.data);
					setShowTips(true);
					// await router.push(
					// 	`/withdrawals`
					// );
				})
			);
		} else {
			_data = {
				currency: selectedCurrency?.name,
				network: selectedNetwork?.name,
				paymenyType: selectedPaymentType,
			};
			setData(_data);
		}
	};

	useEffect(() => {
		if (
			(selectedCoin?.name &&
				selectedNetwork?.name &&
				address &&
				amount &&
				Number(amount) > 0) ||
			(selectedCurrency?.name && selectedNetwork?.name && selectedPaymentType)
		) {
			setTimeout(() => {
				transactionFee();
				setDisableSubmitButton(false);
			}, 300);
		} else {
			setDisableSubmitButton(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		selectedCoin,
		selectedNetwork,
		address,
		amount,
		selectedCurrency,
		selectedPaymentType,
	]);

	const handleSubmit = (otp: string): void => {
		if (active === "Withdraw Crypto") {
			setSubmitting(true);
			const payload = {
				...data,
				otp,
			};
			dispatch(
				postCryptoWithdrawalAsync(
					payload,
					async (res: any) => {
						dispatch(fetchCryptoWithdrawalHistoryAsync(getHistorydata));
						setNetworkSelectData([]);
						setSelectedNetwork(null);
						setAddress("");
						setAmount("");
						setSubmitting(false);
						setShowOTPModal(false);
						// await router.push(
						// 	`/withdrawals`
						// );
					},
					async (res: any) => {
						setSubmitting(false);
						setShowOTPModal(false);
					}
				)
			);
		} else {
			setSubmitting(false);
		}
	};

	const requestOTP = (): void => {
		if (firstName && phone && usersKYC[0].verified) {
			setShowOTPModal(true);
			dispatch(
				fetchWithdrawalOTPAsync(
					{
						otpType: "crypto withdrawal",
						email,
					},
					async (res: any) => {},
					async (res: any) => {}
				)
			);
		} else {
			setShowOTPModal(false);
			showToast("Please verify your account", "error");
			router.push("/settings/identity");
		}
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
			keywords={
				"Login, Rocket, Transaction, Withdrawal Crypto, Withdrawal Fiat"
			}
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
								switchItem={["Withdraw Crypto", "Withdraw Fiat"]}
								active={active}
							/>
						</div>

						{active === "Withdraw Crypto" ? (
							<WithdrawCrypto
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
								tips={transactionTips}
								showTips={showTips}
								selectedItem={(index: number, select: string) =>
									handleSelectedItem(index, select)
								}
								onAddressInput={(value) => setAddress(value)}
								amount={amount}
								onAmountInput={(value) => setAmount(value)}
								availableCoinBalance={availableCoinBalance}
								showSearch
								searchPlaceholder="Search Coin"
								searchText={searchText}
								handleSearch={handleSearch}
								selectedCoinInfo={selectedCoin}
							/>
						) : (
							<WithdrawFiat
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

						<div
							className={
								"text-left w-full flex justify-center trans-submit-btn mt-2"
							}
						>
							<div
								className={
									"w-full md:w-4/6 lg:w-3/6 xl:w-2/6 text-neutral-400 text-labels md:text-sm-headline py-2"
								}
							>
								<Button
									disabled={disableSubmitButton}
									variant={ButtonState.PRIMARY}
									value={
										submitting ? <ScaleLoader color={"#FFF"} /> : "Continue"
									}
									size={ButtonSize.lg}
									type={"submit"}
									onClick={requestOTP}
								/>
							</div>
						</div>

						<TransactionTable
							cssClass="p-1 xl:p-5 rounded bg-white h-full"
							title={"Recent Withdrawals"}
						>
							<div className={"w-full"}>
								<div className={"w-full hidden sm:block"}>
									<Table
										columns={columns}
										dataSource={dataSource}
										showPagination={true}
										showPageSize={true}
										// setCurrentPage={(value: number) => setPage(value)}
									/>
								</div>
								<div className={"w-full md:hidden"}>
									<MobileTransactionTable
										dataSource={dataSource}
										pageSize={5}
									/>
								</div>
							</div>
						</TransactionTable>
					</div>
					<Footer rows={footerRowsData} />
				</div>
				{showOTPModal && (
					<ModalWithdrawalOTP
						{...{
							setShowOTPModal,
							handleSubmit,
							resendWithdrawalOtp: requestOTP,
						}}
					/>
				)}
			</>
		</TransactionLayout>
	);
};
export default Withdrawals;
