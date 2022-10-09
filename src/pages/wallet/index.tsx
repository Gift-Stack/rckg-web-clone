import { EthBtc } from "../../assets";
import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../../components/dashboard/wallet/header";
import { NextPage } from "next";
import { DashboardLayout } from "../../components";
import Button from "./../../components/button";
import { ButtonSize, ButtonState } from "./../../components/button/enum";
import Router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SkeletonLoader from "components/skeleton";

import { DataState } from "../../components/table/enum";
import Table from "../../components/table";
import { formatToCurrency } from "../../constants";
import { ISpotAccountTableData } from "../../components/table/SpotAccountTable/model";
import { spotAccountTableColumns } from "../../components/table/SpotAccountTable/data";
import { ITableColumn, ITableData } from "../../components/table/model";
import { CoinEnum } from "../../types/enum";

import MobileSpotAccountTable from "../../components/table/SpotAccountTable/MobileSpotAccountTable";
import SearchFilter from "../../components/table/SearchFilter";
import { showModal, hideModal } from "../../redux/actions";
import { ModalTypesEnum } from "../../components/modals/modalTypes";
import { RootState } from "redux/store";
import {
	fetchWalletAssetsBalanceAsync,
	getTotalAssetsBalanceBTC,
	getRateBTCUSDT,
	getCoinsAsync,
} from "../../redux/actions";
import SpotAccountTable from "components/table/SpotAccountTable";

