import React, { FC, useState } from "react";
import { RecordProps } from "./model";
import Buy from "./buy";
import Sell from "./sell";
import BuySell from "./buy-sell";
import {
	Close14,
	OrderBookAll,
	OrderBookBuy,
	OrderBookSell,
} from "../../../assets/svg";
import MobileOrderBook from "./MobileOrderBook";
import { withProvider } from "../../../hoc/withProvider";
import { useTradeContext } from "context/trade.context";
import SkeletonLoader from "components/skeleton";

const OrderBook: FC<RecordProps> = ({
	records,
	onClose,
	baseCoin,
	quoteCoin,
}) => {
	// const options = ["0.01", "0.02", "0.03"];

	const [active, setActive] = useState<"sell" | "buy" | "buysell">("buysell");
	const { loading, onPageLoad } = useTradeContext();
	return (
		<div data-testid="rg-orderBook" className={"m-2 mt-0 w-76"}>
			<div className={"hidden md:block"}>
				<div className="">
					<div
						className={"orderBook__head px-5 pt-5 pb-2 rounded bg-lightGrey"}
					>
						<div
							className={
								"orderBook__head__title text-small font-medium text-neutral-400 mb-4"
							}
						>
							<p>Order Book</p>
							{/* <button
								data-testid="rg-orderBookCloseButton"
								className={"outline-none"}
								onClick={onClose}
							>
								<Close14 />
							</button> */}
						</div>
						<div className={"orderBook__head__selector"}>
							<div className={"flex"}>
								<button
									className={"outline-none"}
									onClick={() => setActive("buysell")}
								>
									<OrderBookAll
										className={`ml-0.5 mr-2.5 ${
											active === "buysell" ? "opacity-100" : "opacity-20"
										}`}
									/>
								</button>
								<button
									className={"outline-none"}
									onClick={() => setActive("buy")}
								>
									<OrderBookBuy
										className={`ml-0.5 mr-2.5 ${
											active === "buy" ? "opacity-100" : "opacity-20"
										}`}
									/>
								</button>
								<button
									className={"outline-none"}
									onClick={() => setActive("sell")}
								>
									<OrderBookSell
										className={`ml-0.5 mr-2.5 ${
											active === "sell" ? "opacity-100" : "opacity-20"
										}`}
									/>
								</button>
							</div>
							{/* <div className={"mr-12 text-labels"}>
								<select
									data-testid="rg-orderBook-select"
									className={`select__book bg-transparent text-neutral-500`}
								>
									{options?.map((opt: any, index: any) => (
										<option
											key={index}
											value={opt}
											data-testid="rg-orderBook-select-option"
										>
											{opt}
										</option>
									))}
								</select>
							</div> */}
						</div>
					</div>
					{active !== "buysell" && (
						<div
							className={"orderBook__tab px-3 py-5 rounded bg-lightGrey mb-2"}
						>
							<div
								className={
									"flex flex-row items-center text-x-small text-neutral-400 mb-3.5"
								}
							>
								<p className={"w-1/3 px-1"}>
									Price ({quoteCoin.toUpperCase()})
								</p>
								<p className={"w-1/3 px-1 text-right"}>
									Amount ( {baseCoin.toUpperCase()})
								</p>
								<p className={"w-1/3 px-1 text-right"}>Total</p>
							</div>
							{loading || onPageLoad ? (
								<SkeletonLoader />
							) : (
								<>
									<Sell records={records} show={active === "sell"} />
									<Buy records={records} show={active === "buy"} />
								</>
							)}
						</div>
					)}

					<BuySell
						records={records}
						show={active === "buysell"}
						baseCoin={baseCoin}
						quoteCoin={quoteCoin}
					/>
				</div>
				{/* <div className="">
					<BuySell
						records={records}
						show={true}
						baseCoin={baseCoin}
						quoteCoin={quoteCoin}
					/>
				</div> */}
			</div>
			<MobileOrderBook records={records} />
		</div>
	);
};

export default withProvider(OrderBook);
