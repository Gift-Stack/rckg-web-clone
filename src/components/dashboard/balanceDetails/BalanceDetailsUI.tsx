import React, { FC, useEffect, useState } from "react";
import BalanceVisibility from "./BalanceVisibiity";
import { Doughnut } from "react-chartjs-2";
import { BoxFillState, BoxOutlineState } from "../../box/enum";
import { BalanceDetailsUIProps, DataSetProps, Wallet } from "./model";
import Label from "./Label";
import { CurrencyEnum } from "../../../types/enum";
import { CaretDown } from "../../../assets";

const state: DataSetProps = {
	labels: [],
	datasets: [
		{
			backgroundColor: ["#B0C1DA"],
			hoverBackgroundColor: ["#B0C1DA"],
			data: [100],
			borderWidth: 0,
			cutout: 80,
			radius: 70,
		},
	],
};

const BalanceDetailsUI: FC<BalanceDetailsUIProps> = ({
	icon,
	value,
	showTotalBalance,
	onClick,
	wallets,
	btcBalance,
	usdtBalance,
}) => {
	const [data, setData] = useState<Wallet[]>([]);
	const [dataSet, setDataSet] = useState<DataSetProps>(state);
	const [balanceDropdownVisibility, setBalanceDropdownVisibility] =
		useState(false);
	const handleBalanceDropdown = () => {
		setBalanceDropdownVisibility(!balanceDropdownVisibility);
	};

	useEffect(() => {
		setData(wallets);
		plotData(data);
	}, [data, wallets]);

	const plotData = (data: Wallet[]): void => {
		if (data) {
			const _data: DataSetProps = {
				labels: data?.length
					? data
							?.map((d) => {
								return d.currency;
							})
							.reverse()
					: [],
				datasets: [
					{
						backgroundColor: data?.length
							? data
									?.map((d) => {
										return d.color;
									})
									.reverse()
							: ["#B0C1DA"],
						hoverBackgroundColor: data?.length
							? data
									?.map((d) => {
										return d.color;
									})
									.reverse()
							: ["#B0C1DA"],
						data: data?.length
							? data
									?.map((d) => {
										return d.percentage;
									})
									.reverse()
							: [100],
						borderWidth: data?.length > 1 ? 2 : 0,
						cutout: 80,
						radius: 75,
					},
				],
			};
			setDataSet(_data);
		}
	};

	const styles = {
		resChartjs: {
			transform: "translate(-20%, 0%)",
		},
	};

	return (
		<div data-testid="rg-balance-details">
			<div className={"hidden md:flex w-full mt-5"}>
				<div className={"w-1/2"}>
					<div className={"flex items-center"}>
						<small className={"text-neutral-300 text-labels"}>
							Account Balance:
						</small>
						<BalanceVisibility icon={icon} value={value} onClick={onClick} />
					</div>
					<h1
						className={
							"xl:text-xl-heading md:text-headline text-md-headline font-bold mt-1 mb-4 text-neutral-400"
						}
					>
						{showTotalBalance ? (btcBalance ? btcBalance : 0.0) : "xxxxxxxxx"}{" "}
						<span
							className={
								"text-labels sm:text-sm-headline font-medium text-neutral-300"
							}
						>
							BTC
						</span>
					</h1>
					<small className={"text-neutral-300 text-labels"}>
						Estimated Balance:
					</small>
					<h1
						className={
							"xl:text-l-headline md:text-headline text-md-headline font-bold mb-3 text-neutral-400"
						}
					>
						${usdtBalance ? usdtBalance : 0.0}
					</h1>
				</div>
				<div className={"w-1/2"}>
					<div className={"w-full xl:flex grid"}>
						<div
							className={"xl:w-2/3 w-full xl:mt-4 xl:order-first order-last"}
						>
							<div className={"w-full"}>
								<Doughnut
									data={dataSet}
									width={200}
									height={200}
									options={{
										responsive: false,
										maintainAspectRatio: true,
										aspectRatio: 2,
										plugins: {
											legend: {
												display: false,
											},
											title: {
												display: false,
											},
										},
									}}
								/>
							</div>
						</div>
						<div
							className={
								"xl:w-1/3 w-full flex flex-col xl:items-end items-center pr-2 text-small xl:mb-0 mb-4"
							}
						>
							<>
								{wallets &&
									wallets.length >= 1 &&
									wallets.map((wallet) => (
										<Label
											fill={
												wallet.color === "#56BC7C"
													? BoxFillState.GREEN
													: wallet.color === "#FF9100"
													? BoxFillState.SECONDARY
													: BoxFillState.PINK
											}
											outline={BoxOutlineState.NONE}
											key={wallet.id}
											currency={wallet.currency}
											amount={wallet.amount}
										/>
									))}
							</>
						</div>
					</div>
				</div>
			</div>
			<div className={"md:hidden w-full"}>
				<div className={"w-full"}>
					<h1
						className={
							"xl:text-xl-heading text-headline font-bold mt-1 mb-3.5 text-neutral-400 flex"
						}
					>
						{showTotalBalance ? (btcBalance ? btcBalance : 0.0) : "xxxxxxxxx"}{" "}
						<span
							className={
								"text-labels sm:text-sm-headline font-medium text-neutral-300 ml-1 mt-3"
							}
						>
							BTC
						</span>
						<BalanceVisibility icon={icon} onClick={onClick} />
					</h1>
					<small
						className={"text-neutral-300 text-labels flex justify-between"}
					>
						=${usdtBalance ? usdtBalance : 0.0}
						<span
							onClick={handleBalanceDropdown}
							className={`w-7 h-7 flex items-center justify-center balance__details-icon ${
								balanceDropdownVisibility && "balance__details-icon-open"
							}`}
						>
							<CaretDown />
						</span>
					</small>
				</div>
				{balanceDropdownVisibility && (
					<div className={"w-full"}>
						<div className={"w-full grid grid-cols-2"}>
							<div className={"order-first"}>
								<div className={"w-full"} style={styles.resChartjs}>
									<Doughnut
										data={dataSet}
										width={200}
										height={200}
										options={{
											responsive: false,
											maintainAspectRatio: true,
											aspectRatio: 2,
											plugins: {
												legend: {
													display: false,
												},
												title: {
													display: false,
												},
											},
										}}
									/>
								</div>
							</div>
							<div
								className={
									" flex flex-col items-center pr-2 text-small pt-5 space-y-2"
								}
							>
								<>
									{wallets &&
										wallets.length >= 1 &&
										wallets.map((wallet) => (
											<Label
												fill={
													wallet.currency === CurrencyEnum.USDT
														? BoxFillState.GREEN
														: wallet.currency === CurrencyEnum.BTC
														? BoxFillState.SECONDARY
														: BoxFillState.PINK
												}
												outline={BoxOutlineState.NONE}
												key={wallet.id}
												currency={wallet.currency}
												amount={wallet.amount}
											/>
										))}
								</>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default BalanceDetailsUI;
