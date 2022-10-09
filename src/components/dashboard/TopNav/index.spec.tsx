import { fireEvent, render, screen } from "@testing-library/react";
import TopNav from "./";
import { expect } from "@jest/globals";
import customRender from "../../../../__mocks__/customRender";

describe("Dashboard Top panel", () => {
	it("should render properly", async () => {
		customRender(<TopNav />, {});
		const container = screen.getByTestId("rg-dashboard-topnav");
		expect(container.children.length).toEqual(2);
	});

	it("navbar should be fixed", async () => {
		customRender(<TopNav fixed={true} />, {});
		const container = screen.getByTestId("rg-dashboard-topnav");
		expect(container.children[0].className).toContain("fixed top-0");
	});
	it("navbar should be fixed without the fixed property", async () => {
		customRender(<TopNav />, {});
		const container = screen.getByTestId("rg-dashboard-topnav");
		expect(container.children[0].className).toContain("fixed top-0");
	});
	it("navbar shouldn't be fixed", async () => {
		customRender(<TopNav fixed={false} />, {});
		const container = screen.getByTestId("rg-dashboard-topnav");
		expect(container.children[0].className).not.toContain("fixed top-0");
	});
	it("mobile menu should be open", async () => {
		customRender(<TopNav fixed={false} />, {});
		const container = screen.getByTestId("rg-dashboard-topnav");
		expect(container.children[0].className).not.toContain("fixed top-0");
		const hamburger = screen.getByTestId("rg-topnav-hamburger");
		fireEvent.click(hamburger);
		const mobileMenu = screen.getByTestId("rg-mobile-menu");
		expect(mobileMenu.className).not.toContain("-translate-x-full");
	});
	it("mobile menu should close", async () => {
		customRender(<TopNav fixed={false} />, {});
		const container = screen.getByTestId("rg-dashboard-topnav");
		expect(container.children[0].className).not.toContain("fixed top-0");
		const close = screen.getByTestId("rg-topnav-close-icon");
		const hamburger = screen.getByTestId("rg-topnav-hamburger");
		fireEvent.click(hamburger);
		fireEvent.click(close);
		const mobileMenu = screen.getByTestId("rg-mobile-menu");
		expect(mobileMenu.className).toContain("-translate-x-full");
	});
});
