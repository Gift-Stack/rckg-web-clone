import { combineReducers } from "redux";
import auth from "./auth.reducer";
import dashboard from "./dashboard.reducer";
import publics from "./publics.reducer";
import analytics from "./analytics.reducer";
import modal from "./modal.reducer";
import suspense from "./suspense.reducer";
import settings from "./settings.reducer";
import cryptoTransactions from "./crypo-transactions.reducer";
import ccPayment from "./cc-payment.reducer";
import profile from "./profile.reducer";
import transactions from "./transactions.reducer";
import withdrawal from "./withdrawal.reducer";
import trade from "./trade.reducer";
import wallet from "./wallet.reducer";
import market from "./market.reducer";

const rootReducer = combineReducers({
	auth,
	dashboard,
	publics,
	analytics,
	modal,
	suspense,
	settings,
	cryptoTransactions,
	ccPayment,
	profile,
	transactions,
	withdrawal,
	trade,
	wallet,
	market,
});

export default rootReducer;
