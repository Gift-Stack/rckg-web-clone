import { render, screen } from "@testing-library/react";
import MobileSettingsCard from "./MobileSettingsCard";
import { CheckMarkGreen } from "./../../assets";

describe("MobileSettingsCard", () => {
	it("should render correctly", () => {
		render(
			<MobileSettingsCard
				title={"title"}
				description={"description"}
				icon={<CheckMarkGreen />}
				button={<button>Button</button>}
				text={<p>text</p>}
			/>
		);
		expect(screen.getByText("title")).toBeInTheDocument();
		expect(screen.getByText("description")).toBeInTheDocument();
		expect(screen.getByText("Button")).toBeInTheDocument();
		expect(screen.getByText("text")).toBeInTheDocument();
	});

	it("it should show border bottom", () => {
		render(
			<MobileSettingsCard
				title={"title"}
				description={"description"}
				icon={<CheckMarkGreen />}
				button={<button>Button</button>}
				text={<p>text</p>}
				borderBottom
			/>
		);
		const wrapperEl = screen.getByTestId("wrapper");
		expect(wrapperEl.classList).toContain("border-primary-100");
		expect(wrapperEl.classList).toContain("border-b");
	});
	it("should hide unset button", () => {
		render(
			<MobileSettingsCard
				title={"title"}
				description={"description"}
				icon={<CheckMarkGreen />}
				button={<button>Button</button>}
				text={<p>text</p>}
				borderBottom
				hideUnsetButton
			/>
		);
		const wrapperEl = screen.queryByTestId("unset");
		expect(wrapperEl).toBeNull();
	});
});
