import {
	_formatCreditCardNumber,
	_formatCVC,
	_formatExpirationDate,
} from "./cc-formatter";

describe("CCFormatter", () => {
	const masterCard = "5412121212121212";
	const visaCard = "4412121212121212";
	const amexCard = "341212121212121";
	const discoverCard = "6512121212121212";
	const unknown = "1212121212121212";
	it("should format MASTERCARD cardNumber correctly", () => {
		const formattedCardNumber = _formatCreditCardNumber(masterCard);
		expect(formattedCardNumber.cardIssuer).toBe("MASTERCARD");
		expect(formattedCardNumber.formattedValue).toBe("5412 1212 1212 1212");
	});
	it("should format VISACARD cardNumber correctly", () => {
		const formattedCardNumber = _formatCreditCardNumber(visaCard);
		expect(formattedCardNumber.cardIssuer).toBe("VISA");
		expect(formattedCardNumber.formattedValue).toBe("4412 1212 1212 1212");
	});
	it("should format AMEX cardNumber correctly", () => {
		const formattedCardNumber = _formatCreditCardNumber(amexCard);
		expect(formattedCardNumber.cardIssuer).toBe("AMEX");
		expect(formattedCardNumber.formattedValue).toBe("3412 121212 12121");
	});
	it("should format DISCOVER cardNumber correctly", () => {
		const formattedCardNumber = _formatCreditCardNumber(discoverCard);
		expect(formattedCardNumber.cardIssuer).toBe("DISCOVER");
		expect(formattedCardNumber.formattedValue).toBe("6512 1212 1212 1212");
	});
	it("should return UNKNOWN when not a valid card issuer", () => {
		const formattedCardNumber = _formatCreditCardNumber(unknown);
		expect(formattedCardNumber.cardIssuer).toBe("UNKNOWN");
		expect(formattedCardNumber.formattedValue).toBe("1212 1212 1212 1212");
	});
});

describe("formatCVV", () => {
	it("should format AMEX CVV correctly", () => {
		const formattedCVV = _formatCVC("1212", "AMEX");
		expect(formattedCVV).toBe("1212");
	});
	it("should format MASTERCARD, VISACARD and DISCOVER correctly", () => {
		const formattedCVV = _formatCVC("1212", "DISCOVER");
		expect(formattedCVV).toBe("121");
	});
	it("should format  VISACARD correctly", () => {
		const formattedCVV = _formatCVC("121", "VISA");
		expect(formattedCVV).toBe("121");
	});
	it("should format MASTERCARD correctly", () => {
		const formattedCVV = _formatCVC("1212", "MASTERCARD");
		expect(formattedCVV).toBe("121");
	});
});

describe("formatExpiresAt", () => {
	it("should format expiresAt correctly", () => {
		const formattedExpiresAt = _formatExpirationDate("1212");
		expect(formattedExpiresAt).toBe("12/12");
	});
});
