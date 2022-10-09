import { render, screen, fireEvent } from "@testing-library/react";
import MobileIdentitySwitch from "./MobileIdentitySwitch";

describe("MobileIdentitySwitch", () => {
	it("render correctly", () => {
		render(
			<MobileIdentitySwitch
				setShowMore={() => {}}
				setShowCurrent={() => {}}
				showMore={false}
				setActiveTab={() => {}}
				activeTab={"Basic"}
			/>
		);
		expect(screen.getByText("Profile Verification")).toBeInTheDocument();
	});

	it("basic button should be active", () => {
		render(
			<MobileIdentitySwitch
				setShowMore={() => {}}
				setShowCurrent={() => {}}
				showMore={false}
				setActiveTab={() => {}}
				activeTab={"basic"}
			/>
		);
		const basicEl = screen.getByTestId("basic");
		expect(basicEl.classList).toContain("bg-primary-400");
	});

	it("verified button should be active", () => {
		render(
			<MobileIdentitySwitch
				setShowMore={() => {}}
				setShowCurrent={() => {}}
				showMore={false}
				setActiveTab={() => {}}
				activeTab={"verified"}
			/>
		);
		const basicEl = screen.getByTestId("basic");
		const varifiedEl = screen.getByTestId("verified");
		expect(basicEl?.classList).toContain("text-primary-500");
		expect(varifiedEl.classList).toContain("bg-primary-400");
	});

	it("buttons should be clickable", () => {
		const setShowMore = jest.fn();
		const setShowCurrent = jest.fn();
		const setActiveTab = jest.fn();
		render(
			<MobileIdentitySwitch
				setShowMore={setShowMore}
				setShowCurrent={setShowCurrent}
				showMore={false}
				setActiveTab={setActiveTab}
				activeTab={"basic"}
			/>
		);

		const showMoreButtonEl = screen.getByTestId("show-more-button");
		fireEvent.click(showMoreButtonEl);
		expect(setShowMore).toHaveBeenCalledTimes(1);
	});

	it("basic profile button tab should be clickable", () => {
		const setShowMore = jest.fn();
		const setShowCurrent = jest.fn();
		const setActiveTab = jest.fn();
		render(
			<MobileIdentitySwitch
				setShowMore={setShowMore}
				setShowCurrent={setShowCurrent}
				showMore={false}
				setActiveTab={setActiveTab}
				activeTab={"basic"}
			/>
		);

		const basicButtonEl = screen.getByTestId("basic");
		fireEvent.click(basicButtonEl);
		expect(setActiveTab).toHaveBeenCalledTimes(1);
	});

	it("verified button should be clickable", () => {
		const setShowMore = jest.fn();
		const setShowCurrent = jest.fn();
		const setActiveTab = jest.fn();
		render(
			<MobileIdentitySwitch
				setShowMore={setShowMore}
				setShowCurrent={setShowCurrent}
				showMore={false}
				setActiveTab={setActiveTab}
				activeTab={"verified"}
			/>
		);

		const verifiedButtonEl = screen.getByTestId("verified");
		fireEvent.click(verifiedButtonEl);
		expect(setActiveTab).toHaveBeenCalledTimes(1);
	});
});
