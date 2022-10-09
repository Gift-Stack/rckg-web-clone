import { screen, render } from "@testing-library/react";
import { AuthSidePanel } from ".";
import { AccountSide } from "../../assets";

describe("Auth side panel", () => {
	it("should render properly", async () => {
		render(
			<AuthSidePanel
				svg={<AccountSide />}
				heading={"Hello World"}
				paragraph={"Hello from my world"}
			/>
		);
		const container = screen.getByTestId("rg-auth-side-panel");
		expect(container.children.length).toEqual(2);
	});
});
