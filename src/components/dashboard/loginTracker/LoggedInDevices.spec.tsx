import { render, screen } from "@testing-library/react";
import LoggedInDevicesUI from "./LoggedInDevices";

const constant = new Date("2021-11-13T04:41:20").toISOString();

describe("ActivityUI", () => {
	it("renders LoggedInDevicesUI properly", async () => {
		render(
			<LoggedInDevicesUI
				device={"Samsung S21"}
				date={""}
				address={"197.211.58.66"}
				underline={true}
			/>
		);
		const device = await screen.getByTestId("rg-loggedInDevicesUI");
		expect(device.className).toContain("border-b");
		expect(device.className).toContain("border-neutral-100");
		expect(device.children[1].innerHTML).toContain("");
		expect(device.innerHTML).toContain("197.211.58.66");
		expect(device.innerHTML).toContain("Samsung S21");
	});

	it("LoggedInDevicesUI should not be underlines", async () => {
		render(
			<LoggedInDevicesUI
				device={"Samsung S21"}
				date={constant}
				address={"197.211.58.66"}
				underline={false}
			/>
		);
		const device = await screen.getByTestId("rg-loggedInDevicesUI");
		expect(device.className).not.toContain("border-b");
		expect(device.className).not.toContain("border-neutral-100");
	});
});
