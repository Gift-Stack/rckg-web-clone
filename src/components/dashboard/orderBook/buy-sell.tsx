import React, { FC, useEffect } from "react";
import { BuySellRecords } from "./model";
import Item from "./item";
import { withProvider } from "../../../hoc/withProvider";
import CustomScrollBar from "components/shared/CustomScrollBar";
import { ArrowUp } from "assets";
import SkeletonLoader from "components/skeleton";
import { useTradeContext } from "context/trade.context";

const OrderBook: FC<BuySellRecords> = ({
	records,
	show,
	quoteCoin,
	baseCoin,
}) => {
	const { loading, onPageLoad } = useTradeContext();
	return (
		<>
			{show && (
				<div
					data-testid="rg-OrderBookBuySell"
					className={"orderBook__tab px-3 py-5 rounded bg-lightGrey"}
				>
					<div
						className={
							"flex flex-row items-center text-x-small text-neutral-400 mb-3.5"
						}
					>
						<p className={"w-1/3 px-1"}>Price ({quoteCoin?.toUpperCase()})</p>
						<p className={"w-1/3 px-1 text-right"}>
							Amount ({baseCoin?.toUpperCase()})
						</p>
						<p className={"w-1/3 px-1 text-right"}>Total</p>
					</div>
					<CustomScrollBar height={600}>
						<>
							{loading || onPageLoad ? (
								<SkeletonLoader />
							) : (
								<>
									{records.map(
										(record: any, index) =>
											record.type === "sell" && (
												<Item key={index} data={record} />
											)
									)}
									<div
										className={
											"flex my-4 flex-row text-small font-medium text-neutral-400"
										}
									>
										<p className={`flex items-center pr-2 text-highlightgreen`}>
											{records[0]?.price}
											<ArrowUp className={""} />
										</p>
										<p className={"pr-2 text-right"}>{records[0]?.price}</p>
									</div>
									{records.map(
										(record: any, index) =>
											record.type === "buy" && (
												<Item key={index} data={record} />
											)
									)}
								</>
							)}
						</>
					</CustomScrollBar>
				</div>
			)}
		</>
	);
};

export default withProvider(OrderBook);
