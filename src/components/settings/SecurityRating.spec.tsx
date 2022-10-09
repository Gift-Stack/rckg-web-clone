import { render, screen } from "@testing-library/react";
import SecurityRating from "./SecurityRating";

describe("SecurityRating", () => {
	it("should render correctly", () => {
		render(<SecurityRating rating={"WEAK"} />);
		expect(screen.getByText("Current Strength:")).toBeInTheDocument();
	});
	it("should render WEAK correctly", () => {
		render(<SecurityRating rating={"WEAK"} />);
		const tagsWrapperEl = screen.getByTestId("rating-tab");
		expect(tagsWrapperEl.children[0]).toHaveClass("bg-error-200");
		expect(tagsWrapperEl.children[1]).toHaveClass("bg-error-200");
		expect(tagsWrapperEl.children[2]).toHaveClass("bg-gray-300");
		expect(tagsWrapperEl.children[3]).toHaveClass("bg-gray-300");
		expect(tagsWrapperEl.children[4]).toHaveClass("bg-gray-300");
		expect(screen.getByTestId("rating-text").innerHTML).toBe("WEAK");
	});

	it("should render AVERAGE correctly", () => {
		render(<SecurityRating rating={"AVERAGE"} />);
		const tagsWrapperEl = screen.getByTestId("rating-tab");
		expect(tagsWrapperEl.children[0]).toHaveClass("bg-warning");
		expect(tagsWrapperEl.children[1]).toHaveClass("bg-warning");
		expect(tagsWrapperEl.children[2]).toHaveClass("bg-warning");
		expect(tagsWrapperEl.children[3]).toHaveClass("bg-gray-300");
		expect(tagsWrapperEl.children[4]).toHaveClass("bg-gray-300");
		expect(screen.getByTestId("rating-text").innerHTML).toBe("AVERAGE");
	});

	it("should render STRONG correctly", () => {
		render(<SecurityRating rating={"STRONG"} />);
		const tagsWrapperEl = screen.getByTestId("rating-tab");
		expect(tagsWrapperEl.children[0]).toHaveClass("bg-success");
		expect(tagsWrapperEl.children[1]).toHaveClass("bg-success");
		expect(tagsWrapperEl.children[2]).toHaveClass("bg-success");
		expect(tagsWrapperEl.children[3]).toHaveClass("bg-success");
		expect(tagsWrapperEl.children[4]).toHaveClass("bg-success");
		expect(screen.getByTestId("rating-text").innerHTML).toBe("STRONG");
	});
});
