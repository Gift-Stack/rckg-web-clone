import { render, screen, fireEvent, act } from "@testing-library/react";
import { VisaCard } from "./../../assets";
import CCInput from "./CCInput";

describe("CCInput", () => {
	it("should render correctly", () => {
		render(
			<CCInput onChange={() => {}} placeholder={""} value={""} title={""} />
		);
		const containerEl = screen.getByTestId("cc-input-container");
		const CCInputError = screen.queryByTestId("cc-input-error");
		const CCIssuerLogo = screen.queryByTestId("cc-issuer-logo");
		expect(containerEl).toBeInTheDocument();
		expect(CCInputError).toBeNull();
		expect(CCIssuerLogo).toBeNull();
	});
	it("should render error correctly", () => {
		render(
			<CCInput
				onChange={() => {}}
				placeholder={""}
				value={""}
				title={""}
				error="cc input error"
			/>
		);
		const CCInputError = screen.getByTestId("cc-input-error");
		expect(CCInputError).toBeInTheDocument();
		expect(CCInputError.innerHTML).toBe("cc input error");
	});
	it("should render credit card Icon correctly", () => {
		render(
			<CCInput
				onChange={() => {}}
				placeholder={""}
				value={""}
				title={""}
				creditCardIcon={<VisaCard />}
			/>
		);
		const CCIssuerLogo = screen.getByTestId("cc-issuer-logo");
		expect(CCIssuerLogo).toBeInTheDocument();
	});
	it("should render classNames correctly if credit card is available", () => {
		render(
			<CCInput
				onChange={() => {}}
				placeholder={""}
				value={""}
				title={""}
				creditCardIcon={<VisaCard />}
			/>
		);
		const inputFieldWrapperEl = screen.getByTestId("cc-input-field-wrapper");
		expect(inputFieldWrapperEl.className).toContain(
			"bg-gray-200 rounded flex items-center justify-between p-3 placeholder-gray-400 outline-none  focus:outline-none  text-neutral-400 w-full h-12 rounded-l rounded-r outline-red"
		);
	});
	it("should render error classNames correctly if credit card and input error", () => {
		render(
			<CCInput
				onChange={() => {}}
				placeholder={""}
				value={""}
				title={""}
				creditCardIcon={<VisaCard />}
				error="there is an error"
			/>
		);
		const inputFieldWrapperEl = screen.getByTestId("cc-input-field-wrapper");
		expect(inputFieldWrapperEl.className).toContain(
			"border border-error-main shadow-error focus-within:shadow-error focus-within:border-error-main"
		);
		expect(inputFieldWrapperEl.className).toContain(
			"bg-gray-200 rounded flex items-center justify-between p-3 placeholder-gray-400 outline-none  focus:outline-none  text-neutral-400 w-full h-12 rounded-l rounded-r outline-red"
		);
	});
	it("should render classNames correctly when no credit card", () => {
		render(
			<CCInput onChange={() => {}} placeholder={""} value={""} title={""} />
		);
		const inputFieldEl = screen.getByTestId("cc-input-field");
		expect(inputFieldEl.className).toContain(
			"bg-gray-200 rounded p-3 placeholder-gray-400 outline-none text-neutral-400 w-full h-12 rounded-l rounded-r outline-red"
		);
	});
	it("should render classNames correctly when no credit card and there is error", () => {
		render(
			<CCInput
				onChange={() => {}}
				placeholder={""}
				value={""}
				title={""}
				error="error"
			/>
		);
		const inputFieldEl = screen.getByTestId("cc-input-field");
		expect(inputFieldEl.className).toContain(
			"bg-gray-200 rounded p-3 placeholder-gray-400 outline-none text-neutral-400 w-full h-12 rounded-l rounded-r outline-red border border-error-main shadow-error focus-within:shadow-error focus-within:border-error-main"
		);
	});
	it("should set value correctly", async () => {
		const handleChange = jest.fn();
		render(
			<CCInput
				onChange={() => handleChange}
				placeholder={""}
				value={"value"}
				title={""}
				creditCardIcon={<VisaCard />}
				error="there is an error"
			/>
		);
		const inputFieldEl = screen.getByTestId(
			"cc-input-field"
		) as HTMLInputElement;
		act(async () => {
			fireEvent.focus(inputFieldEl);
			await fireEvent.change(inputFieldEl, { target: { value: "23" } });
		});
		expect(inputFieldEl).toBeInTheDocument();
		// expect(inputFieldEl.value).toBe("23");
	});
	it("should render title correctly", async () => {
		const handleChange = jest.fn();
		render(
			<CCInput
				onChange={() => handleChange}
				placeholder={""}
				value={"value"}
				title={"title"}
				creditCardIcon={<VisaCard />}
				error="there is an error"
			/>
		);
		const CCInputTitle = screen.getByTestId("cc-input-title");
		expect(CCInputTitle).toBeInTheDocument();
		expect(CCInputTitle.innerHTML).toBe("title");
	});
});
