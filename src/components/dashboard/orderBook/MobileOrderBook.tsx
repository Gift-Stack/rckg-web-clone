import React, { FC, useState } from "react";
import { MobileRecordProps } from "./model";
import { formatToCurrency } from "../../../constants";
import { OrderBookAll, OrderBookBuy, OrderBookSell } from "../../../assets/svg";
import { useTradeContext } from "../../../context/trade.context";
import SkeletonLoader from "../../../components/skeleton";

const MobileOrderBook: FC<MobileRecordProps> = ({ records }) => {
	const [showBuy, setShowBuy] = useState(false);
	const [showBuySell, setShowBuySell] = useState(true);
	const [showSell, setShowSell] = useState(false);
	const changeActive = (value: string) => {
		if (value === "showBuySell") {
			setShowBuySell(true);
			setShowBuy(false);
			setShowSell(false);
		} else if (value === "showBuy") {
			setShowBuySell(false);
			setShowBuy(true);
			setShowSell(false);
		} else if (value === "showSell") {
			setShowBuySell(false);
			setShowBuy(false);
			setShowSell(true);
		}
	};
	const options = ["0.01", "0.02", "0.03"];
	const { setPrice } = useTradeContext();
	const handleSetPrice = (price: number) => {
		setPrice(price);
	};

	const { loading, onPageLoad } = useTradeContext();
	return (
		<div className={"block md:hidden"}>
			<div className={"p-2 rounded"}>
				<div className={"flex flex-row"}>
					<div
						className={`flex justify-center w-1/4 mr-2 py-1.5 ${
							showBuySell && "bg-mediumpurple"
						}`}
					>
						<button
							className={"outline-none"}
							onClick={() => changeActive("showBuySell")}
						>
							<OrderBookAll />
						</button>
					</div>
					<div
						className={`flex justify-center w-1/4 mr-2 py-1.5 ${
							showBuy && "bg-mediumpurple"
						}`}
					>
						<button
							className={"outline-none"}
							onClick={() => changeActive("showBuy")}
						>
							<OrderBookBuy />
						</button>
					</div>
					<div
						className={`flex justify-center w-1/4 mr-2 py-1.5 ${
							showSell && "bg-mediumpurple"
						}`}
					>
						<button
							className={"outline-none"}
							onClick={() => changeActive("showSell")}
						>
							<OrderBookSell />
						</button>
					</div>
					<div
						className={
							"flex justify-center text-labels w-1/4 bg-transparent mr-1 py-1.5"
						}
					>
						<select
							data-testid="rg-orderBook-Mobile-select"
							className={`select__book bg-transparent outline-none text-neutral-300`}
						>
							{options?.map((opt: any, index: any) => (
								<option
									key={index}
									value={opt}
									data-testid="rg-orderBook-Mobile-select-option"
								>
									{opt}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
			{loading || onPageLoad ? (
				<SkeletonLoader height={20} />
			) : (
				<>
					<div className={"p-2"}>
						{showBuySell && (
							<div
								className={
									"grid grid-cols-2 gap-2 text-x-small text-neutral-350 leading-6"
								}
							>
								<div>
									<div className={"flex justify-between"}>
										<p>Amount</p>
										<p>Price</p>
									</div>
									{records?.map(
										(record: any, index) =>
											record.type === "buy" && (
												<div
													key={index}
													className={"flex justify-between"}
													style={{
														background: `linear-gradient(to left, rgba(40, 158, 101, 0.1) ${
															record.activity
														}%, white ${100 - record.activity}%)`,
													}}
													onClick={() => handleSetPrice(record.price)}
												>
													<p>{formatToCurrency(record.amount, 6)}</p>
													<p className={"text-deepGreen"}>
														{formatToCurrency(record.price, 2)}
													</p>
												</div>
											)
									)}
								</div>
								<div>
									<div className={"flex justify-between"}>
										<p>Price</p>
										<p>Amount</p>
									</div>
									{records?.map(
										(record: any, index) =>
											record.type === "sell" && (
												<div
													key={index}
													className={"flex justify-between"}
													style={{
														background: `linear-gradient(to right, rgba(218, 42, 42, 0.08) ${
															record.activity
														}%, white ${100 - record.activity}%)`,
													}}
													onClick={() => handleSetPrice(record.price)}
												>
													<p className={"text-deepRed"}>
														{formatToCurrency(record.price, 2)}
													</p>
													<p>{formatToCurrency(record.amount, 6)}</p>
												</div>
											)
									)}
								</div>
							</div>
						)}
						{showBuy && (
							<div className={"text-x-small text-neutral-350 leading-6"}>
								<div className={"flex justify-between"}>
									<p>Price</p>
									<p>Amount</p>
									<p>Total</p>
								</div>
								{records?.map(
									(record: any, index) =>
										record.type === "buy" && (
											<div
												key={index}
												className={"grid grid-cols-3"}
												style={{
													background: `linear-gradient(to right, rgba(40, 158, 101, 0.1) ${
														record.activity
													}%, white ${100 - record.activity}%)`,
												}}
												onClick={() => handleSetPrice(record.price)}
											>
												<p className={"text-deepGreen"}>
													{formatToCurrency(record.price, 2)}
												</p>
												<p className={"text-center"}>
													{formatToCurrency(record.amount, 6)}
												</p>
												<p className={"text-right"}>
													{formatToCurrency(record.total, 6)}
												</p>
											</div>
										)
								)}
							</div>
						)}
						{showSell && (
							<div className={"text-x-small text-neutral-350 leading-6"}>
								<div className={"flex justify-between"}>
									<p>Price</p>
									<p>Amount</p>
									<p>Total</p>
								</div>
								{records?.map(
									(record: any, index) =>
										record.type === "sell" && (
											<div
												key={index}
												className={"grid grid-cols-3"}
												style={{
													background: `linear-gradient(to right, rgba(218, 42, 42, 0.08) ${
														record.activity
													}%, white ${100 - record.activity}%)`,
												}}
												onClick={() => handleSetPrice(record.price)}
											>
												<p className={"text-deepRed"}>
													{formatToCurrency(record.price, 2)}
												</p>
												<p className={"text-center"}>
													{formatToCurrency(record.amount, 6)}
												</p>
												<p className={"text-right"}>
													{formatToCurrency(record.total, 6)}
												</p>
											</div>
										)
								)}
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default MobileOrderBook;
