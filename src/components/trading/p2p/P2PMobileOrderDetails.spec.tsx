import { render } from "@testing-library/react";
import customRender from "../../../../__mocks__/customRender";
import P2PMobileOrderDetails from "./P2PMobileOrderDetails";

describe("P2PMobileOrderDetails", () => {
	it("should render correctly", () => {
		customRender(<P2PMobileOrderDetails />, {});
	});
});
