import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ChatSection from "./ChatSection";

describe("ChatSection", () => {
	it("should render correctly", () => {
		render(<ChatSection />);
		const containEl = screen.getByTestId("rg-chat-section");
		expect(containEl).toBeInTheDocument();
	});
	it("should render attention section correctly", async () => {
		render(<ChatSection />);
		const closeAttentionButtonEl = screen.getByTestId("rg-show-attention");
		expect(closeAttentionButtonEl).toBeInTheDocument();
		await act(async () => {
			await fireEvent.click(closeAttentionButtonEl);
		});
		expect(closeAttentionButtonEl).not.toBeInTheDocument();
	});
});
