import {
	DoubleCircleBlue,
	SingleCircleGray,
	CreditCardBlueBg,
	InfoNeutral,
} from "./../../../assets";
import React from "react";
import { PaymentOptionsTypes } from "./BuyCryptoPaymentMethods";

interface CreditCardPaymentOptionProps {
	selectedMethod: PaymentOptionsTypes;
	setSelectedMethod: (value: PaymentOptionsTypes) => void;
	cryptoAmount: number;
	cryptoName: string;
}
export default function CreditCardPaymentOption({
	selectedMethod,
	setSelectedMethod,
	cryptoAmount,
	cryptoName,
}: CreditCardPaymentOptionProps) {
	return (
		<div data-testid={"credit-card-payment-option"} className="w-full">
			<div className="flex items-center mb-2.5">
				<h2 className="font-semibold text-neutral-400 text-sm-headline mr-2">
					Fait
				</h2>
				<div className="cursor-pointer">
					<InfoNeutral />
				</div>
			</div>
			<div className="flex justify-between w-full bg-white sm:bg-gray-200 rounded px-3 h-16 py-0.5 items-center">
				<div className="flex items-center">
					<div className="cursor-pointer mr-5">
						{selectedMethod.toLowerCase().includes("fiat") ? (
							<DoubleCircleBlue />
						) : (
							<div
								data-testid={"select-credit-payment-option"}
								onClick={() => setSelectedMethod("Fiat")}
							>
								<SingleCircleGray />
							</div>
						)}
					</div>
					<CreditCardBlueBg />
					<p
						data-testid={"payment-option-title"}
						className="ml-4 font-monsarrat font-medium text-sm-regular text-neutral-400"
					>
						Visa / Mastercard
					</p>
				</div>
				<p
					data-testid={"crypto-amount"}
					className="font-semibold text-sm-regular text-neutral-400"
				>
					{cryptoAmount} {cryptoName}
				</p>
			</div>
		</div>
	);
}
