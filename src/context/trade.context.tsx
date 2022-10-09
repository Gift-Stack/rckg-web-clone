import { createContext, useContext, useEffect, useState } from "react";
import { TradeAction } from "./../redux/actions/trade.action";
import { storageService } from "./../services";
import { useGlobalContext } from "./global.context";

type ILotSize = {
	filterType: "LOT_SIZE";
	maxQty: string;
	minQty: string;
	stepSize: string;
};
interface ISpotDetails {
	baseCoin: string;
	quoteCoin: string;
	price: number;
	quotePrecision?: number;
	basePrecision?: number;
	baseCoinUSDTRate?: number;
	quoteCoinUSDTRate?: number;
}

type ContextType = {
	setSpotDetails: (v: ISpotDetails) => void;
	spotDetails: ISpotDetails;
	setPrice: (p: number) => void;
	loading: boolean;
	setLoading: (v: boolean) => void;
	onPageLoad: boolean;
	setOnPageLoad: (v: boolean) => void;
	history: any[];
	openOrderHistory: any[];
	fundHistory: any[];
	refreshHistory: boolean;
	setRefreshHistory: (v: boolean) => void;
	stepSize: {
		baseStepSize?: number;
		quoteStepSize?: number;
	};
};

const TradeContext = createContext<ContextType>({
	setSpotDetails: () => {},
	spotDetails: {
		baseCoin: "",
		quoteCoin: "",
		price: 0,
		quotePrecision: 0,
		basePrecision: 0,
		baseCoinUSDTRate: 0,
		quoteCoinUSDTRate: 0,
	},
	setPrice: () => {},
	loading: true,
	setLoading: () => {},
	onPageLoad: true,
	setOnPageLoad: () => {},
	history: [],
	openOrderHistory: [],
	fundHistory: [],
	refreshHistory: false,
	setRefreshHistory: () => {},
	stepSize: {
		baseStepSize: 0,
		quoteStepSize: 0,
	},
});

export const useTradeContext = () => useContext(TradeContext);

const TradeContextProvider: React.FC = ({ children }) => {
	const [_spotDetails, _setSpotDetails] = useState({
		baseCoin: "",
		quoteCoin: "",
		price: 0,
		quotePrecision: 0,
		basePrecision: 0,
		baseCoinUSDTRate: 0,
		quoteCoinUSDTRate: 0,
	});

	const [loading, setLoading] = useState(true);
	const [onPageLoad, setOnPageLoad] = useState(true);
	const [baseStepSize, setBaseStepSize] = useState<number>(0);
	const [quoteStepSize, setQuoteStepSize] = useState<number>(0);
	const { baseCoin, quoteCoin } = _spotDetails;
	const [fundHistory, setFundHistory] = useState<any[]>([]);
	const [refreshHistory, setRefreshHistory] = useState(false);
	const { uid, access_token } = storageService.getAuthData();
	const [history, setHistory] = useState<any[]>([]);
	const [openOrderHistory, setOpenOrderHistory] = useState<any[]>([]);

	const { wallet } = useGlobalContext();

	const setSpotDetails = (v: ISpotDetails) => {
		_setSpotDetails((prev: any) => ({ ...prev, ...v }));
	};

	const getBaseCoinPairRate = async () => {
		if (baseCoin === "USDT") {
			_setSpotDetails((prev) => ({
				...prev,
				baseCoinUSDTRate: 1,
			}));
			return;
		}
		const res =
			baseCoin &&
			(await TradeAction.getCoinPairRate(`${baseCoin.toUpperCase()}USDT`));

		_setSpotDetails((prev) => ({
			...prev,
			baseCoinUSDTRate: res?.data?.data?.price,
		}));
	};

	const getQuoteCoinPairRate = async () => {
		if (quoteCoin === "USDT") {
			_setSpotDetails((prev) => ({
				...prev,
				quoteCoinUSDTRate: 1,
			}));
			return;
		}
		const res =
			quoteCoin &&
			(await TradeAction.getCoinPairRate(`${quoteCoin.toUpperCase()}USDT`));
		_setSpotDetails((prev) => ({
			...prev,
			quoteCoinUSDTRate: res?.data?.price,
		}));
	};

	const getQuoteStepSize = async () => {
		if (quoteCoin && quoteCoin !== "USDT") {
			const res = await TradeAction.getStepSize(
				`${quoteCoin.toUpperCase()}USDT`
			);
			const ___res: ILotSize = res?.data && res?.data?.data?.values[0][17];
			setQuoteStepSize(Number(___res).toString().split(".")[1]?.length ?? 0);
		}
	};

	const getBaseStepSize = async () => {
		if (baseCoin && baseCoin !== "USDT") {
			const res = await TradeAction.getStepSize(
				`${baseCoin.toUpperCase()}USDT`
			);
			// TODO write array sample documentation
			const ___res: ILotSize = res?.data && res?.data?.data?.values[0][17];
			setBaseStepSize(Number(___res).toString().split(".")[1]?.length ?? 0);
		}
	};

	useEffect(() => {
		getBaseCoinPairRate();
		getQuoteCoinPairRate();
		getQuoteStepSize();
		getBaseStepSize();
	}, [baseCoin, quoteCoin]);

	const setPrice = (price: number) => {
		_setSpotDetails((prev) => ({ ...prev, price }));
	};

	const _getTradeHistory = async () => {
		const res = await TradeAction.getTradeHistory(uid as string);
		setHistory(res?.data.data.items);
		setRefreshHistory(false);
	};

	const _getOpenOrders = async () => {
		const res = await TradeAction.getOpenOrders(
			uid as string,
			`${quoteCoin}${baseCoin}`
		);
		setOpenOrderHistory(res?.data.data);
	};

	useEffect(() => {
		uid && access_token && _getTradeHistory();
		uid && access_token && baseCoin && quoteCoin && _getOpenOrders();
	}, [uid, baseCoin, quoteCoin, refreshHistory]);

	const getFundHistory = () => {
		const funds = [];
		for (const [key, value] of Object.entries(wallet)) {
			const itm = {
				coin: key,
				totalBalance: value?.free,
				availableBalance: value?.free,
				inOrder: value?.locked,
				btcValue: `${value?.free} USDT`,
			};
			key && value && funds.push(itm);
		}
		setFundHistory(funds);
		return;
	};

	useEffect(() => {
		getFundHistory();
	}, [Object.keys(wallet).length]);

	return (
		<TradeContext.Provider
			value={{
				spotDetails: { ..._spotDetails },
				stepSize: {
					baseStepSize,
					quoteStepSize,
				},
				setPrice,
				setSpotDetails,
				loading,
				setLoading,
				onPageLoad,
				setOnPageLoad,
				history,
				openOrderHistory,
				fundHistory,
				refreshHistory,
				setRefreshHistory,
			}}
		>
			{children}
		</TradeContext.Provider>
	);
};

export default TradeContextProvider;
