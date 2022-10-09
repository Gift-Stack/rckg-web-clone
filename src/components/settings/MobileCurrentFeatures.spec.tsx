import { fireEvent, render, screen } from "@testing-library/react";
import MobileCurrentFeatures from "./MobileCurrentFeatures";
describe("MobileMobileCurrentFeatures", () => {
	it("should render correctly", () => {
		render(
			<MobileCurrentFeatures
				setShowCurrent={() => {}}
				showCurrent={true}
				features={[]}
			/>
		);
		expect(screen.getByText("Profile Verification")).toBeInTheDocument();
	});
	it("close icon button should be clickable", () => {
		const setShowCurrent = jest.fn();
		render(
			<MobileCurrentFeatures
				setShowCurrent={setShowCurrent}
				showCurrent={true}
				features={[]}
			/>
		);
		const closeIconButtonEl = screen.getByTestId("rg-current-icon-button");
		fireEvent.click(closeIconButtonEl);
		expect(setShowCurrent).toHaveBeenCalledTimes(1);
	});
	it("close  button should be clickable", () => {
		const setShowCurrent = jest.fn();
		render(
			<MobileCurrentFeatures
				setShowCurrent={setShowCurrent}
				showCurrent={true}
				features={[]}
			/>
		);
		const closeIconButtonEl = screen.getByTestId("rg-current-icon-button");
		fireEvent.click(closeIconButtonEl);
		expect(setShowCurrent).toHaveBeenCalledTimes(1);
	});
});
