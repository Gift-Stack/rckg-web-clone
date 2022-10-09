import {
	CaretDownFilled,
	CaretUpFilled,
	CheckIconBlue,
} from "./../../../assets";
import React, { useState } from "react";
import { isoDateHistory, showToast } from "../../../utils";
import { TradeAction } from "redux/actions";
import { useTradeContext } from "context/trade.context";
import { storageService } from "services";
import CustomScrollBar from "../../../components/shared/CustomScrollBar";
import { useGlobalContext } from "context/global.context";
import moment from "moment";

interface IProps {
	openOrders: Array<{
		time: string | number;
		symbol: string;
		type: string;
		side: string;
		price: string;
		amount: string;
		filled: string;
		triggerConditions: string;
		total: number;
		orderId: string;
	}>;
}

export default function OpenOrder({ openOrders }: IProps) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const { uid } = storageService.getAuthData();

	const { setRefreshHistory } = useTradeContext();
	const { setRefreshWallet } = useGlobalContext();

	const handleCancelOpenOrder = async (
		symbol: string,
		orderId: string,
		idx: number
	) => {
		setIsLoading(true);
		setSelectedIndex(idx);
		try {
			const res = await TradeAction.cancelOpenOrder(
				uid as string,
				symbol,
				orderId
			);
			res && showToast("Order successfully cancelled", "success");
			setIsLoading(false);
			setRefreshHistory(true);
			setRefreshWallet(true);
			return;
		} catch (error) {
			setIsLoading(false);
			return;
		}
	};

	const handleCancelAllOpenOrder = async () => {
		setIsLoading(true);
		try {
			const res = await TradeAction.cancelAllOpenOrder(
				uid as string,
				openOrders[0].symbol
			);
			res && showToast("Orders successfully cancelled", "success");
			setIsLoading(false);
			setRefreshHistory(true);
			setRefreshWallet(true);
			return;
		} catch (error) {
			setIsLoading(false);
			return;
		}
	};

	return (
		<div>
			{/* Mobile View*/}
			<div className="block sm:hidden">
				{/* <div className="flex items-center mt-2 mb-5">
					<CheckIconBlue />
					<p className="ml-2 text-x-small">Hide all canceled</p>
				</div> */}
				{openOrders?.length > 0 &&
					openOrders.map((item, idx) => {
						return (
							<div
								key={idx}
								className="border-b border-sky-100 pb-5 text-x-small mb-5"
							>
								<div className="flex justify-between items-center mb-2">
									<p className="font-bold uppercase text-labels">
										{item.symbol}
									</p>
									<p className="font-medium text-sky-100">
										{moment(item.time).format("MMM Do YY")}
									</p>
								</div>
								<div className="flex justify-between items-center mb-2">
									<p className="font-bold uppercase text-success">
										{item.type}/{item.side}
									</p>
									<p className="font-medium bg-success text-success bg-opacity-30 text-x-small rounded-sm px-1 py-1">
										{item.filled}
									</p>
								</div>
								<div className="flex justify-between items-center mb-2 ">
									<p className="text-sky-100">Executed/Amount</p>
									<p>{item.amount}</p>
								</div>
								<div className="flex justify-between items-center  mb21">
									<p className="text-sky-100">Average / Price</p>
									<p>{item.price}</p>
								</div>
								<div className="flex justify-between items-center  mb21">
									<p className="text-sky-100">Total</p>
									<p>{item.total}</p>
								</div>
							</div>
						);
					})}
			</div>
			<CustomScrollBar height={200}>
				<table className="w-full table-auto text-xs  hidden sm:table">
					<thead>
						<tr className="text-left">
							<th className="pr-3 pb-5">
								<div className="flex items-center">Time</div>
							</th>
							<th className="pr-3 pb-5">
								<div className="flex items-center">Symbol</div>
							</th>
							<th className="pr-3 pb-5">
								<div className="flex items-center">Type</div>
							</th>
							<th className="pr-3 pb-5">
								<div className="flex items-center">Side</div>
							</th>
							<th className="pr-3 pb-5">
								<div className="flex items-center">Price</div>
							</th>
							<th className="pr-3 pb-5">
								<div className="flex items-center">Amount</div>
							</th>
							<th className="pr-3 pb-5">
								<div className="flex items-center">Filled</div>
							</th>
							<th className="pr-3 pb-5">
								<div className="flex items-center">
									Trigger Conditions
									<div className="flex flex-col ml-0.5 gap-0.5">
										<CaretUpFilled />
										<CaretDownFilled />
									</div>
								</div>
							</th>
							<th className="pr-3 pb-5">
								{isLoading ? (
									<span>Cancelling</span>
								) : (
									<div
										onClick={() =>
											openOrders.length && handleCancelAllOpenOrder()
										}
										className="flex items-center justify-end cursor-pointer"
									>
										Cancel All
									</div>
								)}
							</th>
						</tr>
					</thead>

					<tbody className="text-x-small" data-testid={"order-body-rows"}>
						{openOrders?.map((item, idx) => {
							return (
								<tr key={item.orderId}>
									<td className="pr-3 pb-5">
										{moment(item.time).format("MMM Do YY")}
									</td>
									<td className="pr-3 pb-5">
										<p>{item.symbol}</p>
									</td>
									<td className="pr-3 pb-5">{item.type}</td>
									<td className="pr-3 pb-5">{item.side}</td>
									<td className="pr-3 pb-5">{item.price}</td>
									<td className="pr-3 pb-5">{item.amount}</td>
									<td className="pr-3 pb-5">{item.filled}</td>
									<td className="pr-3 pb-5">{item.triggerConditions}</td>
									<td className="pr-3 pb-5">
										<div className="flex justify-end items-center ">
											{idx === selectedIndex && isLoading ? (
												<button disabled={isLoading}>Cancelling</button>
											) : (
												<span
													onClick={() =>
														handleCancelOpenOrder(
															item.symbol,
															item.orderId,
															idx
														)
													}
													className="text-neutral-350 cursor-pointer"
												>
													cancel
												</span>
											)}
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</CustomScrollBar>
		</div>
	);
}
