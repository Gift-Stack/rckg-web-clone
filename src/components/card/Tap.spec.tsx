import { fireEvent, render, screen } from "@testing-library/react";
import { ArrowForward } from "../../assets";
import Tap from "./Tap";

describe("Tap", () => {
	it("renders Tag Properly", async () => {
		const mockTapClick = jest.fn();
		render(<Tap value={"View all"} tapClick={mockTapClick} />);
		const tap = await screen.getByTestId("rg-tap");
		expect(tap.textContent).toEqual("View all");
		expect(tap.getAttribute("type")).toEqual("button");
	});

	it("Tap should call tapClick props when clicked", async () => {
		const tapClick = jest.fn();
		render(<Tap value={"View all"} tapClick={tapClick} />);
		const tap = await screen.getByTestId("rg-tap");
		fireEvent.click(tap);
		expect(tapClick).toHaveBeenCalled();
	});

	it("icon in Tap should be a react component", async () => {
		const tapClick = jest.fn();
		render(
			<Tap value={"View all"} tapClick={tapClick} icon={<ArrowForward />} />
		);
		const tap = await screen.getByTestId("rg-tap");
		expect(tap).toBeInTheDocument();
	});
});
