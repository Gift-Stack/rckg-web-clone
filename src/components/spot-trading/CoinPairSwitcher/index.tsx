import Card from "../../card";
import { currencyFormatter } from "../../../constants";
import React, { FC, useEffect, useState } from "react";
import { ValueState } from "./enum";
import { Coin, CoinPairSwitcherProps } from "./model";
import SwitcherTradeValue from "./SwitcherTradeValue";
import CoinPairSwitcherOption from "./CoinPairSwitcherOption";
import SkeletonLoader from "components/skeleton";
import { useTradeContext } from "context/trade.context";

const CoinPairSwitcher: FC<CoinPairSwitcherProps> = ({ coins }) => {
	const [coin, setCoin] = useState<Coin>();

	useEffect(() => {
		setCoin(coins && coins[0]);
	}, [coins]);

	const { loading, onPageLoad } = useTradeContext();
	return (
		<div
			data-testid="rg-coinpair-switcher"
			className={"coinpair__switcher mb-2 sm:mb-0"}
		>
			<Card
				cssClass={"sm:px-2 sm:px-5 py-2 rounded h-30 sm:h-14 sm:bg-lightGrey"}
			>
				<>
					<div
						className={
							"grid sm:flex gap-x-6 xl:gap-x-8 items-center hidden sm:block w-full"
						}
					>
						<div className={"flex items-center sm:my-0 my-3"}>
							<CoinPairSwitcherOption />
						</div>
						{loading || onPageLoad ? (
							<div className="flex gap-5">
								<SkeletonLoader width={100} count={1} height={30} />
								<SkeletonLoader width={100} count={1} height={30} />
								<SkeletonLoader width={100} count={1} height={30} />
								<SkeletonLoader width={100} count={1} height={30} />
								<SkeletonLoader width={100} count={1} height={30} />
							</div>
						) : (
							<div
								className={"flex items-center gap-x-4 sm:gap-x-10 container"}
							>
								<div>
									<p className={"text-green text-sm-regular font-medium"}>
										{coin && coin?.totalTradeValue}
									</p>
									<p className={"text-xx-small"}>
										{coin && currencyFormatter(coin?.coinPair.split("/")[1])}{" "}
										{coin && coin?.totalTradeValue}
									</p>
								</div>

								{coin &&
									coin.tradeValues.length >= 1 &&
									coin.tradeValues.map((trade) => (
										<SwitcherTradeValue
											key={trade.id}
											rate={trade?.rate}
											value={trade?.value}
											valueChange={trade?.valueChange}
											valueState={
												trade?.valueChange
													? ValueState.GREEN
													: ValueState.DEFAULT
											}
										/>
									))}
							</div>
						)}
					</div>

					<div className={"gap-x-6 xl:gap-x-8 items-center block sm:hidden"}>
						<div
							className={"flex justify-between items-center sm:my-0 mt-3 mb-1"}
						>
							<div className={" mr-5"}>
								<CoinPairSwitcherOption />
							</div>
							{loading || onPageLoad ? (
								<div className="flex gap-5">
									<SkeletonLoader width={100} count={1} height={30} />
									<SkeletonLoader width={100} count={1} height={30} />
								</div>
							) : (
								<>
									{coin && coin.tradeValues.length && (
										<div className={""}>
											<div className={"w-full flex gap-3"}>
												<div className={"flex justify-end"}>
													<SwitcherTradeValue
														rate={coin.tradeValues[1]?.rate}
														value={coin.tradeValues[1]?.value}
														valueChange={coin.tradeValues[1]?.valueChange}
														valueState={
															coin.tradeValues[1]?.valueChange
																? ValueState.GREEN
																: ValueState.DEFAULT
														}
													/>
												</div>
												<div className={"flex justify-end"}>
													<SwitcherTradeValue
														rate={coin.tradeValues[2]?.rate}
														value={coin.tradeValues[2]?.value}
														valueChange={coin.tradeValues[2]?.valueChange}
														valueState={
															coin.tradeValues[2]?.valueChange
																? ValueState.GREEN
																: ValueState.DEFAULT
														}
													/>
												</div>
											</div>
										</div>
									)}
								</>
							)}
						</div>

						<div>
							{loading || onPageLoad ? (
								<div className="flex gap-5">
									<SkeletonLoader width={100} count={1} height={30} />
									<SkeletonLoader width={100} count={1} height={30} />
									<SkeletonLoader width={100} count={1} height={30} />
								</div>
							) : (
								<div className={"flex items-center justify-between container"}>
									<div className={"w-1/4 pl-1"}>
										<p className={"text-green text-md-regular font-medium"}>
											{coin && coin?.totalTradeValue}
										</p>
										<p className={"text-x-small text-error-main"}>
											{coin && currencyFormatter(coin?.coinPair.split("/")[1])}{" "}
											{coin && coin?.totalTradeValue}
										</p>
									</div>
									{coin && coin.tradeValues.length && (
										<div className={""}>
											<div className={"w-full flex gap-3"}>
												<div className={"flex justify-end"}>
													<SwitcherTradeValue
														rate={coin.tradeValues[3]?.rate}
														value={coin.tradeValues[3]?.value}
														valueChange={coin.tradeValues[3]?.valueChange}
														valueState={
															coin.tradeValues[3]?.valueChange
																? ValueState.GREEN
																: ValueState.DEFAULT
														}
													/>
												</div>
												<div className={"flex justify-end"}>
													<SwitcherTradeValue
														rate={coin.tradeValues[4]?.rate}
														value={coin.tradeValues[4]?.value}
														valueChange={coin.tradeValues[4]?.valueChange}
														valueState={
															coin.tradeValues[4]?.valueChange
																? ValueState.GREEN
																: ValueState.DEFAULT
														}
													/>
												</div>
											</div>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</>
			</Card>
		</div>
	);
};

export default CoinPairSwitcher;
