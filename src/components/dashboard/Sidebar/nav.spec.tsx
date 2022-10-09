import { render, screen } from "@testing-library/react";
import DashboardTopNav from "./nav";
import {
	SideBarWallet,
	SideBarStack,
	SideBarDashboard,
	SideBarSettings,
} from "../../../assets/svg";

const useRouter = jest.spyOn(require("next/router"), "useRouter");
useRouter.mockImplementation(() => ({
	pathname: "/wallet",
}));

const links = [
	{
		title: "Dashboard",
		uri: "/dashboard",
		icon: (props: any) => <SideBarDashboard {...props} />,
	},
	{
		title: "Transactions",
		uri: "/transactions",
		icon: (props: any) => <SideBarStack {...props} />,
	},
	// {
	// 	title: "Payments",
	// 	uri: "/payments",
	// 	icon: (props: any) => <SideBarWallet {...props} />,
	// },
	{
		title: "Wallet",
		uri: "/wallet",
		icon: (props: any) => <SideBarWallet {...props} />,
	},
	{
		title: "Settings",
		uri: "/settings",
		tab: "account",
		icon: (props: any) => <SideBarSettings {...props} />,
	},
];

describe("Dashboard Top panel", () => {
	it("should render properly", async () => {
		render(<DashboardTopNav />);

		const container = screen.getByTestId("rg-dashboard-topnav");
		links.map((link, index) => {
			const linkUI = screen.getByTestId(`rg-dashboard-topnav-link-${index}`);
			expect(linkUI.textContent).toBe(link.title);
		});
		expect(links.length).toBe(4);
		expect(container.children.length).toEqual(1);
	});
});
