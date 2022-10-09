import { render, screen } from "@testing-library/react";
import ItemValueCard from "./ItemValueCard";

describe("ItemValueCard", () => {
	it("should render correctly", () => {
		render(<ItemValueCard item={"item"} value={"value"} />);
		const containerEl = screen.getByTestId("rg-item-value-card");
		expect(containerEl).toBeInTheDocument();
	});

	it("should render values correctly", () => {
		render(<ItemValueCard item={"item"} value={"value"} />);
		const itemEl = screen.getByTestId("rg-item-value-card-item");
		const valueEl = screen.getByTestId("rg-item-value-card-value");
		expect(itemEl.innerHTML).toBe("item");
		expect(valueEl.innerHTML).toBe("value");
	});

	it("should render bold text", () => {
		render(<ItemValueCard item={"item"} value={"value"} enableBold={true} />);
		const valueEl = screen.getByTestId("rg-item-value-card-value");
		expect(valueEl.classList).toContain("font-semibold");
		screen;
	});

	it("should not render bold text", () => {
		render(<ItemValueCard item={"item"} value={"value"} />);
		const valueEl = screen.getByTestId("rg-item-value-card-value");
		expect(valueEl.classList).toContain("font-medium");
		screen;
	});

	it("should render mobile view correctly with is mobile props", () => {
		render(<ItemValueCard item={"item"} value={"value"} isMobile={true} />);
		const containerEl = screen.getByTestId("rg-item-value-card");
		expect(containerEl.className).toContain(
			"w-full flex justify-between items-center flex-wrap"
		);
	});

	it("should render mobile view correctly whwn is mobile is false", () => {
		render(<ItemValueCard item={"item"} value={"value"} isMobile={false} />);
		const containerEl = screen.getByTestId("rg-item-value-card");
		expect(containerEl.className).toContain("");
	});
});
