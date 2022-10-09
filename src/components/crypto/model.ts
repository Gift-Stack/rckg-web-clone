import { ICryptoSwapFeeData } from "redux/reducers/transactions.reducer";

export interface IVariousAssetsBalance {
	asset: string;
	free: string;
	locked: string;
}

export interface SwapCryptoProps {
	allCoins: any[];
	variousAssetsBalance: IVariousAssetsBalance[];
	getSwapList: (coin: string) => void;
	swapList: string[][];
	setPayload: (payload: SwapPayload) => void;
	cyptoSwapFee?: ICryptoSwapFeeData;
	performSwap: () => void;
	cryptoSwap: ICryptoSwap;
	fromSelectToggle: boolean;
	setFromSelectToggle: (bool: boolean) => void;
	toSelectToggle: boolean;
	setToSelectToggle: (bool: boolean) => void;
}

export interface SwapPayload {
	quoteAsset: string;
	baseAsset: string;
	quoteQty: string;
}

export interface ICryptoSwap {
	swapId: number;
}
