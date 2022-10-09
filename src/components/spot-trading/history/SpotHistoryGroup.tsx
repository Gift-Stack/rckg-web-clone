import Button from "./../../../components/button";
import { ButtonSize } from "./../../../components/button/enum";
import TabSwitch from "./../../../components/switch/TabSwitch";
import { useRouter } from "next/router";
import React, { useState } from "react";
import FundHistory from "./FundHistory";
import OpenOrder from "./OpenOrder";
import OrderHistory from "./OrderHistory";
import TradeHistory from "./TradeHistory";
import { useTradeContext } from "context/trade.context";
import { useGlobalContext } from "context/global.context";

interface SpotHistoryGroupProps {
	isAuthenticated: boolean;
}

interface IOpenOrder {
	symbol: string;
	orderId: number;
	orderListId: number;
	clientOrderId: string;
	price: string;
	origQty: string;
	executedQty: string;
	cummulativeQuoteQty: string;
	status: "NEW" | "COMPLETED";
	timeInForce: "GTC";
	type: "LIMIT";
	side: "SELL" | "BUY";
	stopPrice: string;
	icebergQty: string;
	time: number;
	updateTime: number;
	isWorking: true;
	origQuoteOrderQty: string;
}

function SpotHistoryGroup({ isAuthenticated }: SpotHistoryGroupProps) {
	const {
		spotDetails: { quoteCoin, baseCoin },
		history,
		openOrderHistory,
		fundHistory,
	} = useTradeContext();

	const { setRedirectAfterLoginUri } = useGlobalContext();

	const [active, setActive] = useState("Open Order");

	const tabItems = [
		{ text: "Open Order", value: "Open Order" },
		{ text: "Order History", value: "Order History" },
		{ text: "Trade History", value: "Trade History" },
		{ text: "Fund", value: "Fund History" },
	];

	const router = useRouter();

	return (
		<div className="mt-8 w-full px-4">
			<TabSwitch
				handleSwitch={(_active: string) => setActive(_active)}
				switchItem={tabItems}
				active={active}
			/>
			{isAuthenticated ? (
				<div data-testid={"logged-in"} className="mt-6 ">
					{active.toLowerCase().includes("fund") && (
						<FundHistory fundHistories={fundHistory} />
					)}

					{active.toLowerCase().includes("open order") && (
						<OpenOrder
							openOrders={openOrderHistory?.map((o: any) => ({
								time: o?.time,
								symbol: o?.symbol,
								type: o?.type,
								side: o?.side,
								price: o?.price,
								amount: o.origQty,
								filled: o.isWorking ? "NO" : "YES",
								triggerConditions: `Mark Price >=${o?.price}`,
								total: 12,
								orderId: o.orderId,
							}))}
						/>
					)}
					{active.toLowerCase().includes("order history") && (
						<OrderHistory
							orderHistories={history
								.filter((h: any) => h.status === "FILLED")
								.map((h: any) => ({
									time: h?.createdOn,
									pair: h?.currencyPair,
									side: h?.sideType,
									executed: h.status === "FILLED" && true,
									price: h?.price,
									type: h?.orderType,
									average: h?.cummulativeQuoteQty,
									amount: h?.origQty,
									total: "200",
									fee: "0.0",
								}))}
						/>
					)}
					{active.toLowerCase().includes("trade history") && (
						<TradeHistory
							tradeHistories={history.map((h: any) => ({
								time: h?.createdOn,
								pair: h?.currencyPair,
								side: h?.sideType,
								executed: h.status === "FILLED" && true,
								price: h?.price,
								type: h?.orderType,
								average: h?.cummulativeQuoteQty,
								amount: h?.origQty,
								total: "200",
								fee: "0.0",
							}))}
						/>
					)}
				</div>
			) : (
				<div
					data-testid="not-logged-in"
					className="flex items-center justify-center flex-col mt-24"
				>
					<p className="text-sm-regular text-neutral-400 mb-3">
						Login to view this content
					</p>
					<Button
						value="Login"
						onClick={() => {
							setRedirectAfterLoginUri(
								`/trade/${
									quoteCoin && baseCoin
										? `${baseCoin}_${quoteCoin}`
										: "BTC_USDT"
								}`
							);

							router.push("/");
						}}
						size={ButtonSize.xs}
					/>
				</div>
			)}
		</div>
	);
}

export default SpotHistoryGroup;
