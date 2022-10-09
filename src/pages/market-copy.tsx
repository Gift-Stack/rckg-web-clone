import { BnbBtc, BtcBtc, DodgeBtc, EthBtc, LtcBtc } from "assets";
import Footer from "components/footer";
import { footerRowsData } from "components/footer/data";
import { MarketLayout } from "components/layout/MarketLayout";
import MarketCard from "components/market-card";
import { marketData } from "components/market-card/data";
import Table from "components/table";
import { DataState } from "components/table/enum";
import MarketTable from "components/table/MarketTable";
import {
	marketTableColumns,
	marketTableFilters,
	marketTableOptions,
} from "components/table/MarketTable/data";
import MobileMarketTable from "components/table/MarketTable/MobileMarketTable";
import { IMarketTableData } from "components/table/MarketTable/model";
import {
	ITableColumn,
	ITableData,
	ITableFilter,
	ITableOption,
} from "components/table/model";

import { NextPage } from "next";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { suspend } from "redux/actions/suspense.action";
import { RootState } from "redux/store";
import { io } from "socket.io-client";
import { CoinPairEnum, FlowEnum } from "types/enum";

const Market: NextPage = () => {
	const [tableFilters, setTableFilters] = useState<ITableFilter[]>([]);
	const [tableOptions, setTableOptions] = useState<ITableOption[]>([]);
	const [columns, setColumns] = useState<ITableColumn[]>([]);

	useEffect(() => {
		setTableFilters(marketTableFilters);
		setTableOptions(marketTableOptions);
		setColumns(marketTableColumns);
	}, []);

	const filterTableFilters = (value: string) => {
		const tableFilters_ = tableFilters.map((filter) => {
			return {
				name: filter.name,
				isActive: filter.name === value ? true : false,
			};
		});
		setTableFilters(tableFilters_);
	};

	const filterTableOptions = (value: string) => {
		const tableOptions_ = tableOptions.map((option) => {
			return {
				name: option.name,
				isActive: option.name === value ? true : false,
			};
		});
		setTableOptions(tableOptions_);
	};

	const filterBySearch = (value: string) => {
		return value;
	};

	const handleTrade = (row: IMarketTableData): void => {
		return;
	};

	const [socketData, setSocketData] = useState<ITableData[]>([]);

	const commaFormatter = (num: any) => {
		const obj = new Intl.NumberFormat("en-US");
		const output = obj.format(Number(num));
		return `$${Number(output).toFixed(2)}`;
	};
	const dataSource: ITableData[] = [];
	// const dataSource: ITableData[] =
	// 	socketData && socketData.length > 0
	// 		? socketData.map((row: any, idx) => {
	// 				return {
	// 					key: idx,
	// 					market: (
	// 						<div className="flex items-center">
	// 							<div className="flex items-center w-10 h-10 coins">
	// 								{row.coinPair === CoinPairEnum.DOGE_BTC ? (
	// 									<DodgeBtc />
	// 								) : CoinPairEnum.LTC_BTC ? (
	// 									<LtcBtc />
	// 								) : CoinPairEnum.BNB_BTC ? (
	// 									<BnbBtc />
	// 								) : CoinPairEnum.BTC_BTC ? (
	// 									<BtcBtc />
	// 								) : (
	// 									<EthBtc />
	// 								)}
	// 							</div>

	// 							<div className="ml-1">
	// 								<div className={DataState.DEFAULT}>{row.symbol}</div>
	// 							</div>
	// 						</div>
	// 					),
	// 					price: (
	// 						<div
	// 							className={
	// 								row.price.flow === FlowEnum.UP
	// 									? DataState.SUCCESS
	// 									: DataState.DANGER
	// 							}
	// 						>
	// 							{Number(row.price).toFixed(5)}
	// 						</div>
	// 					),
	// 					change: (
	// 						<div
	// 							className={
	// 								row.priceChangePercentage > 0 ? "text-green" : "text-red-500"
	// 							}
	// 						>
	// 							{row.priceChangePercentage > 0
	// 								? "+" + Number(row.priceChangePercentage.toFixed(2)) + "%"
	// 								: Number(row.priceChangePercentage.toFixed(2)) + "%"}
	// 						</div>
	// 					),
	// 					high_low: (
	// 						<div className={DataState.DEFAULT}>
	// 							{Number(row?.highPrice).toFixed(5)} /{" "}
	// 							{Number(row?.lowPrice).toFixed(5)}
	// 						</div>
	// 					),
	// 					volume: Number(row?.baseVolumn / 1000).toFixed(2) + "M",
	// 					market_cap: Number(row.marketCap).toFixed(2) + "M",

	// 					option: (
	// 						<div className="flex items-center justify-center">
	// 							<button
	// 								onClick={() => handleTrade(row)}
	// 								className={`bg-neutral-400 rounded text-white font-normal text-x-small sm:text-sm-regular my-1 py-0.5 px-2.5`}
	// 							>
	// 								Trade
	// 							</button>
	// 						</div>
	// 					),
	// 				};
	// 		  })
	// 		: [];

	const socket = io("https://rckg-exchange-staging.rocket.com.ng/", {
		path: "/miniTicker",
	});
	// const socket = io(`https://tradingudf.herokuapp.com`, {
	// 	path: "/miniTicker",
	// });
	const dispatch = useDispatch();
	useLayoutEffect(() => {
		dispatch(suspend(true));
		//eslint-disable-next-line
	}, []);
	useEffect(() => {
		if (socketData.length && isSuspended) {
			dispatch(suspend(false));
		}
		//eslint-disable-next-line
	}, [socketData.length]);

	const appState = useSelector((state: RootState) => state);
	const isSuspended = appState.suspense;
	useEffect(() => {
		socket.on("message", (data) => {
			setSocketData(data);
		});
	}, []);

	return (
		<MarketLayout
			title={"Rocket Global Market"}
			keywords={"Login, Rocket, Market, Trade, Top Gainer, Top Looser"}
			description={""}
		>
			<>
				{/* <small className=" break-words whitespace-pre-wrap">
					{JSON.stringify(socketData[0])}
				</small> */}
				{/* <h1 className=" break-words whitespace-pre-wrap text-l-headline font-extrabold">
					{JSON.stringify(socketData.length)}
				</h1> */}
				<div className={"w-full market"}>
					<div className={"w-full py-10 px-8 lg:px-20"}>
						<MarketCard data={marketData} />
						<MarketTable
							tableFilters={tableFilters}
							tableOptions={tableOptions}
							cssClass="p-5 rounded bg-white h-full"
							title="Market"
							handleFilter={(value) => filterTableFilters(value)}
							handleOption={(value) => filterTableOptions(value)}
							handleSearch={(value) => filterBySearch(value)}
						>
							<div className={"w-full"}>
								<div className={"w-full hidden sm:block"}>
									<Table
										columns={columns}
										dataSource={dataSource}
										showPagination={true}
										showPageSize={true}
									/>
								</div>
								<div className={"w-full md:hidden"}>
									<MobileMarketTable
										trade={(value: IMarketTableData) => handleTrade(value)}
										data={socketData?.map((row: any, idx) => ({
											id: idx,
											coinPair: row.symbol,
											price: row.price,
											change: (
												<div
													className={
														row.priceChangePercentage > 0
															? "text-green"
															: "text-red-500"
													}
												>
													{row.priceChangePercentage > 0
														? "+" +
														  Number(row.priceChangePercentage.toFixed(2)) +
														  "%"
														: Number(row.priceChangePercentage.toFixed(2)) +
														  "%"}
												</div>
											),
											highLow: {
												high: row.highPrice,
												low: row.lowPrice,
											},
											volume: row.baseVolumn,
											marketCap: row.marketCap,
										}))}
									/>
								</div>
							</div>
						</MarketTable>
					</div>
					<Footer rows={footerRowsData} />
				</div>
			</>
		</MarketLayout>
	);
};
export default Market;
