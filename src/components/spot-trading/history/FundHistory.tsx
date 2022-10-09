import {
	CaretDownFilled,
	CaretUpFilled,
	CheckIconBlue,
} from "./../../../assets";
import React, { useEffect } from "react";
import CustomScrollBar from "../../../components/shared/CustomScrollBar";

interface IFundItem {
	coin: string;
	totalBalance: string;
	availableBalance: string;
	inOrder: string;
	btcValue: string;
}

interface FundHistoryProps {
	fundHistories: IFundItem[];
}

export default function FundHistory({ fundHistories }: FundHistoryProps) {
	return (
		<div className="w-full">
			{/* Mobile View*/}
			<div className="block sm:hidden">
				{/* <div className="flex items-center mt-2 mb-5">
					<CheckIconBlue />
					<p className="ml-2 text-x-small">Hide all canceled</p>
				</div> */}
				{fundHistories.map((item, idx) => {
					return (
						<div
							key={idx}
							className="border-b border-sky-100 pb-5 text-x-small mb-5"
						>
							<div className="flex justify-between items-center mb-2">
								<p className="font-bold uppercase text-success">{item.coin}</p>
							</div>
							<div className="flex justify-between items-center mb-2">
								<p className="text-sky-100">Price</p>
								<p>{item.btcValue}</p>
							</div>
							<div className="flex justify-between items-center mb-2">
								<p className="text-sky-100">Total</p>
								<p>{item.availableBalance}</p>
							</div>
						</div>
					);
				})}
			</div>

			{/* Desktop */}
			<CustomScrollBar height={200}>
				<table className="table-auto text-xs w-full hidden sm:block">
					<thead>
						<tr className="text-left">
							<th className="pr-3 pb-5  w-1/4 ">
								<div className="flex items-center whitespace-nowrap">
									Coin
									<div className="flex flex-col ml-0.5 gap-0.5">
										<CaretUpFilled />
										<CaretDownFilled />
									</div>
								</div>
							</th>

							<th className="pr-3 pb-5  w-1/4 ">
								<div className="flex items-center whitespace-nowrap">
									Total Balance
									<div className="flex flex-col ml-0.5 gap-0.5">
										<CaretUpFilled />
										<CaretDownFilled />
									</div>
								</div>
							</th>
							<th className="pr-3 pb-5 w-1/4">
								<div className="flex items-center whitespace-nowrap">
									Available Balance
									<div className="flex flex-col ml-0.5 gap-0.5">
										<CaretUpFilled />
										<CaretDownFilled />
									</div>
								</div>
							</th>
							<th className="pr-3 pb-5 ">
								<div className="flex items-center whitespace-nowrap">
									Inorder
									<div className="flex flex-col ml-0.5 gap-0.5">
										<CaretUpFilled />
										<CaretDownFilled />
									</div>
								</div>
							</th>
							<th className="pr-3 pb-5  w-1/4 ">
								<div className="flex items-center w-full justify-end whitespace-nowrap">
									USDT Value
									<div className="flex flex-col ml-0.5 gap-0.5">
										<CaretUpFilled />
										<CaretDownFilled />
									</div>
								</div>
							</th>
						</tr>
					</thead>

					<tbody
						className="text-x-small w-full"
						data-testid={"order-body-rows"}
					>
						{fundHistories.map((item, index) => {
							return (
								<tr key={index}>
									<td className="pr-3 pb-5">{item.coin}</td>
									<td className="pr-3 pb-5">{item.totalBalance}</td>
									<td className="pr-3 pb-5">{item.availableBalance}</td>
									<td className="pr-3 pb-5">{item.inOrder}</td>
									<td className="pr-3 pb-5">
										<div className="flex justify-end items-center">
											{item.btcValue}
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
