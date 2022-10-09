import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { P2PListingOptionState } from "../enum";
import { P2PListingProps, Coin } from "./model";
import { coins } from "./data";
import {
	CaretDownFilledMedium,
	Refresh,
	VerticalMenu,
	YoutubeOutlined,
	Order,
	More,
} from "../../../assets";

const P2PListingTable: FC<P2PListingProps> = ({
	children,
	cssClass,
	title,
	tableOptions,
	handleOption,
}) => {
	const onOption = (value: string) => {
		handleOption && handleOption(value);
	};
	const [coinOptions, setcoinOptions] = useState<Coin[]>([]);
	const [showOptions, setShowOptions] = useState(false);
	const [showFiatOptions, setShowFiatOptions] = useState(false);
	const [showPaymentOptions, setShowPaymentOptions] = useState(false);
	useEffect(() => {
		setcoinOptions(coins);
	}, []);

	return (
		<div data-testid="rg-P2P-Listing-table">
			<div
				className={`${cssClass} flex flex-col card_shadow`}
				data-testid={"rg-card"}
			>
				<div className="items-center text-center sm:text-left justify-center sm:justify-between hiden md:flex-wrap md:flex mb-2">
					<h2
						className={
							"text-md-headline lg:text-l-headline font-bold text-neutral-400"
						}
					>
						{title}
					</h2>
				</div>
				<div className="flex justify-between">
					{tableOptions && tableOptions?.length ? (
						<div
							className={
								"sm:px-2 lg:px-6 flex flex-wrap items-center gap-3 sm:gap-8 sm:mt-2 lg:mt-4"
							}
						>
							<div className="flex flex-wrap gap-1 lg:gap-2 px-2 sm:px-3 py-1 sm:py-2 border rounded border-gray-150">
								{tableOptions.map((option) => (
									<button
										key={Math.random()}
										data-testid="rg-table-option"
										className={`py-0.5 sm:py-1 lg:py-1.5 px-3 sm:px-6 lg:px-8 ${
											option.isActive
												? option.name == "Buy"
													? P2PListingOptionState.BUY
													: P2PListingOptionState.SELL
												: P2PListingOptionState.INACTIVE
										}`}
										type={"button"}
										onClick={() => onOption(option.name)}
									>
										{option.name}
									</button>
								))}
							</div>
							<div className="grid">
								<div
									onClick={() => setShowOptions(!showOptions)}
									data-testid="rg-show-options"
									className="h-9 cursor-pointer flex gap-2 pl-1 pr-1.5 items-center flex-nowrap border rounded border-gray-250 "
								>
									<Image
										src={"/images/test/ltc.png"}
										alt={"rocket"}
										width={18}
										height={18}
									/>
									<span className="font-medium text-small text-neutral-500 sm:mr-2 uppercase">
										{"BTC"}
									</span>
									<span>
										<CaretDownFilledMedium />
									</span>
								</div>
								{showOptions && (
									<div className="absolute mt-10 bg-white shadow-gray py-5 rounded">
										<div className="overflow-y-scroll h-52 mt-2">
											{coinOptions.map((coin) => (
												<div
													key={coin.value}
													data-testid="rg-select-options"
													className="p-2 rounded mx-2 flex gap-3 items-center cursor-pointer hover:bg-primary-100"
													onClick={() => {
														// searchChange(coin);
														setShowOptions(false);
													}}
												>
													<Image
														src={coin.image ? coin.image : ""}
														alt={"coin-img"}
														height={18}
														width={18}
													/>
													<h1>{coin.name}</h1>
												</div>
											))}
										</div>
									</div>
								)}
							</div>
						</div>
					) : (
						<div></div>
					)}
					<div className="hidden sm:flex items-center space-x-7 text-gray-400 mr-3">
						<Link href="p2p/listings">
							<a className="text-neutral-500 flex items-center gap-1 text-labels font-semibold">
								<YoutubeOutlined />
								Watch Tutorial
							</a>
						</Link>
						<Link href="p2p/order-list">
							<a className="text-neutral-500 flex items-center gap-1 text-labels font-semibold">
								<Order />
								Orders
							</a>
						</Link>
						<div className="user-group relative h-full text-neutral-500 text-labels font-semibold">
							<a href="#" className="flex items-center gap-1 h-full">
								<More />
								More
							</a>
							<div className="hidden user-group-hover:block absolute right-0 top-full w-40 bg-white">
								<Link href="/">
									<a className="flex text-left py-3 px-3 text-black hover:text-blue-dark text-small">
										<span className="dashboard__header__sublink">
											Payment Settings
										</span>
									</a>
								</Link>
								<Link href="/p2p-merchant">
									<a className="flex border-t border-gray-300 text-left py-3 px-3 text-black hover:text-blue-dark text-small">
										<span className="dashboard__header__sublink">
											Post new ads
										</span>
									</a>
								</Link>
								<Link href="/p2p-merchant/ads-management">
									<a className="flex border-t border-gray-300 text-left py-3 px-3 text-black hover:text-blue-dark text-small">
										<span className="dashboard__header__sublink">My ads</span>
									</a>
								</Link>
							</div>
						</div>
					</div>
					<div className="sm:hidden block user-group relative">
						<div className="flex items-center justify-center h-full w-5">
							<VerticalMenu />
						</div>
						<div className="hidden user-group-hover:block absolute right-0 top-full w-40 bg-white">
							<Link href="/p2p/listings">
								<a className="flex text-left py-3 px-3 border-b border-neutral-100 text-neutral-500 hover:text-blue-dark text-small">
									Watch Tutorial
								</a>
							</Link>
							<Link href="/p2p/order-list">
								<a className="flex text-left py-3 px-3 border-b border-neutral-100 text-neutral-500 hover:text-blue-dark text-small">
									Orders
								</a>
							</Link>
							<Link href="/">
								<a className="flex text-left py-3 px-3 border-b border-neutral-100 text-neutral-500 hover:text-blue-dark text-small">
									Payment Settings
								</a>
							</Link>
							<Link href="/p2p-merchant">
								<a className="flex text-left py-3 px-3 border-b border-neutral-100 text-neutral-500 hover:text-blue-dark text-small">
									Post new ads
								</a>
							</Link>
							<Link href="/p2p-merchant/ads-management">
								<a className="flex text-left py-3 px-3 border-b border-neutral-100 text-neutral-500 hover:text-blue-dark text-small">
									My ads
								</a>
							</Link>
						</div>
					</div>
				</div>
				<div className="flex justify-between mt-3 sm:mt-6 sm:mr-3">
					<div className="flex sm:px-6 flex-wrap items-center gap-2.5">
						<div className="grid">
							<div
								onClick={() => setShowFiatOptions(!showFiatOptions)}
								className="h-9 cursor-pointer flex gap-2 pl-1 pr-1.5 items-center flex-nowrap border rounded border-gray-250 "
							>
								<Image
									src={"/images/test/ltc.png"}
									alt={"rocket"}
									height={20}
									width={20}
								/>
								<span className="font-medium text-small text-neutral-500 sm:mr-2">
									{"Fiat"}
								</span>
								<span>
									<CaretDownFilledMedium />
								</span>
							</div>
							{showFiatOptions && (
								<div className="absolute mt-10 bg-white shadow-gray py-5 rounded">
									<div className="overflow-y-scroll h-52 mt-2">
										{coinOptions.map((coin) => (
											<div
												key={coin.value}
												className="p-2 rounded mx-2 flex gap-3 items-center cursor-pointer hover:bg-primary-100"
												onClick={() => {
													setShowFiatOptions(false);
												}}
											>
												<Image
													src={coin.image ? coin.image : ""}
													alt={"coin-img"}
													height={20}
													width={20}
												/>
												<h1>{coin.name}</h1>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
						<div className="grid">
							<div
								onClick={() => setShowPaymentOptions(!showPaymentOptions)}
								className="h-9 cursor-pointer flex gap-2 pl-1 pr-1.5 items-center flex-nowrap border rounded border-gray-250 "
							>
								<Image
									src={"/images/test/ltc.png"}
									alt={"rocket"}
									height={20}
									width={20}
								/>
								<span className="font-medium text-small text-neutral-500 sm:mr-2">
									{"Payment"}
								</span>
								<span>
									<CaretDownFilledMedium />
								</span>
							</div>
							{showPaymentOptions && (
								<div className="absolute mt-10 bg-white shadow-gray py-5 rounded">
									<div className="overflow-y-scroll h-52 mt-2">
										{coinOptions.map((coin) => (
											<div
												key={coin.value}
												className="p-2 rounded mx-2 flex gap-3 items-center cursor-pointer hover:bg-primary-100"
												onClick={() => {
													setShowPaymentOptions(false);
												}}
											>
												<Image
													src={coin.image ? coin.image : ""}
													alt={"coin-img"}
													height={20}
													width={20}
												/>
												<h1>{coin.name}</h1>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
					<div>
						<button
							className={`hidden sm:flex bg-white rounded border-gray-250 border justify-center items-center text-neutral-500 text-sm-regular px-2 py-1.5`}
						>
							<span className={"mr-1"}>
								<Refresh />
							</span>
							Refresh
						</button>
						<button
							className={`sm:hidden flex bg-whiteborder-0 justify-center items-center text-sm-regular py-1.5 w-5`}
						>
							<span className={""}>
								<Refresh />
							</span>
						</button>
					</div>
				</div>
				{children}
			</div>
		</div>
	);
};

export default P2PListingTable;
