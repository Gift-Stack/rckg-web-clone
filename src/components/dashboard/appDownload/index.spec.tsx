import { fireEvent, render, screen } from "@testing-library/react";
import { App } from "./model";
import AppDownload from ".";
import { AppIcon } from "./enum";

const stores: [App, App] = [
	{
		id: 1,
		name: "App Store",
		icon: AppIcon.APP_STORE,
		url: "https://facebook.com",
	},
	{
		id: 2,
		name: "Play Store",
		icon: AppIcon.PLAY_STORE,
		url: "https://facebook.com",
	},
];

describe("AppDownload", () => {
	it("renders AppDownload component Properly", async () => {
		const mockHandleClick = jest.fn();
		render(<AppDownload apps={stores} handleClick={mockHandleClick} />);

		const app = await screen.getByTestId("rg-app-download");
		const card = await screen.getByTestId("rg-card");
		stores.map((store, index) => {
			const storesUI = screen.getByTestId(`rg-storeUI-${index}`);
			expect(storesUI.children[1].innerHTML).toBe(store.name);
			fireEvent.click(storesUI);
		});
		expect(app.innerHTML).toContain(card.innerHTML);
		expect(stores.length).toBe(2);
		expect(mockHandleClick).toHaveBeenCalled();
	});
});
