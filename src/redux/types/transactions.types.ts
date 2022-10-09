import { generateActions } from "../../utils";

export const GET_COIN_PAIRS = generateActions("GET_COIN_PAIRS");
export const GET_COINS = generateActions("GET_COINS");
export const GET_NETWORKS = generateActions("GET_NETWORKS");
export const DEPOSIT_ADDRESS = generateActions("DEPOSIT_ADDRESS");
export const RECENT_DEPOSIT = generateActions("RECENT_DEPOSIT");
export const DEPOSIT_HISTORY = generateActions("DEPOSIT_HISTORY");
export const VARIOUS_ASSETS_BALANCE = generateActions("VARIOUS_ASSETS_BALANCE");
export const SWAP_LIST = generateActions("SWAP_LIST");
export const GET_CRYPTO_SWAP_FEE = generateActions("GET_CRYPTO_SWAP_FEE");
export const SWAP_CRYPTO = generateActions("SWAP_CRYPTO");
export const GET_DEPOSIT_WITHDRAWAL_TRANSACTION_HISTORY = generateActions(
	"GET_DEPOSIT_WITHDRAWAL_TRANSACTION_HISTORY"
);
export const GET_DEPOSIT_TRANSACTION_HISTORY = generateActions(
	"GET_DEPOSIT_TRANSACTION_HISTORY"
);
export const GET_WITHDRAWAL_TRANSACTION_HISTORY = generateActions(
	"GET_WITHDRAWAL_TRANSACTION_HISTORY"
);
export const CRYPTO_SWAP_HISTORY = generateActions("CRYPTO_SWAP_HISTORY");
