import { render, screen } from "@testing-library/react";
import { NavBackIcon } from "../../assets";
import NavBack from ".";

describe("NavBack", () => {
	it("renders NavBack Properly", async () => {
		render(<NavBack name={"Back to Home"} icon={<NavBackIcon />} />);
		const navBack = await screen.findByTestId("rg-nav-back");
		const navBackButton = await screen.findByTestId("rg-nav-back-button");
		expect(navBack.children.length).toBe(1);
		expect(navBackButton.className).toContain(
			"sm:py-5 sm:px-8 lg:px-20 flex sm:gap-4 md:text-sm-headline lg:text-md-headline xl:text-headline font-medium items-center"
		);
		expect(navBackButton.innerHTML).toContain("Back to Home");
	});

	it("NavBack should have default value", async () => {
		render(<NavBack />);
		const navBack = await screen.findByTestId("rg-nav-back");
		const navBackButton = await screen.findByTestId("rg-nav-back-button");
		expect(navBack.children.length).toBe(1);
		expect(navBackButton.className).toContain(
			"sm:py-5 sm:px-8 lg:px-20 flex sm:gap-4 md:text-sm-headline lg:text-md-headline xl:text-headline font-medium items-center"
		);
		expect(navBackButton.innerHTML).toContain("Back to Dashboard");
	});
});
