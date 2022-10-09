import { io } from "socket.io-client";
import SpotTrading from "components/spot-trading";
import SpotTradingAssets from "components/spot-trading/Assets";
import CoinPairSwitcher from "components/spot-trading/CoinPairSwitcher";
import dynamic from "next/dynamic";
import { ReactElement, useEffect, useState } from "react";
import OrderBook from "components/dashboard/orderBook";
import SpotHistoryGroup from "components/spot-trading/history/SpotHistoryGroup";
import Header from "components/dashboard/TopNav";
import TabSwitch from "components/switch/TabSwitch";
import { useRouter } from "next/router";
import { Meta } from "components";
import { demicalFormatter, formatToCurrency } from "./../../../constants";
import TradeContextProvider, { useTradeContext } from "context/trade.context";
import ReduxSuspense from "components/reduxSuspense";
import GlobalContextProvider, {
	useGlobalContext,
} from "context/global.context";
import SpotTradeDebugger from "components/spot-trading/SpotTradeDebugger";
import { useIsomorphicLayoutEffect } from "hooks/useIsomorphicLayoutEffect";

const TVChartContainer = dynamic<{}>(
	() =>
		import("../../../components/spot-trading/TVChartContainer").then(
			(mod) => mod.TVChartContainer
		),
	{ ssr: false }
);

const TV = (props: any) => <TVChartContainer {...props} />;

