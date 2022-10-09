import { BnbBtc, BtcBtc, DodgeBtc, EthBtc, LtcBtc } from "../../assets";
import { useState, useEffect } from "react";
import Header from "../../components/dashboard/wallet/header";
import Nav from "../../components/dashboard/wallet/nav";
import { NextPage } from "next";
import { WalletLayout } from "../../components";
import Button from "./../../components/button";
import { ButtonSize, ButtonState } from "./../../components/button/enum";
import Router, { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { showModal } from "../../redux/actions";
import { ModalTypesEnum } from "../../components/modals/modalTypes";

import { DataState } from "../../components/table/enum";
import Table from "../../components/table";
import { IP2PTableData } from "../../components/table/P2PTable/model";
import {
	p2pTableColumns,
	p2pTableData,
} from "../../components/table/P2PTable/data";
import { ITableColumn, ITableData } from "../../components/table/model";
import { CoinEnum, FlowEnum } from "../../types/enum";

import MobileP2PTable from "../../components/table/P2PTable/MobileP2PTable";
import SearchFilter from "../../components/table/SearchFilter";

const WalletP2P: NextPage = () => {
	const { pathname } = useRouter();
	const dispatch = useDispatch();
	const links = [
		{ title: "Overview", uri: "/wallet/overview" },
		{ title: "Spot Account", uri: "/wallet/spot-account" },
		{ title: "P2P", uri: "/wallet/p2p" },
		{ title: "Transaction history", uri: "/wallet/transaction-history" },
	];

	const options = [
		{ title: "Overview", uri: "/wallet/overview" },
		{ title: "Spot Account", uri: "/wallet/spot-account" },
		{ title: "P2P", uri: "/wallet/p2p" },
	];

	const [columns, setColumns] = useState<ITableColumn[]>([]);
	const [searchKey, setSearchKey] = useState<any>("");

	useEffect(() => {
		setColumns(p2pTableColumns);
	}, []);

	const filterBySearch = (query: string) => {
		setSearchKey(query);
	};

	let filteredTableData = p2pTableData;
	if (searchKey) {
		filteredTableData = p2pTableData?.filter(
			(data: any) =>
				data.coin.value.toLowerCase().includes(searchKey.toLocaleLowerCase()) ||
				data.coin.title.toLowerCase().includes(searchKey.toLocaleLowerCase())
		);
	}

	const handleBuy = (row: IP2PTableData): void => {};

	const handleSell = (row: IP2PTableData): void => {};

	const handleTransfer = (row: IP2PTableData): void => {
		dispatch(showModal(ModalTypesEnum.TRANSFER_CRYPTO));
	};

	const handleSend = (row: IP2PTableData): void => {};

	const dataSource: ITableData[] =
		filteredTableData && filteredTableData.length > 0
			? filteredTableData.map((row) => {
					return {
						key: row.id,
						coin: (
							<div className="flex items-center">
								<div className="flex items-center w-10 h-10 coins">
									{row.coin.value === CoinEnum.DOGE ? (
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
									<div className={DataState.DEFAULT}>{row.coin.value}</div>
									<div className={"text-gray-700 text-labels"}>
										{row.coin.title}
									</div>
								</div>
							</div>
						),
						total: (
							<div
								className={
									row.total.flow == null
										? "text-neutral-400"
										: row.total.flow === FlowEnum.UP
										? DataState.SUCCESS
										: DataState.DANGER
								}
							>
								$ {row.total.amount}
							</div>
						),
						avaliable: (
							<div
								className={
									row.avaliable.flow == null
										? "text-neutral-400"
										: row.avaliable.flow === FlowEnum.UP
										? DataState.SUCCESS
										: DataState.DANGER
								}
							>
								$ {row.avaliable.amount}
							</div>
						),
						frozen: (
							<div
								className={
									row.frozen.flow == null
										? "text-neutral-400"
										: row.frozen.flow === FlowEnum.UP
										? DataState.SUCCESS
										: DataState.DANGER
								}
							>
								{row.frozen.amount}
							</div>
						),
						btcValue: (
							<div
								className={
									row.btcValue.flow == null
										? "text-neutral-400"
										: row.btcValue.flow === FlowEnum.UP
										? DataState.SUCCESS
										: DataState.DANGER
								}
							>
								{row.btcValue.amount}
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
									onClick={() => handleSell(row)}
									className={`bg-transparent rounded text-primary-400 font-normal text-x-small sm:text-sm-regular my-1 py-0.5 px-2.5`}
								>
									Sell
								</button>
								<button
									data-testid="rg-option-button"
									onClick={() => handleTransfer(row)}
									className={`bg-transparent rounded text-primary-400 font-normal text-x-small sm:text-sm-regular my-1 py-0.5 px-2.5`}
								>
									Transfer
								</button>
								<button
									data-testid="rg-option-button"
									onClick={() => handleSend(row)}
									className={`bg-transparent rounded text-primary-400 font-normal text-x-small sm:text-sm-regular my-1 py-0.5 px-2.5`}
								>
									Send
								</button>
							</div>
						),
					};
			  })
			: [];

	return (
		<WalletLayout
			title={"Rocket Global P2P account"}
			keywords={"Wallet, Rocket, P2p account"}
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
								value="P2P Trading"
								onClick={() => {}}
							/>
						}
						button2={
							<Button
								variant={ButtonState.OUTLINEALT}
								size={ButtonSize.sm}
								value="Send"
								onClick={() => {}}
							/>
						}
						button3={
							<Button
								variant={ButtonState.OUTLINEALT}
								size={ButtonSize.sm}
								value="Receive"
								onClick={() => {}}
							/>
						}
					/>
				</div>
				<div className={"w-full mt-12"}>
					<div className="text-center sm:text-left sm:justify-end justify-center flex-wrap flex">
						<SearchFilter
							placeholder={"Search for Cryptocurrency"}
							handleSearch={(value: string) => filterBySearch(value)}
						/>
					</div>
					<div className={"w-full hidden sm:block bg-white mt-3 pt-3"}>
						<Table
							columns={columns}
							dataSource={dataSource}
							showPagination={true}
							showPageSize={true}
						/>
					</div>
					<div className={"w-full md:hidden"}>
						<MobileP2PTable
							buy={(value: IP2PTableData) => handleBuy(value)}
							sell={(value: IP2PTableData) => handleSell(value)}
							transfer={(value: IP2PTableData) => handleTransfer(value)}
							send={(value: IP2PTableData) => handleSend(value)}
							data={p2pTableData}
						/>
					</div>
				</div>
			</>
		</WalletLayout>
	);
};
export default WalletP2P;
