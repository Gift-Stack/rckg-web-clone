import { CardType } from "./cc-formatter";
import { CardInputValidationI } from "./CreditCardPayment";

interface CCValidationI extends CardInputValidationI {
	cardType: CardType;
}

export const ccValidation = ({
	cardName,
	cardNumber,
	cvv,
	expiresAt,
	cardType,
}: CCValidationI) => {
	let errors = {} as CCValidationI;
	if (cardName && cardName.split(" ").length < 2) {
		errors.cardName = "Incomplete card names";
	}
	if (!cardNumber) {
		errors.cardNumber = "Invalid card number";
	}

	if (cardType.toLowerCase().includes("amex") && cardNumber.length !== 19) {
		errors.cardNumber = "Invalid card number";
	}
	if (
		cardType.toLowerCase().includes("mastercard") ||
		cardType.toLowerCase().includes("discover") ||
		(cardType.toLowerCase().includes("visa") && cardNumber.length !== 16)
	) {
		errors.cardNumber = "Invalid card number";
	}
	if (cardType.toLowerCase().includes("unknown")) {
		errors.cardNumber = "Invalid card number";
	}
	if (!expiresAt) {
		errors.expiresAt = "Card expiration date is required";
	}
	if (expiresAt && expiresAt.length !== 4) {
		errors.expiresAt = "Invalid expiration date";
	}
	if (!cvv) {
		errors.cvv = "Card CVV is required";
	}
	if (cardType === "AMEX" && cvv.length !== 4) {
		errors.cvv = "Invalid CVV number";
	}
	if (!cardType.toLowerCase().includes("amex") && cvv.length !== 3) {
		errors.cvv = "Invalid CVV number";
	}
	return { errors, isError: Object.keys(errors).length };
};
