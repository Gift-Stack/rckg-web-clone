import { ccValidation } from "./cc-validation";

describe("CCValidation", () => {
	const masterCard = "5412121212121212";
	const visaCard = "4444444444444444";
	const amexCard = "341212121212121";
	const discoverCard = "6512121212121212";
	const unknown = "1212121212121212";
	it("should validate correctly", () => {
		const validation = ccValidation({
			cardName: "tests",
			cardNumber: masterCard,
			cvv: "123",
			expiresAt: "1212",
			cardType: "MASTERCARD",
		});
	});
});
