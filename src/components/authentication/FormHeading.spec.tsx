import { render, screen } from "@testing-library/react";
import { FormHeading } from ".";
import { Eye } from "../../assets";

describe("Form Heading", () => {
	it("renders Properly", async () => {
		render(
			<FormHeading
				heading={"Hello"}
				subHeading={"Please kindly input your mail"}
				svg={<Eye />}
			/>
		);
		const container = screen.getByTestId("rg-auth-form-heading");
		expect(container.children.length).toBeLessThanOrEqual(3);
		expect(container).toBeInTheDocument();
	});
	it("Should contain an H2", async () => {
		render(
			<FormHeading
				heading={"Hello"}
				subHeading={"Please kindly input your mail"}
				svg={<Eye />}
			/>
		);
		const headingTwo = screen.getByTestId("heading-2");
		expect(headingTwo).toBeInTheDocument();
		expect(headingTwo.innerHTML).toBe("Hello");
	});
	it("Should have a sub heading", async () => {
		render(<FormHeading heading={"Hi"} subHeading={"Please kindly type hi"} />);
		const subHeading = screen.getByTestId("subheading");
		expect(subHeading).toBeInTheDocument();
		expect(subHeading.innerHTML).toBe("Please kindly type hi");
	});
	it("If svg children length should be 3", async () => {
		render(
			<FormHeading
				heading={"Hello"}
				subHeading={"Please kindly input your mail"}
				svg={<Eye />}
			/>
		);
		const container = screen.getByTestId("rg-auth-form-heading");
		expect(container.children.length).toBe(3);
	});
	it("If not svg container children length should be less than 3", async () => {
		render(
			<FormHeading
				heading={"Hello"}
				subHeading={"Please kindly input your mail"}
			/>
		);
		const container = screen.getByTestId("rg-auth-form-heading");
		expect(container.children.length).toBeLessThan(3);
	});
});
