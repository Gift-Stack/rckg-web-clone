import { BnbBtc, BtcBtc, DodgeBtc, EthBtc, LtcBtc } from "assets";
import Footer from "components/footer";
import { footerRowsData } from "components/footer/data";
import { MarketLayout } from "components/layout/MarketLayout";
import MarketCard from "components/market-card";
import { marketData } from "components/market-card/data";
import SkeletonLoader from "components/skeleton";
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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchMarketDataAndHighlightsAsync,
	fetchMarketDataAsync,
	fetchPaginatedMarketDataAsync,
} from "redux/actions/market.action";
import { suspend } from "redux/actions/suspense.action";
import { RootState } from "redux/store";
import { io } from "socket.io-client";
import { CoinPairEnum, FlowEnum } from "types/enum";
import { dataArrayToObject } from "utils/marketArrayToObject";
import { handleMarketChange } from "utils/marketChangeHandler";
import { useIsomorphicLayoutEffect } from "../hooks/useIsomorphicLayoutEffect";

const Market: NextPage = () => {
	const [tableFilters, setTableFilters] = useState<ITableFilter[]>([]);
	const [tableOptions, setTableOptions] = useState<ITableOption[]>([]);
	const [activeTableOption, setActiveTableOption] = useState<ITableOption>({
		name: "USDT",
		isActive: true,
	});
	const [columns, setColumns] = useState<ITableColumn[]>([]);
	const [_marketData, _setMarketData] = useState<any>([]);
	const [highlight, setHighlight] = useState<any>([]);
	const [filteredMarketData, setFilteredMarketData] = useState<any>([]);
	const [mobileFilteredMarketData, setMobileFilteredMarketData] = useState<any>(
		[]
	);

	const route = useRouter();
	useEffect(() => {
		setTableFilters(marketTableFilters);
		setTableOptions(marketTableOptions);
		setColumns(marketTableColumns);
		setActiveTableOption(marketTableOptions[0]);
		// eslint-disable-next-line
	}, []);

	// const dataSource: ITableData[] = [];
	const dataSource: ITableData[] =
		_marketData.length > 0
			? _marketData?.map((row: any, idx: any) => {
					return {
						key: idx,
						pair: row?.description.split("/")[1],
						coinPair: row?.description,
						market: (
							<div className="flex items-center">
								<div className="flex items-center w-10 h-10 coins">
									{row?.["image"] ? (
										// eslint-disable-next-line @next/next/no-img-element
										<img
											src={row?.["image"]}
											alt=""
											className="rounded-full h-6 w-6"
											// loading="lazy"
										/>
									) : row?.description === CoinPairEnum.DOGE_BTC ? (
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
									<div className={DataState.DEFAULT}>{row?.symbol}</div>
								</div>
							</div>
						),
						price: (
							<div
								className={
									row?.price === FlowEnum.UP
										? DataState.SUCCESS
										: DataState.DANGER
								}
							>
								{Number(row?.price).toFixed(5)}
							</div>
						),
						change: (
							<div
								className={
									row?.priceChangePercntage > 0 ? "text-green" : "text-red-500"
								}
							>
								{row?.priceChangePercntage > 0
									? "+" + Number(row?.priceChangePercntage).toFixed(2) + "%"
									: Number(row?.priceChangePercntage).toFixed(2) + "%"}
							</div>
						),
						high_low: (
							<div className={DataState.DEFAULT}>
								{Number(row?.highPrice).toFixed(4)} /{" "}
								{Number(row?.lowPrice).toFixed(4)}
							</div>
						),
						volume: Number(row?.baseVolumn / 1000).toFixed(2) + "M",
						market_cap: Number(row?.marketCap).toFixed(2) + "M",

						option: (
							<div className="flex items-center justify-center">
								<button
									onClick={() => handleTrade(row)}
									className={`bg-neutral-400 rounded text-white font-normal text-x-small sm:text-sm-regular my-1 py-0.5 px-2.5 cursor-pointer`}
								>
									Trade
								</button>
							</div>
						),
					};
			  })
			: [];

	const mobileDataSource =
		_marketData.length > 0
			? _marketData.map((row: any, idx: number) => {
					return {
						trade: () => handleTrade(row),
						id: idx,
						coinPair: row?.description,
						price: row?.price,
						change: (
							<div
								className={
									Number(row?.priceChangePercntage) > 0
										? "text-green"
										: "text-red-500"
								}
							>
								{Number(row?.priceChangePercntage) > 0
									? "+" + Number(row?.priceChangePercntage)?.toFixed(2) + "%"
									: Number(row?.priceChangePercntage)?.toFixed(2) + "%"}
							</div>
						),
						highLow: {
							high: row?.highPrice,
							low: row?.lowPrice,
						},
						volume: row?.baseVolumn,
						marketCap: row?.marketCap,
					};
			  })
			: [];

	useEffect(() => {
		const val = dataSource.filter((data: any) => {
			if (activeTableOption?.name === "ALTS") {
				return (
					data?.pair !== "BTC" && data?.pair !== "BNB" && data?.pair !== "ETH"
				);
			} else {
				return data?.pair === activeTableOption?.name;
			}
		});

		const mobileVal = mobileDataSource.filter((data: any) => {
			if (activeTableOption?.name === "ALTS") {
				return (
					data?.coinPair?.split("/")[1] !== "BTC" &&
					data?.coinPair?.split("/")[1] !== "BNB" &&
					data?.coinPair?.split("/")[1] !== "ETH"
				);
			} else {
				return data?.coinPair?.split("/")[1] === activeTableOption?.name;
			}
		});
		setMobileFilteredMarketData(mobileVal);
		setFilteredMarketData(val);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTableOption, _marketData]);

	const handleSearch = (text: string) => {
		const val = dataSource.filter((data: any, idx) => {
			return data.coinPair.toLowerCase().includes(text.toLowerCase());
		});
		const mobileVal = mobileDataSource.filter((data: any) =>
			data.coinPair?.toLowerCase().includes(text.toLowerCase())
		);
		setMobileFilteredMarketData(mobileVal);
		setFilteredMarketData(val);
	};

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
		const _isActive = tableOptions_.filter(
			(option) => option.isActive === true
		)[0];
		setActiveTableOption(_isActive);
		setTableOptions(tableOptions_);
	};

	const handleTrade = (row: any): void => {
		const pair = row.description?.replace("/", "_");
		route.push(`/trade/${pair}`);
		return;
	};

	const [socketData, setSocketData] = useState<any>([]);

	const commaFormatter = (num: any) => {
		const obj = new Intl.NumberFormat("en-US");
		const output = obj.format(Number(num));
		return `$${Number(output).toFixed(2)}`;
	};
	const exchangeBaseDomain = process.env
		.NEXT_PUBLIC_EXCHANGE_BASE_DOMAIN as string;

	// miniticker - message
	// event - miniticker
	// listen - miniticker@miniticker
	// socket.emit("miniticker", "miniticker");

	const dispatch = useDispatch();

	// useIsomorphicLayoutEffect(() => {
	// 	dispatch(suspend(true));
	// 	//eslint-disable-next-line
	// }, []);

	// useEffect(() => {
	// 	if (_marketData && isSuspended) {
	// 		dispatch(suspend(false));
	// 	}
	// 	//eslint-disable-next-line
	// }, [socketData.values.length]);

	const appState = useSelector((state: RootState) => state);
	const isSuspended = appState.suspense;

	useEffect(() => {
		// const socket = io(exchangeBaseDomain);
		// const socket = io("https://rckg-exchange-dev.rocket.com.ng");

		const formatHighlight = (data: any) => {
			setHighlight({
				topGainer: {
					coinPair: data.topGainer.d,
					coinPairChange: {
						rate: data.topGainer.pc,
						flow: data.topGainer.pc > 0 ? FlowEnum.UP : FlowEnum.DOWN,
					},
					price: {
						amount: data.topGainer.p,
						rate: data.topGainer.bp,
						flow: data.topGainer.bp > 0 ? FlowEnum.UP : FlowEnum.DOWN,
					},
					change: {
						rate: data.topGainer.bp,
						flow: data.topGainer.bp > 0 ? FlowEnum.UP : FlowEnum.DOWN,
					},
					highLow: {
						high: data.topGainer.hp,
						low: data.topGainer.lp,
					},
					volume: data.topGainer.bv,
					marketCap: data.topGainer.mc,
					img: data.topGainer.img,
				},
				topLoser: {
					coinPair: data.topLoser.d,
					coinPairChange: {
						rate: data.topLoser.pc,
						flow: data.topLoser.pc > 0 ? FlowEnum.UP : FlowEnum.DOWN,
					},
					price: {
						amount: data.topLoser.p,
						rate: data.topLoser.bp,
						flow: data.topLoser.bp > 0 ? FlowEnum.UP : FlowEnum.DOWN,
					},
					change: {
						rate: data.topLoser.bp,
						flow: data.topLoser.bp > 0 ? FlowEnum.UP : FlowEnum.DOWN,
					},
					highLow: {
						high: data.topLoser.hp,
						low: data.topLoser.lp,
					},
					volume: data.topLoser.bv,
					marketCap: data.topLoser.mc,
					img: data.topLoser.img,
				},
				topVolume: {
					coinPair: data.topVolume.d,
					coinPairChange: {
						rate: data.topVolume.pc,
						flow: data.topVolume.pc > 0 ? FlowEnum.UP : FlowEnum.DOWN,
					},
					price: {
						amount: data.topVolume.p,
						rate: data.topVolume.bp,
						flow: data.topVolume.bp > 0 ? FlowEnum.UP : FlowEnum.DOWN,
					},
					change: {
						rate: data.topVolume.bp,
						flow: data.topVolume.bp > 0 ? FlowEnum.UP : FlowEnum.DOWN,
					},
					highLow: {
						high: data.topVolume.hp,
						low: data.topVolume.lp,
					},
					volume: data.topVolume.bv,
					marketCap: data.topVolume.mc,
					img: data.topVolume.img,
				},
				// highlight: {
				// 	coinPair: CoinPairEnum.BNB_BTC,
				// 	coinPairChange: {
				// 		rate: 1,
				// 		flow: FlowEnum.UP,
				// 	},
				// 	price: {
				// 		amount: 0.18353,
				// 		rate: 10,
				// 		flow: FlowEnum.UP,
				// 	},
				// 	change: {
				// 		rate: 9.6,
				// 		flow: FlowEnum.UP,
				// 	},
				// 	highLow: {
				// 		high: 1.0233,
				// 		low: 1.0007,
				// 	},
				// 	volume: 37712573.95,
				// 	marketCap: 37712573.95,
				// },
			});
		};

		// socket.on("miniticker@miniticker", (data: any) => {

		// 	const data_ = data.map((row: any) => {
		// 		return {
		// 			...row,
		// 			price: Number(row.p),
		// 			priceChangePercntage: Number(row.pc),
		// 			baseVolumn: Number(row.bv),
		// 			marketCap: Number(row.mc),
		// 			highPrice: Number(row.hp),
		// 			lowPrice: Number(row.lp),
		// 			description: row.d,
		// 			symbol: row.s,
		// 			image: row.img,
		// 		};
		// 	});
		// 	setSocketData(data_);
		// });
		const formatMarketData = (data: any) => {
			_setMarketData(
				data.map((row: any) => {
					return {
						// ...row,
						price: Number(row.p),
						priceChangePercntage: Number(row.pc),
						baseVolumn: Number(row.bv),
						marketCap: Number(row.mc),
						highPrice: Number(row.hp),
						lowPrice: Number(row.lp),
						description: row.d,
						symbol: row.s,
						image: row.img,
					};
				})
			);
		};
		dispatch(
			fetchMarketDataAndHighlightsAsync(async (data: any) => {
				formatMarketData(data.data.tickers);
				formatHighlight(data.data.highlights);
			})
		);

		// dispatch(
		// 	fetchMarketDataAsync(async (data: any) => {
		// 		// _setMarketData(dataArrayToObject(data));
		// 		_setMarketData(
		// 			data.map((row: any) => {
		// 				return {
		// 					// ...row,
		// 					price: Number(row.p),
		// 					priceChangePercntage: Number(row.pc),
		// 					baseVolumn: Number(row.bv),
		// 					marketCap: Number(row.mc),
		// 					highPrice: Number(row.hp),
		// 					lowPrice: Number(row.lp),
		// 					description: row.d,
		// 					symbol: row.s,
		// 					image: row.img,
		// 				};
		// 			})
		// 		);
		// 	})
		// );
		// return () => {
		// 	socket.disconnect();
		// };
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const prevMarket = _marketData;
		const prevSocketData = socketData.map((row: any) => {
			return {
				// ...row,
				price: Number(row.p),
				priceChangePercntage: Number(row.pc),
				baseVolumn: Number(row.bv),
				marketCap: Number(row.mc),
				highPrice: Number(row.hp),
				lowPrice: Number(row.lp),
				description: row.d,
				symbol: row.s,
				image: row.img,
			};
		});

		_setMarketData(handleMarketChange(prevMarket, prevSocketData));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socketData]);

	return (
		<MarketLayout
			title={"Rocket Global Market"}
			keywords={"Login, Rocket, Market, Trade, Top Gainer, Top Looser"}
			description={""}
		>
			<div className={"w-full market"}>
				<div className={"w-full py-10 px-8 lg:px-20"}>
					<MarketCard data={highlight} />
					<MarketTable
						tableFilters={tableFilters}
						tableOptions={tableOptions}
						cssClass="p-5 rounded bg-white h-full"
						title="Market"
						handleFilter={(value) => filterTableFilters(value)}
						handleOption={(value) => filterTableOptions(value)}
						handleSearch={handleSearch}
					>
						<div className={"w-full"}>
							<div className={"w-full hidden sm:block"}>
								{!dataSource.length && <SkeletonLoader />}
								<Table
									columns={columns}
									dataSource={filteredMarketData}
									showPagination={true}
									showPageSize={true}
									activeTableOption={activeTableOption}
								/>
							</div>
							<div className={"w-full md:hidden"}>
								{!dataSource.length && <SkeletonLoader height={160} />}
								<MobileMarketTable
									activeTableOption={activeTableOption}
									columns={columns}
									showPagination={true}
									showPageSize={true}
									trade={(value: IMarketTableData) => handleTrade(value)}
									data={mobileFilteredMarketData}
								/>
							</div>
						</div>
					</MarketTable>
				</div>
				<Footer rows={footerRowsData} />
			</div>
		</MarketLayout>
	);
};
export default Market;
