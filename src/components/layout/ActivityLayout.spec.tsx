import { render, screen } from "@testing-library/react";
import { ActivityLayout } from "./ActivityLayout";
import customRender from "../../../__mocks__/customRender";

describe("Activity Layout", () => {
	it("renders Properly", async () => {
		customRender(
			<ActivityLayout
				description={"Activity Layout test"}
				title={"Activities - Rocket global"}
				keywords={"Data, btc ,crypto"}
			>
				<div>Hello</div>
			</ActivityLayout>,
			{}
		);
		const container = screen.getByTestId("rg-activity-layout");
		expect(container.children.length).toEqual(2);
		expect(container).toBeInTheDocument();
	});
});
