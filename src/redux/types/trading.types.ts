import { generateActions } from "../../utils";

export const SYMBOLS = generateActions("SYMBOLS");
export const SPOT_OPEN_ORDERS = generateActions("SPOT_OPEN_ORDERS");
export const SPOT_TRADE_HISTORY = generateActions("SPOT_TRADE_HISTORY");

export const SPOT_TRADING_DETAILS = "SPOT_TRADING_DETAILS";
export const SPOT_TRADING_DETAILS_PRICE = "SPOT_TRADING_DETAILS_PRICE";
