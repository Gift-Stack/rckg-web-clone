import {
	DoubleCircleBlue,
	SingleCircleGray,
	DividerBlue,
	DividerGreen,
} from "./../../../assets";
import React from "react";
import { PaymentOptionsTypes } from "./BuyCryptoPaymentMethods";

interface P2PPaymentOptionProps {
	selectedMethod: PaymentOptionsTypes;
	setSelectedMethod: (value: PaymentOptionsTypes) => void;
	title: "Bank Transfer" | "Mobile Money";
	cryptoAmount: number;
	cryptoName: string;
}
export default function P2PPaymentOption({
	selectedMethod,
	setSelectedMethod,
	title,
	cryptoAmount,
	cryptoName,
}: P2PPaymentOptionProps) {
	return (
		<div
			data-testid={"p2p-payment-option"}
			className="flex justify-between w-full bg-white sm:bg-gray-200 rounded px-3 h-16 py-0.5 items-center"
		>
			<div className="flex items-center">
				<div className="cursor-pointer mr-6">
					{selectedMethod.toLowerCase().includes(title.toLowerCase()) ? (
						<DoubleCircleBlue />
					) : (
						<div
							data-testid={"p2p-payment-option-select-button"}
							onClick={() => setSelectedMethod(title)}
						>
							<SingleCircleGray />
						</div>
					)}
				</div>
				{title === "Bank Transfer" && <DividerBlue />}
				{title === "Mobile Money" && <DividerGreen />}
				<p
					data-testid={"payment-option-title"}
					className="ml-4 font-monsarrat font-medium text-sm-regular text-neutral-400"
				>
					{title}
				</p>
			</div>
			<p
				data-testid={"crypto-amount"}
				className="font-semibold text-sm-regular text-neutral-400"
			>
				{cryptoAmount} {cryptoName}
			</p>
		</div>
	);
}
