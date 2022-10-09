import { render, screen } from "@testing-library/react";
import WalletTopNav from "./nav";
import { Link } from "./model";

const useRouter = jest.spyOn(require("next/router"), "useRouter");
useRouter.mockImplementation(() => ({
	pathname: "/wallet",
}));

const links: Link[] = [
	{ title: "Overview", uri: "/wallet/overview" },
	{ title: "Spot Account", uri: "/wallet/spot-trading" },
	{ title: "P2P", uri: "/wallet/p2p" },
	{ title: "Transaction history", uri: "/wallet/transaction-history" },
];

describe("Dashboard Top panel", () => {
	it("should render properly", async () => {
		render(<WalletTopNav links={links} />);

		const container = screen.getByTestId("rg-wallet-topnav");
		links.map((link, index) => {
			const linkUI = screen.getByTestId(`rg-wallet-topnav-link-${index}`);
			expect(linkUI.textContent).toBe(link.title);
		});
		expect(links.length).toBe(4);
		expect(container.children.length).toEqual(1);
	});
});
