import { CheckIconBlue } from "./../../../assets";
import React from "react";
import { isoDateHistory } from "utils";
import CustomScrollBar from "./../../../components/shared/CustomScrollBar";

interface TradeHistoryProps {
	tradeHistories: Array<{
		time: string;
		pair: string;
		type: string;
		side: string;
		average: string;
		price: string;
		executed: boolean;
		fee: string;
		total: string;
	}>;
}

export default function TradeHistory({ tradeHistories }: TradeHistoryProps) {
	return (
		<div className="history-table ">
			{/* Mobile View*/}
			<div className="block sm:hidden">
				{/* <div className="flex items-center mt-2 mb-5">
					<CheckIconBlue />
					<p className="ml-2 text-x-small">Hide all canceled</p>
				</div> */}
				{tradeHistories?.map((item, idx) => {
					return (
						<div
							key={idx}
							className="border-b border-sky-100 pb-5 text-x-small mb-5"
						>
							<div className="flex justify-between items-center mb-2">
								<p className="font-bold uppercase text-success">{item.pair}</p>
								<p className="font-medium text-sky-100">
									{isoDateHistory(item.time)}
								</p>
							</div>
							<div className="flex justify-between items-center mb-2">
								<p className="text-sky-100">Price</p>
								<p>{item.price}</p>
							</div>
							<div className="flex justify-between items-center mb-2">
								<p className="text-sky-100">Fee</p>
								<p>{item.fee}</p>
							</div>
							<div className="flex justify-between items-center mb-2">
								<p className="text-sky-100">Total</p>
								<p>{item.total}</p>
							</div>
						</div>
					);
				})}
			</div>
			<CustomScrollBar height={200}>
				<table className="table-auto text-xs w-full hidden sm:block">
					<thead>
						<tr className="text-left">
							<th className="pr-10 pb-5 w-auto">
								<div className="flex items-center whitespace-nowrap">Time</div>
							</th>
							<th className="pr-10 pb-5 w-auto">
								<div className="flex items-center">Pair</div>
							</th>
							<th className="pr-10 pb-5 w-auto">
								<div className="flex items-center">Type</div>
							</th>
							<th className="pr-10 pb-5 w-auto">
								<div className="flex items-center">Side</div>
							</th>
							<th className="pr-10 pb-5 w-1/4">
								<div className="flex items-center">Average</div>
							</th>
							<th className="pr-3 pb-5 w-1/4">
								<div className="flex items-center">Price</div>
							</th>
							<th className="pr-7 pb-5 w-auto">
								<div className="flex items-center">Executed</div>
							</th>
							<th className="pr-3 pb-5 w-1/4">
								<div className="flex items-center">Fee</div>
							</th>
							<th className="pr-3 pb-5 w-1/4">
								<div className="flex items-center justify-end">Total</div>
							</th>
						</tr>
					</thead>
					<tbody
						className="text-x-small"
						style={{ width: "100%" }}
						data-testid={"history-body-rows"}
					>
						{tradeHistories.map((history, index) => {
							return (
								<tr key={index}>
									<td className="pr-3 pb-5 whitespace-nowrap">
										{isoDateHistory(history.time)}
									</td>
									<td className="pr-3 pb-5">{history.pair}</td>
									<td className="pr-3 pb-5">{history.type}</td>
									<td
										data-testid="history-body-row-side"
										className={`pr-3 pb-5  ${
											history?.side?.toLowerCase().includes("buy") &&
											"text-blue-500"
										}
                                    ${
																			history?.side
																				?.toLowerCase()
																				.includes("buy") && "text-green"
																		}    ${
											history?.side?.toLowerCase().includes("sell") &&
											"text-red-600"
										}`}
									>
										{history.side}
									</td>
									<td className="pr-3 pb-5">{history.average}</td>
									<td className="pr-3 pb-5">{history.price}</td>
									<td className="pr-3 pb-5">
										{history.executed ? "Yes" : "No"}
									</td>
									<td className="pr-3 pb-5">{history.fee}</td>
									<td className="pr-3 pb-5">
										<div className="flex justify-end items-center">
											{history.total}
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
