import { render, screen } from "@testing-library/react";
import ChatItem from "./ChatItem";

describe("ChatItem", () => {
	it("should render correctly", () => {
		render(<ChatItem text={"hello world"} />);
		const containerEl = screen.getByTestId("rg-chat-item-container");
		expect(containerEl).toBeInTheDocument();
	});

	it("should render chat text correctly", () => {
		render(<ChatItem text={"Hello world"} />);
		const chatText = screen.getByTestId("rg-chat-item-text");
		expect(chatText.innerHTML).toBe("Hello world");
	});

	it("should render correct class names", () => {
		render(<ChatItem text={"hello world"} isSeller />);
		const chatTextWrapperEl = screen.getByTestId("rg-chat-item-wrapper");
		expect(chatTextWrapperEl.className).toContain("bg-neutral-350");
	});

	it("should render correct class names when seller value is false", () => {
		render(<ChatItem text={"hello world"} isSeller={false} />);
		const chatTextWrapperEl = screen.getByTestId("rg-chat-item-wrapper");
		expect(chatTextWrapperEl.className).toContain("bg-gray-80");
	});
});
