/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect, useState } from "react";
import Card from "../../components/card";
import { IMarket, IMarketData, MarketCardProps } from "./model";
import { CoinPairEnum, FlowEnum } from "../../types/enum";
import {
	BnbBtc,
	BtcBtc,
	DodgeBtc,
	EthBtc,
	LtcBtc,
	PriceTrend,
} from "../../assets";
import { formatToCurrency } from "../../constants";
import { useRouter } from "next/router";

enum Style {
	TITLE = "text-xx-small lg:text-x-small text-gray-deep",
	BODY = "text-x-small lg:text-labels font-medium",
}

const MarketCard: FC<MarketCardProps> = ({ data }) => {
	const [dataSet, setDataSet] = useState<IMarketData[]>([]);
	const route = useRouter();

	useEffect(() => {
		setDataSet(presetData(data));
	}, [data]);

	const presetData = (data: IMarket): IMarketData[] => {
		const _data: IMarketData[] = [];
		for (const d in data) {
			const x = (data as any)[d];
			if (d === "topGainer") {
				x.name = "Top Gainer (24h)";
				_data.push(x);
			}

			if (d === "topLoser") {
				x.name = "Top Loser (24h)";
				_data.push(x);
			}

			if (d === "topVolume") {
				x.name = "Top Volume (24h)";
				_data.push(x);
			}

			if (d === "highlight") {
				x.name = "Highlight";
				_data.push(x);
			}
		}
		return _data;
	};

	return (
		<div
			data-testid="rg-market-card"
			className={
				"block sm:flex w-full gap-2 xl:gap-4 sm:mb-20 mb-10 market-card"
			}
		>
			{dataSet?.map((data) => (
				<div
					key={data.name}
					className={"w-full  sm:mb-0 mb-2 cursor-pointer"}
					onClick={() =>
						route.push(`/trade/${data?.coinPair.replace("/", "_")}`)
					}
				>
					<Card
						title={data.name}
						cssClass="py-2 px-4 rounded bg-white h-full card_shadow"
					>
						<div>
							<div className="flex items-center">
								<div className="flex items-center">
									{data.img ? (
										<img
											src={data.img}
											alt=""
											width={22}
											height={22}
											className="rounded-full"
										/>
									) : data.coinPair === CoinPairEnum.DOGE_BTC ? (
										<DodgeBtc />
									) : CoinPairEnum.LTC_BTC ? (
										<LtcBtc />
									) : CoinPairEnum.BNB_BTC ? (
										<BnbBtc />
									) : CoinPairEnum.BTC_BTC ? (
										<BtcBtc />
									) : (
										<EthBtc />
									)}
								</div>

								<div className="ml-1">
									<div
										className={
											"text-x-small lg:text-labels font-bold leading-5 text-lightBlue"
										}
									>
										{data.coinPair}{" "}
										<span
											className={
												data.coinPairChange.flow === FlowEnum.UP
													? "text-success"
													: "text-error-300"
											}
										>
											{data.coinPairChange.flow === FlowEnum.UP ? "+" : ""}
											{data.coinPairChange.rate?.toFixed(2)}%
										</span>
									</div>
								</div>
							</div>

							<div className={"flex items-center justify-between mt-2 mb-2"}>
								<div>
									<div>
										<p className={Style.TITLE}>Price</p>
										<p className={Style.BODY}>${data.price.amount}</p>
									</div>
									<div className={"mt-2"}>
										<p className={Style.TITLE}>Volume</p>
										<p className={Style.BODY}>
											${formatToCurrency(data.volume, 2)}
										</p>
									</div>
								</div>
								<div>
									<div>
										<p className={Style.TITLE}>24H Change</p>
										<p className={Style.BODY}>
											{data.change.flow === FlowEnum.UP ? "+" : "-"}
											{data.change.rate}%
										</p>
									</div>
									<div className={"mt-2"}>
										<p className={Style.TITLE}>Price Trend</p>
										<PriceTrend />
									</div>
								</div>
							</div>
						</div>
					</Card>
				</div>
			))}
		</div>
	);
};

export default MarketCard;
