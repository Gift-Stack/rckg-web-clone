import { render, screen } from "@testing-library/react";
import AccountCard from "./AccountCard";
import Button from "../../button";
import { ButtonState, ButtonSize } from "../../button/enum";

describe("AccountCard", () => {
	it("renders Account Card for balance details properly", async () => {
		document.addEventListener("DOMContentLoaded", async function () {
			render(
				<AccountCard
					title={"Spot Account"}
					btc={0.00005}
					button1={
						<Button
							variant={ButtonState.OUTLINE}
							size={ButtonSize.sm}
							value="Buy"
							onClick={() => {}}
							style={{ width: "6rem" }}
						/>
					}
					button2={
						<Button
							variant={ButtonState.OUTLINE}
							size={ButtonSize.sm}
							value="Sell"
							onClick={() => {}}
							style={{ width: "6rem" }}
						/>
					}
					button3={
						<Button
							variant={ButtonState.OUTLINE}
							size={ButtonSize.sm}
							value="Transfer"
							onClick={() => {}}
							style={{ width: "6rem" }}
						/>
					}
				/>
			);
			const details = await screen.getByTestId("rg-subaccount-details");
			expect(details.innerHTML).toContain("Spot Account");
		});
	});
});
