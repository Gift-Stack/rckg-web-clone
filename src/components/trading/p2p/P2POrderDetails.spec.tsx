import P2POrderDetails from "./P2POrderDetails";
import customRender from "../../../../__mocks__/customRender";
import { fireEvent, screen, act } from "@testing-library/react";

describe("P2POrderDetails", () => {
	it("should render correctly without error", () => {
		customRender(
			<P2POrderDetails
				isCancelled={false}
				hasMadePayment={false}
				handleCancel={function (): void {
					throw new Error("Function not implemented.");
				}}
				handlePayment={function (): void {
					throw new Error("Function not implemented.");
				}}
			/>,
			{}
		);
		const containerEl = screen.getByTestId("rg-order-details-container");
		expect(containerEl).toBeInTheDocument();
	});
	it("should show not cancelled items when not cancelled", () => {
		customRender(
			<>
				<P2POrderDetails
					isCancelled={false}
					hasMadePayment={false}
					handleCancel={() => {}}
					handlePayment={() => {}}
				/>
			</>,
			{}
		);
		const notCancelledEl = screen.getByTestId("rg-p2p-not-cancelled");
		expect(notCancelledEl).toBeInTheDocument();
	});
	it("should show cancelled items when cancelled", () => {
		customRender(
			<>
				<P2POrderDetails
					isCancelled={true}
					hasMadePayment={false}
					handleCancel={() => {}}
					handlePayment={() => {}}
				/>
			</>,
			{}
		);
		const cancelledEl = screen.getByTestId("rg-p2p-cancelled");
		expect(cancelledEl).toBeInTheDocument();
	});
	it("should cancel order on cancel click", async () => {
		let isCancelled = false;
		const handleCancel = jest.fn();

		customRender(
			<>
				<P2POrderDetails
					isCancelled={isCancelled}
					hasMadePayment={false}
					handleCancel={handleCancel()}
					handlePayment={() => {}}
				/>
			</>,
			{}
		);

		const cancelBtnEl = screen.getByTestId("rg-p2p-cancel-order");
		await act(async () => {
			fireEvent.click(cancelBtnEl);
			expect(cancelBtnEl).toBeInTheDocument();
			expect(handleCancel).toHaveBeenCalledTimes(1);
		});
	});
	it("should call handlePaymemt correctly", async () => {
		let isCancelled = false;
		const handlePayment = jest.fn();

		customRender(
			<>
				<P2POrderDetails
					isCancelled={isCancelled}
					hasMadePayment={false}
					handleCancel={() => {}}
					handlePayment={handlePayment()}
				/>
			</>,
			{}
		);
		const makePaymentEl = screen.getByTestId("rg-p2p-made-payment");
		await act(async () => {
			fireEvent.click(makePaymentEl);
			expect(makePaymentEl).toBeInTheDocument();
			expect(handlePayment).toHaveBeenCalledTimes(1);
		});
	});
});
