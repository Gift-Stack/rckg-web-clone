import { render, screen, fireEvent, act } from "@testing-library/react";
import { ICryptoSwapFeeData } from "redux/reducers/transactions.reducer";
import { ICryptoSwap } from "../model";
import SwapCrypto from "./SwapCrypto";

const cyptoSwapFee: ICryptoSwapFeeData = {
	minRequiredBalance: 0.00001,
	price: "0.00001",
	slippage: "0.00001",
};

const cryptoSwap: ICryptoSwap = {
	swapId: 0.001,
};

describe("SwapCrypto", () => {
	it("should render correctly ", () => {
		const setPayload = jest.fn();
		const performSwap = jest.fn();
		render(
			<SwapCrypto
				allCoins={[]}
				variousAssetsBalance={[]}
				setPayload={setPayload}
				cyptoSwapFee={cyptoSwapFee}
				performSwap={performSwap}
				cryptoSwap={cryptoSwap}
			/>
		);
		expect(screen.getByText("From")).toBeInTheDocument();
		expect(screen.getByText("To")).toBeInTheDocument();
	});
});
