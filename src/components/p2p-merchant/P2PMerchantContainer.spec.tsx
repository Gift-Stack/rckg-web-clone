import { fireEvent, render, screen } from "@testing-library/react";
import P2PMerchantContainer from "./P2PMerchantContainer";

describe("Activity Layout", () => {
	it("renders Properly", async () => {
		render(
			<P2PMerchantContainer>
				<div>Hello</div>
			</P2PMerchantContainer>
		);
		const container = screen.getByTestId("p2p-merchant-container");
		expect(container.children.length).toEqual(1);
		expect(container).toBeInTheDocument();
	});
});
