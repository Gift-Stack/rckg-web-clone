import { act, fireEvent, render, screen } from "@testing-library/react";
import { CancelEye } from "../../../assets";
import AccountDetailsUI from "./AccountDetailsUI";

const options = [
	{ title: "Overview", uri: "/wallet/overview" },
	{ title: "Spot Account", uri: "/wallet/spot-account" },
	{ title: "P2P", uri: "/wallet/p2p" },
];

describe("BalanceDetailsUI", () => {
	it("renders BalanceDetailsUI for balance details properly", async () => {
		document.addEventListener("DOMContentLoaded", async function () {
			const hanleClick = jest.fn();
			render(
				<AccountDetailsUI
					pathname={"p2p"}
					options={options}
					icon={<CancelEye />}
					value={"Hide Balance"}
					showTotalBalance={true}
					onClick={hanleClick}
				/>
			);
			const details = await screen.getByTestId("rg-account-details");
			const balance = await screen.getByTestId("rg-account-visibility");
			act(() => {
				fireEvent.click(balance);
			});
			expect(hanleClick).toHaveBeenCalled();

			let select = await screen.getAllByTestId("rg-account-details-option");
			expect(select.length).toBe(3);
			expect((select[0] as HTMLOptionElement).selected).toBeTruthy();
			expect((select[1] as HTMLOptionElement).selected).toBeFalsy();
			expect((select[2] as HTMLOptionElement).selected).toBeFalsy();
		});
	});
});
