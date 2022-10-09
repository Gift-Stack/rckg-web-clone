import { render, screen } from "@testing-library/react";
import P2PLinks from "./index";

describe("P2P Links", () => {
	it("renders component", async () => {
		render(<P2PLinks />);
		expect(screen.getByTestId("p2p-merchant-links").children.length).toBe(2);
		expect(screen.getByTestId("p2p-merchant-links")).toBeInTheDocument();
	});
	it("First child of parent should have 3 children", async () => {
		render(<P2PLinks />);
		expect(
			screen.getByTestId("p2p-merchant-links").children[0].children.length
		).toBe(3);
	});
	it("Second child of parent should have 3 children", async () => {
		render(<P2PLinks />);
		expect(
			screen.getByTestId("p2p-merchant-links").children[1].children.length
		).toBe(3);
	});
});
