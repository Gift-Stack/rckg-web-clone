import { render, screen, fireEvent } from "@testing-library/react";
import CryptoSelectInput from "./CryptoSelectInput";
import { cryptoList } from "./crypto-list";

describe("CryptoSelectInput", () => {
	it("render properly", () => {
		render(
			<CryptoSelectInput
				onChange={function (value: number): void {}}
				searchChange={() => {}}
				title={"From"}
				cryptoList={cryptoList}
				crypto={cryptoList[0]}
				setHasCryptoInputError={() => null}
				toggle={true}
				setToggle={(bool) => null}
			/>
		);
		const cryptoSelectInputEl = screen.getByTestId("crypto-select-input");
		expect(cryptoSelectInputEl).toBeInTheDocument();
	});
	it("should call on change function when values are entered", () => {
		const onChangeSpyFn = jest.fn();
		render(
			<CryptoSelectInput
				onChange={() => onChangeSpyFn()}
				searchChange={() => {}}
				title={"From"}
				cryptoList={cryptoList}
				crypto={cryptoList[0]}
				setHasCryptoInputError={() => null}
				toggle={true}
				setToggle={(bool) => null}
			/>
		);

		const inputFieldEl = screen.getByTestId("amount-input-field");
		fireEvent.change(inputFieldEl, { target: { value: "1" } });
		fireEvent.change(inputFieldEl, { target: { value: "2" } });
		fireEvent.change(inputFieldEl, { target: { value: "3" } });
		expect(onChangeSpyFn).toHaveBeenCalledTimes(3);
	});
	it("should render title correctly", () => {
		render(
			<CryptoSelectInput
				onChange={() => {}}
				searchChange={() => {}}
				title={"From"}
				cryptoList={cryptoList}
				crypto={cryptoList[0]}
				setHasCryptoInputError={() => null}
				toggle={true}
				setToggle={(bool) => null}
			/>
		);
		expect(screen.getByText("From")).toBeInTheDocument();
	});
	it("should render search box", () => {
		render(
			<CryptoSelectInput
				onChange={() => {}}
				searchChange={() => {}}
				title={"From"}
				cryptoList={cryptoList}
				crypto={cryptoList[0]}
				setHasCryptoInputError={() => null}
				toggle={false}
				setToggle={(bool) => null}
			/>
		);
		const searchIconEl = screen.getByTestId("crypto-search-icon");
		const searchBoxEl = screen.queryByTestId("crypto-search-box");
		expect(searchBoxEl).toBeNull();
		fireEvent.click(searchIconEl);
		const displaySearchBoxEl = screen.queryByTestId("crypto-search-box");
	});
	it("should filter crypto list on search input", () => {
		render(
			<CryptoSelectInput
				onChange={() => {}}
				searchChange={() => {}}
				title={"From"}
				cryptoList={cryptoList}
				crypto={cryptoList[0]}
				setHasCryptoInputError={() => null}
				toggle={true}
				setToggle={(bool) => null}
			/>
		);
	});
	it("should render available crypto", () => {
		render(
			<CryptoSelectInput
				onChange={() => {}}
				searchChange={() => {}}
				title={"From"}
				cryptoList={cryptoList}
				crypto={cryptoList[0]}
				showAvailableCrypto={true}
				setHasCryptoInputError={() => null}
				toggle={true}
				setToggle={(bool) => null}
			/>
		);
		expect(screen.getByTestId("show-available-crypto")).toBeInTheDocument();
	});
	it("should should not render if no show showAvailableCrypto", () => {
		render(
			<CryptoSelectInput
				onChange={() => {}}
				searchChange={() => {}}
				title={"From"}
				cryptoList={cryptoList}
				crypto={cryptoList[0]}
				showAvailableCrypto={false}
				setHasCryptoInputError={() => null}
				toggle={true}
				setToggle={(bool) => null}
			/>
		);
		expect(screen.queryByTestId("show-available-crypto")).toBeNull();
	});
	it("should set crypto value to MAX button click", async () => {
		let currentValue = 0;
		render(
			<CryptoSelectInput
				onChange={(value) => (currentValue = value)}
				searchChange={() => {}}
				title={"From"}
				cryptoList={cryptoList}
				crypto={cryptoList[0]}
				showMaxButton
				setHasCryptoInputError={() => null}
				toggle={true}
				setToggle={(bool) => null}
			/>
		);
		const maxTextButtonEl = screen.getByTestId("crypto-max-text-button");
		await fireEvent.click(maxTextButtonEl);
		expect(currentValue).toBe(10);
	});
});
