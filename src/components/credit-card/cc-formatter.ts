export type CardType = "VISA" | "MASTERCARD" | "DISCOVER" | "AMEX" | "UNKNOWN";

const getCardIssuer = (cardNumber: string): CardType => {
	let cardIssuer: CardType = "UNKNOWN";

	if (cardNumber.startsWith("4")) {
		cardIssuer = "VISA";
	} else if (cardNumber.startsWith("5")) {
		const re = /^5[1-5]/;
		if (re.test(cardNumber)) {
			cardIssuer = "MASTERCARD";
		}
	} else if (cardNumber.startsWith("6")) {
		const re = /^(6011|65)/;
		if (re.test(cardNumber)) {
			cardIssuer = "DISCOVER";
		}
	} else if (cardNumber.startsWith("3")) {
		const re = /^(34|37)/;
		if (re.test(cardNumber)) {
			cardIssuer = "AMEX";
		}
	}
	return cardIssuer;
};

const getSanitizedValue = (value = "") => {
	return value.replace(/\D+/g, "");
};

export function _formatCreditCardNumber(value: string): {
	formattedValue: string;
	cardIssuer: CardType;
} {
	if (!value) {
		return { formattedValue: "", cardIssuer: "UNKNOWN" };
	}

	const issuer: CardType = getCardIssuer(value);
	const sanitizedsValue = getSanitizedValue(value);
	let nextValue;

	switch (issuer) {
		case "AMEX":
			nextValue = `${sanitizedsValue.slice(0, 4)} ${sanitizedsValue.slice(
				4,
				10
			)} ${sanitizedsValue.slice(10, 15)}`;
			break;
		case "MASTERCARD":
		case "VISA":
		case "DISCOVER":
			nextValue = `${sanitizedsValue.slice(0, 4)} ${sanitizedsValue.slice(
				4,
				8
			)} ${sanitizedsValue.slice(8, 12)} ${sanitizedsValue.slice(12, 16)}`;
			break;
		default:
			nextValue = `${sanitizedsValue.slice(0, 4)} ${sanitizedsValue.slice(
				4,
				8
			)} ${sanitizedsValue.slice(8, 12)} ${sanitizedsValue.slice(12, 19)}`;
			break;
	}

	return {
		formattedValue: nextValue.trim(),
		cardIssuer: issuer,
	};
}

export function _formatCVC(value: string, cardType: CardType) {
	const sanitizedsValue = getSanitizedValue(value);
	const maxLength = cardType === "AMEX" ? 4 : 3;
	return sanitizedsValue.slice(0, maxLength);
}

export function _formatExpirationDate(value: string) {
	const sanitizedsValue = getSanitizedValue(value);
	if (sanitizedsValue.length >= 3) {
		return `${sanitizedsValue.slice(0, 2)}/${sanitizedsValue.slice(2, 4)}`;
	}
	return sanitizedsValue;
}
