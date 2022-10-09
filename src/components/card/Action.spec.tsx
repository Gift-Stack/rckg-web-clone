import { fireEvent, render, screen } from "@testing-library/react";
import Action from "./Action";
import { ActionState } from "./enum";

describe("Action", () => {
	it("renders Action Properly", async () => {
		render(
			<Action
				actionClick={() => {}}
				value={"Click Me"}
				variant={ActionState.PRIMARY}
				type={"button"}
			/>
		);
		const action = await screen.getByTestId("rg-action");
		expect(action.className).toContain(ActionState.PRIMARY);
		expect(action.innerHTML).toEqual("Click Me");
		expect(action.getAttribute("type")).toEqual("button");
	});

	it("Variant === PRIMARY", async () => {
		render(
			<Action
				actionClick={() => {}}
				variant={ActionState.PRIMARY}
				value={"Click Me"}
				type={"button"}
			/>
		);
		const action = await screen.getByTestId("rg-action");
		expect(action.className).toContain(ActionState.PRIMARY);
	});

	it("Variant === SECONDARY", async () => {
		render(
			<Action
				actionClick={() => {}}
				variant={ActionState.SECONDARY}
				value={"Click Me"}
				type={"button"}
			/>
		);
		const action = await screen.getByTestId("rg-action");
		expect(action.className).toContain(ActionState.SECONDARY);
	});

	it("Variant === TERTIARY", async () => {
		render(
			<Action
				actionClick={() => {}}
				variant={ActionState.TERTIARY}
				value={"Click Me"}
				type={"button"}
			/>
		);
		const action = await screen.getByTestId("rg-action");
		expect(action.className).toContain(ActionState.TERTIARY);
	});

	it("disabled should be truthy", async () => {
		render(<Action actionClick={() => {}} value={"TEST"} disabled={true} />);
		const action = await screen.getByTestId("rg-action");
		expect(action.getAttribute("disabled")).toBeDefined();
		expect(action).toBeDisabled();
	});

	it("Action should have a default variant", async () => {
		render(<Action actionClick={() => {}} value={"TEST"} />);
		const action = await screen.getByTestId("rg-action");
		expect(action.className).toContain(ActionState.PRIMARY);
	});

	it("Action should call actionClick props when clicked", async () => {
		const actionClick = jest.fn();
		render(<Action actionClick={actionClick} value={"TEST"} />);
		const action = await screen.getByTestId("rg-action");
		fireEvent.click(action);
		expect(actionClick).toHaveBeenCalled();
	});
});
