import {
	currencyFormatter,
	hasCaps,
	hasDigit,
	hasSpecialCharacter,
} from "./constants";

describe("Constants Test", () => {
	it("hasSpecialCharacter to be falsy", () => {
		expect(hasSpecialCharacter("chuckBAss")).toBeFalsy();
	});
	it("has special character should be truthy", () => {
		expect(hasSpecialCharacter("$")).toBeTruthy();
	});
	it("has digit to be falsy", () => {
		expect(hasDigit("ABCD")).toBeFalsy();
	});
	it("has digit to be truthy", () => {
		expect(hasDigit("1ABCD")).toBeTruthy();
	});
	it("has caps to be falsy", () => {
		expect(hasCaps("abcs")).toBeFalsy();
	});
	it("has caps should be truthy", () => {
		expect(hasCaps("ABcsd")).toBeTruthy();
	});
	it("currencyFormatter", () => {
		expect(currencyFormatter("NAIRA")).toContain("₦");
	});
});
