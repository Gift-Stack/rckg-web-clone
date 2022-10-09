import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import AssetsButton from "./AssetsButton";
import { AssetsButtonSize, AssetsButtonState } from "./enum";

describe("AssetsButton", () => {
	it("renders properly", async () => {
		const onClick = jest.fn();
		render(<AssetsButton onClick={onClick} />);

		const btn = screen.getByTestId("rg-assets-button");
		act(() => {
			fireEvent.click(btn);
		});
		expect(btn).toBeInTheDocument();
		expect(onClick).toHaveBeenCalled();
		expect(btn.className).toContain(
			`${AssetsButtonState.PRIMARY} ${AssetsButtonSize.sm}`
		);
		expect(btn.innerHTML).toContain("Click Me");
	});

	it("contains all the props passed", async () => {
		const onClick = jest.fn();
		render(
			<AssetsButton
				onClick={onClick}
				value={"Deposit"}
				variant={AssetsButtonState.SECONDARY}
				size={AssetsButtonSize.xs}
			/>
		);

		const btn = screen.getByTestId("rg-assets-button");
		act(() => {
			fireEvent.click(btn);
		});
		expect(btn).toBeInTheDocument();
		expect(onClick).toHaveBeenCalled();
		expect(btn.className).toContain(
			`${AssetsButtonState.SECONDARY} ${AssetsButtonSize.xs}`
		);
		expect(btn.innerHTML).toContain("Deposit");
	});
});