const Wallet: NextPage = () => {
	const dispatch = useDispatch();
	const { assets, assetsBalnceInBTC, rateBTCUSDT } = useSelector(
		(state: RootState) => state.wallet
	);
	const { allCoins } = useSelector(
		(state: RootState) => state.transactions
	);
	const { pathname } = useRouter();
	const options = [{ title: "Spot Account", uri: "/wallet/spot-account" }];
	const [columns, setColumns] = useState<ITableColumn[]>([]);
	const [searchKey, setSearchKey] = useState<any>("");

	useEffect(() => {
		setColumns(spotAccountTableColumns);
	}, []);
	useEffect(() => {
		dispatch(getTotalAssetsBalanceBTC());
		dispatch(getRateBTCUSDT());
		dispatch(fetchWalletAssetsBalanceAsync());
		dispatch(getCoinsAsync());
		//eslint-disable-next-line
	}, []);

	const filterBySearch = (query: string) => {
		setSearchKey(query);
	};

	let filteredTableData = assets.sort((a: any, b: any) =>
		a.free < b.free ? 1 : -1
	);
	if (searchKey) {
		filteredTableData = assets?.filter((data: any) =>
			data.asset.toLowerCase().includes(searchKey.toLocaleLowerCase())
		);
	}

	const handleBuy = (row: ISpotAccountTableData): void => {
		Router.push("../buy-crypto");
	};

	const handleDeposit = (row?: ISpotAccountTableData): void => {
		Router.push("/deposits");
		// dispatch(
		// 	showModal(ModalTypesEnum.DEPOSIT, {
		// 		cryptoDeposit: () => {
		// 			dispatch(hideModal());
		// 			return Router.push("/deposits");
		// 		},
		// 		fiatDeposit: () => {
		// 			dispatch(hideModal());
		// 			return Router.push("/deposits");
		// 		},
		// 	})
		// );
	};

	const handleWithdraw = (row?: ISpotAccountTableData): void => {
		Router.push("../withdrawals");
	};

	const handleTrade = (row: ISpotAccountTableData): void => {
		Router.push(`/trade/${row.asset}_USDT`);
	};

	const handleTransfer = (row?: ISpotAccountTableData): void => {
		dispatch(showModal(ModalTypesEnum.TRANSFER_CRYPTO));
	};

	const handleConvert = (row: ISpotAccountTableData): void => {
		Router.push("../crypto-swap");
	};

	const fetchCoinImage = (coins: any, coin: string) => {
		const coinData = coins.filter((data: any) =>
			data.coin.toLowerCase() === (coin.toLocaleLowerCase())
		);
		return coinData[0]?.image;
	};

	const fetchCoinName = (coins: any, coin: string) => {
		const coinData = coins.filter((data: any) =>
			data.coin.toLowerCase() === (coin.toLocaleLowerCase())
		);
		return coinData[0]?.name;
	};

	const dataSource: ITableData[] =
		filteredTableData && filteredTableData.length > 0
			? filteredTableData.map((row: any) => {
					return {
						key: row.asset,
						coin: (
							<div className="flex items-center">
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
									<div className={"text-gray-700 text-labels"}>{fetchCoinName(allCoins, row.asset)}</div>
								</div>
							</div>
						),
						total: (
							<div className={"text-neutral-400"}>
								{formatToCurrency(
									parseFloat(row.free) + parseFloat(row.locked),
									6
								)}
							</div>
						),
						avaliable: (
							<div className={"text-neutral-400"}>
								{formatToCurrency(row.free, 6)}
							</div>
						),
						inOrder: (
							<div className={"text-neutral-400"}>
								{formatToCurrency(row.locked, 6)}
							</div>
						),
						usdt: (
							<div className={"text-neutral-400"}>
								{formatToCurrency(row.usdtValue, 6)}
							</div>
						),
						option: (
							<div className="flex items-center justify-center">
								<button
									data-testid="rg-option-button"
									title="Coming Soon!"
									// onClick={() => handleBuy(row)}
									className={`bg-transparent rounded text-disabled font-normal text-x-small sm:text-sm-regular my-1 py-0.5 px-2.5`}
								>
									Buy
								</button>
								<button
									data-testid="rg-option-button"
									onClick={() => handleDeposit(row)}
									className={`bg-transparent rounded text-primary-400 font-normal text-x-small sm:text-sm-regular my-1 py-0.5 px-2.5`}
								>
									Deposit
								</button>
								<button
									data-testid="rg-option-button"
									onClick={() => handleWithdraw(row)}
									className={`bg-transparent rounded text-primary-400 font-normal text-x-small sm:text-sm-regular my-1 py-0.5 px-2.5`}
								>
									Withdraw
								</button>
								<button
									data-testid="rg-option-button"
									onClick={() => handleTrade(row)}
									className={`bg-transparent rounded text-primary-400 font-normal text-x-small sm:text-sm-regular my-1 py-0.5 px-2.5`}
								>
									Trade
								</button>
								{/* <button
									data-testid="rg-option-button"
									onClick={() => handleTransfer(row)}
									className={`bg-transparent rounded text-primary-400 font-normal text-x-small sm:text-sm-regular my-1 py-0.5 px-2.5`}
								>
									Transfer
								</button> */}
								<button
									data-testid="rg-option-button"
									onClick={() => handleConvert(row)}
									className={`bg-transparent rounded text-primary-400 font-normal text-x-small sm:text-sm-regular my-1 py-0.5 px-2.5`}
								>
									Convert
								</button>
							</div>
						),
					};
			  })
			: [];

	return (
		<DashboardLayout
			title={"Rocket Global Spot Account"}
			keywords={"Wallet, Spot account, Rocket"}
			description={""}
		>
			<>
				<div className={"w-full lg:flex md:grid"}>
					<Header
						pathname={pathname}
						options={options}
						btcBalance={parseFloat(assetsBalnceInBTC.totalAssetOfBtc)}
						usdtBalance={formatToCurrency(
							parseFloat(assetsBalnceInBTC.totalAssetOfBtc) *
								parseFloat(rateBTCUSDT.price),
							2
						)}
						button1={
							<Button
								variant={ButtonState.PRIMARYALT}
								size={ButtonSize.sm}
								value="Deposit"
								onClick={() => handleDeposit()}
								style={{ width: "6rem" }}
							/>
						}
						button2={
							<Button
								variant={ButtonState.OUTLINEALT}
								size={ButtonSize.sm}
								value="Withdraw"
								onClick={() => handleWithdraw()}
								style={{ width: "6rem" }}
							/>
						}
						// button3={
						//     <Button
						//         variant={ButtonState.OUTLINEALT}
						//         size={ButtonSize.sm}
						//         value="Transfer"
						//         onClick={() => handleTransfer()}
						//         style={{ width: "6rem" }}
						//     />
						// }
					/>
				</div>
				<SpotAccountTable filterBySearch={filterBySearch}>
					<>
						<div className={"w-full hidden sm:block bg-white mt-3 pt-3"}>
						{!dataSource.length 
							? <SkeletonLoader /> 
							: <Table
									columns={columns}
									dataSource={dataSource}
									showPagination={true}
									showPageSize={true}
								/>
						}
						</div>
						<div className={"w-full md:hidden"}>
							{!dataSource.length && <SkeletonLoader height={160} />}
							<MobileSpotAccountTable
								buy={(value: ISpotAccountTableData) => handleBuy(value)}
								deposit={(value: ISpotAccountTableData) => handleDeposit(value)}
								withdraw={(value: ISpotAccountTableData) =>
									handleWithdraw(value)
								}
								trade={(value: ISpotAccountTableData) => handleTrade(value)}
								transfer={(value: ISpotAccountTableData) =>
									handleTransfer(value)
								}
								convert={(value: ISpotAccountTableData) => handleConvert(value)}
								data={filteredTableData}
								fetchCoinName={fetchCoinName}
								fetchCoinImage={fetchCoinImage}
								allCoins={allCoins}
								showPagination={true}
								showPageSize={true}
							/>
						</div>
					</>
				</SpotAccountTable>
			</>
		</DashboardLayout>
	);
};
export default Wallet;
