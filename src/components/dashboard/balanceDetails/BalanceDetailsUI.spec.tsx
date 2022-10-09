import { act, fireEvent, render, screen } from "@testing-library/react";
import { CurrencyEnum } from "../../../types/enum";
import { CancelEye } from "../../../assets";
import BalanceDetailsUI from "./BalanceDetailsUI";
import { Wallet } from "./model";

const wallets: Wallet[] = [
	{
		id: 1,
		currency: CurrencyEnum["USDT"],
		amount: 288.491536,
		percentage: 80,
		color: "#56BC7C",
	},
	{
		id: 2,
		currency: CurrencyEnum["BTC"],
		amount: 0.00747186,
		percentage: 10,
		color: "#FF9100",
	},
	{
		id: 3,
		currency: CurrencyEnum["ETH"],
		amount: 0.00747186,
		percentage: 10,
		color: "#F74876",
	},
];

const wallets2: Wallet[] = [];

describe("BalanceDetailsUI", () => {
	it("renders BalanceDetailsUI for balance details properly", async () => {
		document.addEventListener("DOMContentLoaded", async function () {
			const hanleClick = jest.fn();
			render(
				<BalanceDetailsUI
					icon={<CancelEye />}
					value={"Hide Balance"}
					showTotalBalance={true}
					onClick={hanleClick}
					wallets={wallets}
				/>
			);
			const details = await screen.getByTestId("rg-balance-details");
			const balance = await screen.getByTestId("rg-balance-visibility");
			const label = await screen.getAllByTestId("rg-labelUI");
			act(() => {
				fireEvent.click(balance);
			});
			expect(label.length).toBe(3);
			expect(hanleClick).toHaveBeenCalled();
			expect(details.innerHTML).toContain("Account Balance:");
		});
	});

	it("renders BalanceDetailsUI without labels", async () => {
		document.addEventListener("DOMContentLoaded", async function () {
			const hanleClick = jest.fn();
			render(
				<BalanceDetailsUI
					icon={<CancelEye />}
					value={"Hide Balance"}
					showTotalBalance={true}
					onClick={hanleClick}
					wallets={wallets2}
				/>
			);
			const label = await screen.getAllByTestId("rg-labelUI");

			expect(label.length).toBe(1);
		});
	});
});
