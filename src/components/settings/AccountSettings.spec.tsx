import { render, screen } from "@testing-library/react";
import AccountSettings from "./AccountSettings";

beforeEach(() =>
	render(<AccountSettings firstName={""} email={""} phone={""} />)
);
describe("Account Settings", () => {
	it("should render correctly", () => {
		expect(screen.getByText("Account Settings")).toBeInTheDocument();
	});
	it("should contain the text DEVICE MANAGEMENT", () => {
		expect(screen.getByText("Device Management")).toBeInTheDocument();
	});
	it("should contain the text ACCOUNT ACTIVITY", () => {
		expect(screen.getByText("Account Activity")).toBeInTheDocument();
	});
	it("username tag should not be empty", () => {
		expect(screen.getByTestId("rg-account-username")).toBeTruthy();
	});
	it("name tag should not be empty", () => {
		expect(screen.getByText("Name")).toBeInTheDocument();
	});
	it("phone number tag should not be empty", () => {
		expect(screen.getByTestId("rg-account-phone")).toBeTruthy();
	});
	it("email tag should not be empty", () => {
		expect(screen.getByText("Email")).toBeInTheDocument();
	});
});
