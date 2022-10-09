import { demicalFormatter } from "../../constants";
import { useGlobalContext } from "context/global.context";
import { useTradeContext } from "context/trade.context";
import { postSpotTrade } from "../../redux/actions/trade.action";
import { showToast } from "../../utils";
import { useEffect, useState } from "react";
import { storageService } from "../../services";

export function useSpotTrade(side: "SELL" | "BUY", type: "MARKET" | "LIMIT") {
	const { wallet, setRefreshWallet } = useGlobalContext();
	const { spotDetails, setRefreshHistory, stepSize } = useTradeContext();
	const spotPrice = spotDetails.price;
	const availableBalance =
		side === "BUY"
			? wallet[spotDetails.quoteCoin]?.free || 0
			: wallet[spotDetails.baseCoin]?.free || 0;
	const [quantity, setQuantity] = useState<any>(null);
	const [total, setTotal] = useState<any>(null);
	const [error, setError] = useState("");
	const [percent, setPercent] = useState(0);
	const [price, setPrice] = useState(0);
	const { uid } = storageService.getAuthData();
	const [loading, setLoading] = useState(false);
	const baseCoinUSDTRate = spotDetails?.baseCoinUSDTRate ?? 1;
	const quoteCoinUSDTRate = spotDetails?.quoteCoinUSDTRate ?? 1;
	const minBaseQty = demicalFormatter(11 / baseCoinUSDTRate, 5);
	const minQuoteQty = demicalFormatter(11 / quoteCoinUSDTRate, 5);

	const baseStepSize = stepSize.baseStepSize as number;
	const quoteStepSize = stepSize.quoteStepSize as number;

	useEffect(() => {
		if (spotPrice) {
			setPrice(spotPrice);
		}
	}, [spotPrice]);

	const handleSetQuantity = (e: any) => {
		setError("");
		const qty = e.target.value;
		setQuantity(qty);
		setTotal(qty <= 0 ? "" : (spotPrice * qty).toFixed(quoteStepSize));
	};

	const handleSetTotal = (e: any) => {
		setError("");
		const __total = e.target.value;
		setTotal(__total);
		setQuantity(
			__total <= 0 ? "" : (__total / spotPrice).toFixed(baseStepSize)
		);
	};

	const calcTotalFromPercentage = (__percent: number) => {
		setError("");
		setPercent(__percent);
		const __total = demicalFormatter(
			__percent === 100
				? availableBalance
				: availableBalance * (__percent / 100),
			quoteStepSize
		) as number;
		setTotal(__total);
		setQuantity(
			__total <= 0 ? "" : (__total / spotPrice).toFixed(baseStepSize)
		);
	};

	useEffect(() => {
		const per = ((availableBalance - total) / availableBalance) * 100;
	}, [total]);

	const submitTrade = async () => {
		setError("");
		if (side === "BUY" && total > availableBalance) {
			setError(
				`Insufficient bal, available ${availableBalance} ${spotDetails.quoteCoin}`
			);
			return;
		}
		if (side === "SELL" && total > availableBalance * baseCoinUSDTRate) {
			setError(
				`Insufficient bal, available ${availableBalance} ${spotDetails.baseCoin}`
			);
			return;
		}
		if (side === "BUY" && demicalFormatter(quantity, 5) < minBaseQty) {
			setError(
				`Quantity too small, min quantity allowed is ${minBaseQty} ${spotDetails.baseCoin}`
			);
			return;
		}
		if (side === "SELL" && demicalFormatter(quantity, 5) < minBaseQty) {
			setError(
				`Quantity too small, min quantity allowed is ${minBaseQty} ${spotDetails.baseCoin}`
			);
			return;
		}

		if (quantity) {
			setError("");
			setLoading(true);
			try {
				const res = await postSpotTrade(
					uid as string,
					type === "MARKET"
						? {
								symbol: `${spotDetails.baseCoin}${spotDetails.quoteCoin}`,
								side: side,
								type: "MARKET",
								quantity: demicalFormatter(Number(quantity), baseStepSize),
						  }
						: {
								symbol: `${spotDetails.baseCoin}${spotDetails.quoteCoin}`,
								side: side,
								type: "LIMIT",
								timeInForce: "GTC",
								quantity: demicalFormatter(Number(quantity), baseStepSize),
								price: Number(price),
						  }
				);

				if (res) {
					showToast("Transaction successfull", "success");
					setRefreshWallet(true);
					setRefreshHistory(true);
					setLoading(false);
					setQuantity("");
					setTotal("");
				}
			} catch (err) {
				setLoading(false);
			}
		} else {
			setError("Quantity is required");
		}
	};

	function decimalFilter(event: any, stepSize: number) {
		const reg = new RegExp(`^-?\\d*(\.\\d{0,${stepSize}})?$`);
		let input = event.target.value + String.fromCharCode(event.charCode);
		if (!reg.test(input)) {
			event.preventDefault();
		}
	}

	const percentIndexCalc = () => {
		if (percent < 25) {
			return 0;
		}
		if (percent === 25) {
			return 1;
		}
		if (percent === 50) {
			return 2;
		}
		if (percent === 75) {
			return 3;
		}
		if (percent === 100) {
			return 4;
		}
		return 0;
	};

	return {
		submitTrade,
		quantity,
		setQuantity,
		total,
		setTotal,
		setPercent,
		availableBalance,
		error,
		loading,
		handleSetQuantity,
		handleSetTotal,
		price,
		setPrice,
		decimalFilter,
		baseStepSize,
		quoteStepSize,
		percentIndexCalc,
		calcTotalFromPercentage,
	};
}
