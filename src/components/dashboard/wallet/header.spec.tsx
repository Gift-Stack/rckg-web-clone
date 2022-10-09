import { render, screen } from "@testing-library/react";
import WalletHeader from "./header";
import Button from "./../../button";
import { ButtonSize, ButtonState } from "./../../button/enum";
import customRender from "../../../../__mocks__/customRender";

const options = [
	{ title: "Overview", uri: "/wallet/overview" },
	{ title: "Spot Account", uri: "/wallet/spot-account" },
	{ title: "P2P", uri: "/wallet/p2p" },
];

describe("WalletHeader", () => {
	it("renders Wallet Header for balance details properly", async () => {
		customRender(
			<WalletHeader
				options={options}
				pathname={"overview"}
				btcBalance="134,004"
			/>,
			{
				dashboard: { showTotalBalance: true },
			}
		);
		const details = await screen.getByTestId("rg-wallet-header");
		expect(details.className).toContain("balance__details");
		expect(details.textContent).toContain("134,004");
	});
	it("renders Wallet Header for balance details properly", async () => {
		customRender(<WalletHeader options={options} pathname={"overview"} />, {
			dashboard: { showTotalBalance: false },
		});
		const details = await screen.getByTestId("rg-wallet-header");
		expect(details.className).toContain("balance__details");
		expect(details.textContent).toContain("xxxxxxxxx");
	});
	it("renders Wallet Header with buttons", async () => {
		customRender(
			<WalletHeader
				pathname={"p2p"}
				options={options}
				button1={
					<Button
						variant={ButtonState.PRIMARYALT}
						size={ButtonSize.sm}
						value="P2P Trading"
						onClick={() => {}}
					/>
				}
				button2={
					<Button
						variant={ButtonState.OUTLINEALT}
						size={ButtonSize.sm}
						value="Send"
						onClick={() => {}}
					/>
				}
				button3={
					<Button
						variant={ButtonState.OUTLINEALT}
						size={ButtonSize.sm}
						value="Receive"
						onClick={() => {}}
					/>
				}
			/>,
			{
				dashboard: { showTotalBalance: false },
			}
		);
		const details = await screen.getByTestId("rg-wallet-header");
		expect(details.className).toContain("balance__details");

		const HeaderButtons = await screen.getAllByTestId("rg-button");
		expect(HeaderButtons.length).toBe(3);
	});
});
