/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { Switch } from "./index";

const switchItems = [
	{ text: "Email Address", value: "email" },
	{ text: " Mobile Number", value: "phone" },
];
const mock = jest.fn();

describe("Switch", () => {
	it("renders Switch Properly", async () => {
		const mockHandleSwitchFn = jest.fn();
		render(
			<Switch
				active={"email"}
				switchItem={switchItems}
				handleSwitch={mockHandleSwitchFn}
			/>
		);

		const value_one = screen.getByText("Email Address");
		const value_two = screen.getByText("Mobile Number");
		expect(value_one).toBeInTheDocument();
		expect(value_two).toBeInTheDocument();
	});

	it("Switch component function click works", async () => {
		const switchContainer = render(
			<Switch handleSwitch={mock} switchItem={switchItems} active={"email"} />
		);

		for (let i = 0; i < switchItems.length; i++) {
			const switchItem = await switchContainer.findByTestId(`switch-${i}`);
			switchItem.click();
			expect(switchItem).toBeInTheDocument();
			expect(mock).toHaveBeenCalled();
		}
	});
});
