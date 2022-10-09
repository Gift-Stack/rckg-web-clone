import { render, screen } from "@testing-library/react";
import TransactionContainer from "./TransactionContainer";

describe("TransactionContainer", () => {
	it("should render correctly", () => {
		render(
			<TransactionContainer>
				<h1>Hello world</h1>
			</TransactionContainer>
		);
		const containerEl = screen.getByTestId("transaction-container");
		expect(containerEl).toBeInTheDocument();
	});
});