export default function TradeView() {
	const router = useRouter();
	const { symbol } = router.query;

	const [active, setActive] = useState("Spot");

	const parsedSymbol = symbol?.toString().split("_").join("");
	const [parsedPair, setParsedPair] = useState({
		baseCoin: "BTC",
		quoteCoin: "USDT",
	});

	const { authorized } = useGlobalContext();
	const {
		spotDetails,
		setSpotDetails,
		loading,
		setLoading,
		setOnPageLoad,
		onPageLoad,
	} = useTradeContext();

	const { baseCoin, quoteCoin } = parsedPair;

	useEffect(() => {
		const _coinPair = symbol?.toString().split("_") as string[];
		if (symbol && _coinPair.length) {
			setParsedPair({
				baseCoin: _coinPair[0],
				quoteCoin: _coinPair[1],
			});
		}
	}, [symbol, parsedSymbol]);

	const [showOrderBook, setShowOrderBook] = useState(true);

	const tabItems = [
		{ text: "Order Book", value: "Order Book" },
		{ text: "Spot", value: "Spot" },
	];

	const [orderBookRecord, setOrderBookRecord] = useState<any[]>([]);
	const [quotes, setQuotes] = useState({
		bestBidPrice: 0.0,
		priceChange: 0.0,
		highPrice: 0.0,
		lowPrice: 0.0,
		baseVolumn: 0.0,
		quoteVolumn: 0.0,
		priceChangePercentage: "+0.000%",
		price: 0.0,
		basePrecision: 0,
		quotePrecision: 0,
	});

	const exchangeBaseDomain = process.env
		.NEXT_PUBLIC_EXCHANGE_BASE_DOMAIN as string;

	useIsomorphicLayoutEffect(() => {
		if (!spotDetails.price && quotes.price) {
			setSpotDetails({
				baseCoin,
				quoteCoin,
				price: quotes.price,
				quotePrecision: quotes.quotePrecision,
				basePrecision: quotes.basePrecision,
			});
		}
	}, [quotes.price, parsedSymbol]);

	useEffect(() => {
		if (parsedPair.baseCoin !== spotDetails.baseCoin) {
			setSpotDetails({
				baseCoin,
				quoteCoin,
				price: quotes.price,
				quotePrecision: quotes.quotePrecision,
				basePrecision: quotes.basePrecision,
			});
		}
	}, [parsedSymbol, quotes.price]);

	useEffect(() => {
		if (orderBookRecord.length && loading) {
			setLoading(false);
		}
		//eslint-disable-next-line
	}, [orderBookRecord.length]);

	useEffect(() => {
		const parsedContextSymbol = spotDetails.baseCoin + spotDetails.quoteCoin;
		if (parsedSymbol !== parsedContextSymbol) {
			setLoading(true);
		} else {
			setLoading(false);
		}
		//eslint-disable-next-line
	}, [parsedSymbol, spotDetails.baseCoin, spotDetails.quoteCoin]);

	const connectionOptions = {
		transports: ["websocket"], //forces the transport to be only websocket. Server needs to be setup as well/
	};
	useEffect(() => {
		const socket = io(exchangeBaseDomain, connectionOptions);
		socket.emit("orderbook", parsedSymbol?.toLowerCase());
		socket.on(`orderbook@${parsedSymbol?.toLowerCase()}`, (data: any) => {
			if (data.quotes) {
				setQuotes({ ...data.quotes, price: data.quotes?.lastPrice });
			}
			if (data.symbol) {
				onPageLoad && setOnPageLoad(false);
				setOrderBookRecord(
					[
						...data.asks?.map((a: any, idx: any) => ({
							price: Number(a.price),
							amount: a.qty,
							total: demicalFormatter(Number(a.price) * Number(a.qty), 4),
							type: "sell",
							activity: 10,
						})),
						...data.bids?.map((a: any, idx: any) => ({
							price: Number(a.price),
							amount: a.qty,
							total: demicalFormatter(Number(a.price) * Number(a.qty), 4),
							type: "buy",
							activity: 10,
						})),
					].map((a, idx) => ({ ...a, id: idx + 1 }))
				);
			}
		});
		return () => {
			socket.disconnect();
		};
	}, [parsedSymbol]);

	const __coins: any = [
		{
			id: 1,
			totalTradeValue: quotes.bestBidPrice,
			coinPair: `${baseCoin}/${quoteCoin}`,
			tradeValues: [
				{
					id: 1,
					rate: "24h Change",
					value: quotes?.priceChange,
					valueChange: `${quotes?.priceChangePercentage}%`,
				},
				{
					id: 2,
					rate: "24h High",
					value: quotes?.highPrice,
				},
				{
					id: 3,
					rate: "24h Low",
					value: quotes?.lowPrice,
				},
				{
					id: 4,
					rate: `24h Volume(${baseCoin})`,
					value: quotes?.baseVolumn,
				},
				{
					id: 5,
					rate: `24h Volume(${quoteCoin})`,
					value: quotes?.quoteVolumn,
				},
			],
		},
	];

	return (
		<div>
			<Meta
				title={
					quotes.bestBidPrice
						? `${formatToCurrency(
								quotes.bestBidPrice,
								2
						  )} | ${parsedSymbol} | Rocket Global Spot`
						: `Rocket Global Spot`
				}
				keywords={`btc crypto coins tokens`}
				description={`Rocket global spot trading`}
			/>
			<Header />
			{/* <ReduxSuspense loading={loading} /> */}

			<div className={"sm:flex gap-2  mt-24 w-full lg:flex md:grid p-2"}>
				<div className="w-full">
					<div className="px-4 sm:px-0 sm:hidden mb-6">
						<CoinPairSwitcher coins={__coins} />
					</div>
					<div className="hidden sm:block">
						<CoinPairSwitcher coins={__coins} />
					</div>
					{/* the spot trade debugger is to help with the visualization of
					global and trade context this will help in debugging the context state */}
					{/* <SpotTradeDebugger quotes={quotes} enable={true} /> */}
					<div className="my-3">
						{parsedSymbol && <TV symbol={parsedSymbol} />}
					</div>
					<div className="hidden sm:block">
						<SpotHistoryGroup isAuthenticated={authorized} />
					</div>
				</div>
				{showOrderBook && (
					<div
						className={
							"hidden sm:block lg:w-1/5 flex-shrink-0 spot__trading mb-2 sm:mb-0"
						}
					>
						<OrderBook
							records={orderBookRecord}
							onClose={() => setShowOrderBook(false)}
							baseCoin={baseCoin}
							quoteCoin={quoteCoin}
						/>
					</div>
				)}
				<div
					className={
						"hidden sm:block lg:w-1/5 flex-shrink-0 spot__trading mb-2 sm:mb-0"
					}
				>
					<SpotTrading />
					<div className={"mt-2"}>
						<SpotTradingAssets />
					</div>
				</div>
			</div>
			<div className={"gap-2 block md:hidden w-full p-2"}>
				<TabSwitch
					handleSwitch={(_active: string) => setActive(_active)}
					switchItem={tabItems}
					active={active}
					style={{
						justifyContent: "start",
						marginTop: "15px",
						marginBottom: "15px",
						marginLeft: "16px",
						marginRight: "16px",
					}}
				/>
				<div>
					{active.toLowerCase().includes("order book") && (
						<OrderBook
							records={orderBookRecord}
							onClose={() => alert("Handle close")}
							baseCoin={baseCoin}
							quoteCoin={quoteCoin}
						/>
					)}
					{active.toLowerCase().includes("spot") && (
						<div
							className={
								"lg:w-1/5 px-4 sm:px-0 flex-shrink-0 spot__trading mb-2 sm:mb-0"
							}
						>
							<SpotTrading />
							<div className={"mt-2"}>
								<SpotTradingAssets />
							</div>
						</div>
					)}
				</div>
				<SpotHistoryGroup isAuthenticated={authorized} />
			</div>
		</div>
	);
}

TradeView.getLayout = function getLayout(page: ReactElement) {
	return (
		<GlobalContextProvider>
			<TradeContextProvider>{page}</TradeContextProvider>
		</GlobalContextProvider>
	);
};
