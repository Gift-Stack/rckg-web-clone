import {
	findByTestId,
	fireEvent,
	getByTestId,
	render,
	screen,
} from "@testing-library/react";
import SettingsCard from "./SettingsCard";
import { CheckMarkGreen } from "./../../assets";

const handleClick = jest.fn();

describe("SettingsCard", () => {
	it("should render correctly", () => {
		render(
			<SettingsCard
				title={"title"}
				description={"description"}
				icon={<CheckMarkGreen />}
				button={<button>Button</button>}
				text={<div>text</div>}
			/>
		);
		expect(screen.getByText("title")).toBeInTheDocument();
		expect(screen.getByText("description")).toBeInTheDocument();
		expect(screen.getByText("Button")).toBeInTheDocument();
		expect(screen.getByText("text")).toBeInTheDocument();
	});

	it("it should show border bottom", () => {
		render(
			<SettingsCard
				title={"title"}
				description={"description"}
				icon={<CheckMarkGreen />}
				button={<button>Button</button>}
				text={<div>text</div>}
				fullBorderBottom
			/>
		);
		const wrapperEl = screen.getByTestId("wrapper");
		expect(wrapperEl.classList).toContain("border-primary-100");
		expect(wrapperEl.classList).toContain("border-b");
	});
	it("should hide unset button", async () => {
		render(
			<SettingsCard
				title={"title"}
				description={"description"}
				icon={<CheckMarkGreen />}
				button={
					<button data-testid={"settings_card-btn"} onClick={handleClick}>
						Button
					</button>
				}
				text={<div>text</div>}
				fullBorderBottom
				borderTop
			/>
		);
		const wrapperEl = screen.getByTestId("wrapper");
		const btn = await screen.findByTestId("settings_card-btn");
		expect(wrapperEl.classList).toContain("border-primary-100");
		expect(wrapperEl.classList).toContain("border-t");
		fireEvent.click(btn);
		expect(handleClick).toHaveBeenCalled();
	});
});
