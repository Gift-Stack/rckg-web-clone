import { fireEvent, render, screen } from "@testing-library/react";
import { TagState } from "./enum";
import Tag from "./Tag";

describe("Tag", () => {
	it("renders Tag Properly", async () => {
		render(
			<Tag
				tagClick={() => {}}
				value={"Click Me"}
				variant={TagState.PRIMARY}
				type={"button"}
			/>
		);
		const tag = await screen.getByTestId("rg-tag");
		expect(tag.className).toContain(TagState.PRIMARY);
		expect(tag.innerHTML).toEqual("Click Me");
		expect(tag.getAttribute("type")).toEqual("button");
	});

	it("Variant === PRIMARY", async () => {
		render(
			<Tag
				tagClick={() => {}}
				variant={TagState.PRIMARY}
				value={"Click Me"}
				type={"button"}
			/>
		);
		const tag = await screen.getByTestId("rg-tag");
		expect(tag.className).toContain(TagState.PRIMARY);
	});

	it("Variant === SECONDARY", async () => {
		render(
			<Tag
				tagClick={() => {}}
				variant={TagState.SECONDARY}
				value={"Click Me"}
				type={"button"}
			/>
		);
		const tag = await screen.getByTestId("rg-tag");
		expect(tag.className).toContain(TagState.SECONDARY);
	});

	it("Variant === TERTIARY", async () => {
		render(
			<Tag
				tagClick={() => {}}
				variant={TagState.TERTIARY}
				value={"Click Me"}
				type={"button"}
			/>
		);
		const tag = await screen.getByTestId("rg-tag");
		expect(tag.className).toContain(TagState.TERTIARY);
	});

	it("disabled should be truthy", async () => {
		render(<Tag tagClick={() => {}} value={"TEST"} disabled={true} />);
		const tag = await screen.getByTestId("rg-tag");
		expect(tag.getAttribute("disabled")).toBeDefined();
		expect(tag).toBeDisabled();
	});

	it("Tag should have a default variant", async () => {
		render(<Tag tagClick={() => {}} value={"TEST"} />);
		const tag = await screen.getByTestId("rg-tag");
		expect(tag.className).toContain(TagState.PRIMARY);
	});

	it("Tag should call tagClick props when clicked", async () => {
		const tagClick = jest.fn();
		render(<Tag tagClick={tagClick} value={"TEST"} />);
		const tag = await screen.getByTestId("rg-tag");
		fireEvent.click(tag);
		expect(tagClick).toHaveBeenCalled();
	});
});
