import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ChatInput from "./ChatInput";

describe("ChatInput", () => {
	it("should render correctly", () => {
		render(<ChatInput />);
		const containerEl = screen.getByTestId("rg-chat-input-container");
		expect(containerEl).toBeInTheDocument();
	});

	it("should accept inputs", async () => {
		render(<ChatInput />);
		const inputEl: any = screen.getByTestId("rg-chat-input");
		await act(async () => {
			await fireEvent.change(inputEl, { target: { value: "Hello" } });
		});
		expect(inputEl.value).toBe("Hello");
	});
});
