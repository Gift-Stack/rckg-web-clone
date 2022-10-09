import { render, screen } from "@testing-library/react";
import React from "react";
import SectionHeader from "./SectionHeader";

beforeEach(() => {
	render(
		<SectionHeader
			title="Title"
			description="Description"
			mobileTitle={"Swap"}
		/>
	);
});
describe("SectionHeader", () => {
	it("should render correctly", () => {
		const sectionHeaderEl = screen.getByTestId("section-header");
		expect(sectionHeaderEl).toBeInTheDocument();
	});
	it("should render title correctly", () => {
		expect(screen.getByText("Title")).toBeInTheDocument();
	});
	it("should render decription correctly", () => {
		expect(screen.getByText("Description")).toBeInTheDocument();
	});
});
