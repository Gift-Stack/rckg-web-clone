import {
	act,
	fireEvent,
	getByText,
	render,
	screen,
} from "@testing-library/react";
import Card from ".";
import { ActionState } from "./enum";
import { Actions, Tags } from "./model";

const actions: Actions[] = [
	{
		name: "Deposit",
		isActive: true,
	},
	{
		name: "Widthdraw",
		isActive: false,
	},
];

const tags: Tags[] = [
	{
		name: "Spot",
		isActive: true,
	},
	{
		name: "P2P",
		isActive: false,
	},
];

describe("Card", () => {
	it("renders Card Properly", async () => {
		const handleActionFn = jest.fn();
		const handleTag = jest.fn();
		render(
			<Card
				actions={actions}
				tags={tags}
				title="My Card"
				cssClass="p-5 rounded bg-white h-full"
				handleAction={handleActionFn}
				handleTag={handleTag}
			>
				<div>My Content</div>
			</Card>
		);
		const card = await screen.getByTestId("rg-card");
		expect(card.className).toContain("rounded");
		expect(card.className).toContain("p-5");
		expect(card.className).toContain("bg-white");
		expect(card.className).toContain("h-full");
		expect(card.textContent).toContain("My Card");
		expect(card.textContent).toContain("My Content");
		expect(card.children.length).toEqual(3);
		expect(card.innerHTML).toContain(ActionState.PRIMARY);
		expect(card.innerHTML).toContain(ActionState.SECONDARY);
	});

	it("confirm Card contain 3 elements if actions are not supplied", async () => {
		const handleActionFn = jest.fn();
		const handleTag = jest.fn();
		render(
			<Card
				tags={tags}
				title="My Card"
				cssClass="p-5 rounded bg-white h-full"
				handleAction={handleActionFn}
				handleTag={handleTag}
			>
				<div>My Content</div>
			</Card>
		);
		const card = await screen.getByTestId("rg-card");
		expect(card.children.length).toEqual(3);
	});

	it("confirm Card contain 2 elements if tags are not supplied", async () => {
		const handleActionFn = jest.fn();
		const handleTag = jest.fn();
		render(
			<Card
				actions={actions}
				title="My Card"
				cssClass="p-5 rounded bg-white h-full"
				handleAction={handleActionFn}
				handleTag={handleTag}
			>
				<div>My Content</div>
			</Card>
		);
		const card = await screen.getByTestId("rg-card");
		const action = await screen.getAllByTestId("rg-action");
		expect(card.children.length).toEqual(2);
		expect(action.length).toBe(2);
	});

	it("renders Card with the tap, tags and title prop", async () => {
		const handleActionFn = jest.fn();
		const handleTag = jest.fn();
		render(
			<Card
				title="My Title"
				tags={tags}
				action="View All"
				cssClass="p-5 rounded bg-white h-full"
				handleAction={handleActionFn}
				handleTag={handleTag}
			>
				<div>My Content</div>
			</Card>
		);
		const card = await screen.getByTestId("rg-card");
		const tag = await screen.getAllByTestId("rg-tag");
		const tap = await screen.getByTestId("rg-tap");
		expect(card.textContent).toContain("My Title");
		expect(card.textContent).toContain("View All");
		expect(tag.length).toBe(2);
		expect(card.innerHTML).toContain(tap.innerHTML);
	});

	it("renders Card with only title prop", async () => {
		const handleActionFn = jest.fn();
		const handleTag = jest.fn();
		const handleTap = jest.fn();
		render(
			<Card
				title="My Title"
				cssClass="p-5 rounded bg-white h-full"
				handleAction={handleActionFn}
				handleTag={handleTag}
				handleTap={handleTap}
			>
				<div>My Content</div>
			</Card>
		);
		const card = await screen.getByTestId("rg-card");
		expect(card.textContent).toContain("My Title");
	});

	it("renders Card with only children and cssClass prop", async () => {
		render(
			<Card cssClass="p-5 rounded bg-white h-full">
				<div>My Children</div>
			</Card>
		);
		const card = await screen.getByTestId("rg-card");
		expect(card.textContent).toContain("My Children");
	});

	it("can click handleAction and handleTag on Card", async () => {
		const handleAction = jest.fn();
		const handleTag = jest.fn();

		render(
			<Card
				actions={actions}
				tags={tags}
				title="My Title"
				cssClass="p-5 rounded bg-white h-full"
				handleAction={handleAction}
				handleTag={handleTag}
			>
				<div>My Content</div>
			</Card>
		);

		const action = await screen.getAllByTestId("rg-action");
		const tag = await screen.getAllByTestId("rg-tag");
		act(() => {
			fireEvent.click(action[0]);
			fireEvent.click(tag[0]);
		});
		expect(handleAction).toHaveBeenCalled();
		expect(handleTag).toHaveBeenCalled();
	});

	it("display custom titleCss", async () => {
		const handleTap = jest.fn();

		render(
			<Card
				tags={tags}
				action={"View All"}
				title="My Title"
				cssClass="p-5 rounded bg-white h-full"
				handleTap={handleTap}
			>
				<div>My Content</div>
			</Card>
		);

		const tap = await screen.getByTestId("rg-tap");
		act(() => {
			fireEvent.click(tap);
		});
		expect(handleTap).toHaveBeenCalled();
	});

	it("can click handleTap Card", async () => {
		render(
			<Card
				tags={tags}
				action={"View All"}
				title="My Title"
				cssClass="p-5 rounded bg-white h-full"
				titleCss={"text-white text-sm-headline font-medium"}
			>
				<div>My Content</div>
			</Card>
		);

		const title = await screen.getByText("My Title");
		expect(title.className).toContain("text-sm-headline");
	});
});
