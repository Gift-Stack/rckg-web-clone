import { useGlobalContext } from "context/global.context";
import { useTradeContext } from "context/trade.context";
import React from "react";

interface IProps {
	quotes: any;
	enable: boolean;
}
export default function SpotTradeDebugger({ quotes, enable }: IProps) {
	const { authorized, wallet } = useGlobalContext();
	const { spotDetails, stepSize, setSpotDetails, loading, setLoading } =
		useTradeContext();
	return (
		<>
			{enable && (
				<div>
					<div>
						<small className="break-all">quotes {JSON.stringify(quotes)}</small>
						<br /> <hr />
						<div>
							<small>base coin: {spotDetails.baseCoin}</small> <br /> <hr />
							<small>quote coin: {spotDetails.quoteCoin}</small> <br /> <hr />
							<small>price {spotDetails.price}</small> <br /> <hr />
							<small>
								quote step size {JSON.stringify(spotDetails, undefined, 10)}
							</small>{" "}
							<br /> <hr />
							<small>base step size {stepSize.baseStepSize}</small> <br />{" "}
							<hr />
							<small>
								base Coin USDT COnversion Rate ({spotDetails.baseCoin}):{" "}
								{spotDetails.baseCoinUSDTRate}
							</small>
							<br /> <hr />
							<small>
								quote Coin USDT COnversion Rate ({spotDetails.quoteCoin}):{" "}
								{spotDetails.quoteCoinUSDTRate}
							</small>{" "}
							<br /> <hr />
							<small className="break-all">
								Wallet {JSON.stringify(wallet)}
							</small>
							<br /> <hr />
						</div>
					</div>
				</div>
			)}
		</>
	);
}
