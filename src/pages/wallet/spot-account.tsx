import { BnbBtc, BtcBtc, DodgeBtc, EthBtc, LtcBtc } from "../../assets";
import { useState, useEffect } from "react";
import Header from "../../components/dashboard/wallet/header";
import Nav from "../../components/dashboard/wallet/nav";
import { NextPage } from "next";
import { WalletLayout } from "../../components";
import Button from "./../../components/button";
import { ButtonSize, ButtonState } from "./../../components/button/enum";
import Router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

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
import { fetchWalletAssetsBalanceAsync } from "../../redux/actions/wallet.action";
import SpotAccountTable from "components/table/SpotAccountTable";

const WalletSpotAccount: NextPage = () => {
	const dispatch = useDispatch();
	const { assets } = useSelector((state: RootState) => state.wallet);
	const { pathname } = useRouter();
	const links = [
		{ title: "Spot Account", uri: "/wallet/spot-account" },
		{ title: "Transaction history", uri: "/wallet/transaction-history" },
	];
	const options = [{ title: "Spot Account", uri: "/wallet/spot-account" }];
	const [columns, setColumns] = useState<ITableColumn[]>([]);
	const [searchKey, setSearchKey] = useState<any>("");

	useEffect(() => {
		setColumns(spotAccountTableColumns);
	}, []);
	useEffect(() => {
		dispatch(fetchWalletAssetsBalanceAsync());
		//eslint-disable-next-line
	}, []);

	const filterBySearch = (query: string) => {
		setSearchKey(query);
	};

	let filteredTableData = assets;
	if (searchKey) {
		filteredTableData = assets?.filter((data: any) =>
			data.asset.toLowerCase().includes(searchKey.toLocaleLowerCase())
		);
	}

	const handleBuy = (row: ISpotAccountTableData): void => {
		Router.push("../buy-crypto");
	};

	const handleDeposit = (row?: ISpotAccountTableData): void => {
		dispatch(
			showModal(ModalTypesEnum.DEPOSIT, {
				cryptoDeposit: () => {
					dispatch(hideModal());
					return Router.push("/deposits");
				},
				fiatDeposit: () => {
					dispatch(hideModal());
					return Router.push("/deposits");
				},
			})
		);
	};

	const handleWithdraw = (row?: ISpotAccountTableData): void => {
		Router.push("../withdrawals");
	};

	const handleTrade = (row: ISpotAccountTableData): void => {};

	const handleTransfer = (row?: ISpotAccountTableData): void => {
		dispatch(showModal(ModalTypesEnum.TRANSFER_CRYPTO));
	};

	const handleConvert = (row: ISpotAccountTableData): void => {
		Router.push("../crypto-swap");
	};

	const dataSource: ITableData[] =
		filteredTableData && filteredTableData.length > 0
			? filteredTableData.map((row: any) => {
					return {
						key: row.asset,
						coin: (
							<div className="flex items-center">
								<div className="flex items-center w-10 h-10 coins">
									{row.asset === CoinEnum.DOGE ? (
										<DodgeBtc />
									) : CoinEnum.LTC ? (
										<LtcBtc />
									) : CoinEnum.BNB ? (
										<BnbBtc />
									) : CoinEnum.BTC ? (
										<BtcBtc />
									) : CoinEnum.ETH ? (
										<EthBtc />
									) : (
										""
									)}
								</div>

								<div className="ml-1">
									<div className={DataState.DEFAULT}>{row.asset}</div>
									<div className={"text-gray-700 text-labels"}>{row.asset}</div>
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
						option: (
							<div className="flex items-center justify-center">
								<button
									data-testid="rg-option-button"
									onClick={() => handleBuy(row)}
									className={`bg-transparent rounded text-primary-400 font-normal text-x-small sm:text-sm-regular my-1 py-0.5 px-2.5`}
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
		<WalletLayout
			title={"Rocket Global Spot Account"}
			keywords={"Wallet, Spot account, Rocket"}
			description={""}
			links={links}
		>
			<>
				<div className={"w-full lg:flex md:grid"}>
					<Nav links={links} />
					<Header
						pathname={pathname}
						options={options}
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
							<Table
								columns={columns}
								dataSource={dataSource}
								showPagination={true}
								showPageSize={true}
							/>
						</div>
						<div className={"w-full md:hidden"}>
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
								fetchCoinName={() => {}}
								fetchCoinImage={() => {}}
								allCoins={[]}
							/>
						</div>
					</>
				</SpotAccountTable>
			</>
		</WalletLayout>
	);
};
export default WalletSpotAccount;
