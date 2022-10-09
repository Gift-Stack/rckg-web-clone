import { generateActions } from "../../utils";

export const FETCH_WITHDRAWAL_CRYPTO_HISTORY = generateActions(
	"FETCH_WITHDRAWAL_CRYPTO_HISTORY"
);

export const FETCH_CRYPTO_WITHDRAWAL_TRANSACTION_FEE = generateActions(
	"FETCH_CRYPTO_WITHDRAWAL_TRANSACTION_FEE"
);

export const FETCH_CRYPTO_WITHDRAWAL_OTP = generateActions(
	"FETCH_CRYPTO_WITHDRAWAL_OTP"
);

export const POST_CRYPTO_WITHDRAWAL = generateActions("POST_CRYPTO_WITHDRAWAL");
