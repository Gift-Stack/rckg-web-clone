import { render, screen } from "@testing-library/react";
import { Layout } from "./Layout";

describe("Default Layout", () => {
	it("renders Properly", async () => {
		render(
			<Layout
				description={"Default Layout test"}
				title={"Default Rocket global"}
				keywords={"Data, btc ,crypto"}
			>
				<div>Hello</div>
			</Layout>
		);
		const container = screen.getByTestId("rg-default-layout");
		expect(container.children.length).toEqual(1);
		expect(container).toBeInTheDocument();
	});
});
