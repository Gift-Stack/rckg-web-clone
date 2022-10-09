import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { TransactionTabState } from "./enum";
import TransactionTab from "./TransactionTab";

describe("TransactionTab", () => {
	it("renders properly", async () => {
		const onTab = jest.fn();
		render(
			<TransactionTab
				variant={TransactionTabState.SECONDARY}
				value={"Recommended"}
				type={"button"}
				tabClick={() => onTab("Recommended")}
			/>
		);

		const tab = screen.getByTestId("rg-transaction-tab");
		act(() => {
			fireEvent.click(tab);
		});
		expect(tab).toBeInTheDocument();
		expect(tab.className).toContain(TransactionTabState.SECONDARY);
		expect(onTab).toHaveBeenCalled();
	});

	it("renders default variant prop", async () => {
		const onTab = jest.fn();
		render(
			<TransactionTab
				value={"Recommended"}
				type={"button"}
				tabClick={() => onTab("Recommended")}
			/>
		);

		const tab = screen.getByTestId("rg-transaction-tab");
		expect(tab.className).toContain(TransactionTabState.PRIMARY);
	});
});
