import {
	CaretDownFilled,
	CaretUpFilled,
	CheckIconBlue,
} from "./../../../assets";
import React from "react";
import CustomScrollBar from "./../../../components/shared/CustomScrollBar";

interface OrderHistoryProps {
	orderHistories: Array<{
		time: string;
		pair: string;
		type: string;
		side: string;
		average: string;
		price: string;
		executed: boolean;
		amount: string;
		total: string;
	}>;
}

export default function OrderHistory({ orderHistories }: OrderHistoryProps) {
	return (
		<div className="w-full">
			{/* Mobile View*/}
			<div className="block sm:hidden">
				{/* <div className="flex items-center mt-2 mb-5">
					<CheckIconBlue />
					<p className="ml-2 text-x-small">Hide all canceled</p>
				</div> */}
				{orderHistories.map((item, idx) => {
					return (
						<div
							key={idx}
							className="border-b border-sky-100 pb-5 text-x-small mb-5"
						>
							<div className="flex justify-between items-center mb-2">
								<p className="font-bold uppercase text-labels">{item.pair}</p>
								<p className="font-medium text-sky-100">{item.time}</p>
							</div>
							<div className="flex justify-between items-center mb-2">
								<p className="font-bold uppercase">
									{item.type}/
									{item.side.toLowerCase().includes("sell") ? (
										<span className="text-red-500">{item.side}</span>
									) : (
										<span className="text-success">{item.side}</span>
									)}
								</p>
								<p className="font-medium bg-success text-success bg-opacity-30 text-x-small rounded-sm px-1 py-1">
									filled
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
							{/* <div className="flex justify-between items-center  mb21">
								<p className="text-sky-100">Total (BTC)</p>
								<p>0.00057494</p>
							</div> */}
						</div>
					);
				})}
			</div>
			<CustomScrollBar height={200}>
				<table className="table-auto text-xs w-full  hidden sm:block">
					<thead>
						<tr className="text-left">
							<th className="pr-3 pb-5 w-1/4 ">
								<div className="flex items-center">Time</div>
							</th>
							<th className="pr-6 pb-5 w-auto ">
								<div className="flex items-center">Pair</div>
							</th>
							<th className="pr-6 pb-5 w-auto ">
								<div className="flex items-center">Type</div>
							</th>
							<th className="pr-6 pb-5 w-auto ">
								<div className="flex items-center">Side</div>
							</th>
							<th className="pr-3 pb-5 w-1/4 ">
								<div className="flex items-center">Average</div>
							</th>
							<th className="pr-3 pb-5 w-1/4 ">
								<div className="flex items-center">Price</div>
							</th>
							<th className="pr-6 pb-5 w-auto ">
								<div className="flex items-center">Executed</div>
							</th>
							<th className="pr-6  pb-5 w-auto ">
								<div className="flex items-center">Amount</div>
							</th>
							<th className="pr-3 pb-5 w-1/4 ">
								<div className="flex items-center">Total</div>
							</th>
							<th className="pr-3 pb-5 w-1/4 ">
								<div className="flex items-center justify-end">All</div>
							</th>
						</tr>
					</thead>

					<tbody
						className="table-auto text-xs w-full"
						data-testid={"history-body-rows"}
					>
						{orderHistories.map((history, index) => {
							return (
								<tr key={index}>
									<td className="pr-3 pb-5">{history.time}</td>
									<td className="pr-3 pb-5">{history.pair}</td>
									<td className="pr-3 pb-5">{history.type}</td>
									<td
										data-testid="history-body-row-side"
										// className={`pr-3 pb-5  ${
										// 	history.side.toLowerCase().includes("buy") &&
										// 	"text-blue-500"
										// }
										// ${
										// 										history?.side
										// 											.toLowerCase()
										// 											.includes("buy") && "text-green-500"
										// 									}    ${
										// 	history?.side?.toLowerCase().includes("sell") &&
										// 	"text-red-600"
										// }`}
									>
										{history?.side}
									</td>
									<td className="pr-3 pb-5">{history.average}</td>
									<td className="pr-3 pb-5">{history.price}</td>
									<td className="pr-3 pb-5">
										{history.executed ? "Yes" : "No"}
									</td>
									<td className="pr-3 pb-5">{history.amount}</td>
									<td className="pr-3 pb-5">{history.total}</td>
									<td className="pr-3 pb-5">
										<div className="flex justify-end items-center">0.000</div>
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
