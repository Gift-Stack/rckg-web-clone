import { InfoNeutral } from "./../../../assets";
import Button from "./../../../components/button";
import React, { useState, useEffect } from "react";
import CreditCardPaymentOption from "./CreditCardPaymentOption";
import P2PPaymentOption from "./P2PPaymentOption";

interface BuyCryptoPaymentMethodsProps {
	showPaymentMethods: boolean;
	amount: number;
	handlePaymentContinue: (value: PaymentOptionsTypes) => void;
}

export type PaymentOptionsTypes = "Fiat" | "Bank Transfer" | "Mobile Money";

export default function BuyCryptoPaymentMethods({
	showPaymentMethods,
	amount,
	handlePaymentContinue,
}: BuyCryptoPaymentMethodsProps) {
	const [selectedMethod, setSelectedMethod] =
		useState<PaymentOptionsTypes>("Fiat");

	return (
		<div>
			{showPaymentMethods && (
				<div
					data-testid={"buy-crypto-payment-methods"}
					className="font-montserrat flex flex-col items-center"
				>
					<h1 className="font-montserrat text-headline font-medium">
						Choose Payment Method
					</h1>
					<div className="flex items-center justify-center mb-10">
						<p className="mt-2.5 mr-2 font-montserrat">Amount</p>
						<h2
							data-testid={"crypto-payment-amount"}
							className="text-headline font-semibold mt-2 font-montserrat"
						>
							${amount}
						</h2>
					</div>
					<CreditCardPaymentOption
						selectedMethod={selectedMethod}
						setSelectedMethod={(value: PaymentOptionsTypes) =>
							setSelectedMethod(value)
						}
						cryptoAmount={0.001}
						cryptoName={"LINK"}
					/>
					<div className="w-full mt-8">
						<div className="flex items-center mb-2.5">
							<h2 className="font-semibold text-neutral-400 text-sm-headline mr-2">
								P2P
							</h2>
							<div className="cursor-pointer">
								<InfoNeutral />
							</div>
						</div>
						<div className="mb-1">
							<P2PPaymentOption
								selectedMethod={selectedMethod}
								setSelectedMethod={(value: PaymentOptionsTypes) =>
									setSelectedMethod(value)
								}
								title={"Bank Transfer"}
								cryptoAmount={0.001}
								cryptoName={"LINK"}
							/>
						</div>
						<P2PPaymentOption
							selectedMethod={selectedMethod}
							setSelectedMethod={(value: PaymentOptionsTypes) =>
								setSelectedMethod(value)
							}
							title={"Mobile Money"}
							cryptoAmount={0.001}
							cryptoName={"LINK"}
						/>
					</div>
					<Button
						onClick={() => handlePaymentContinue(selectedMethod)}
						value="Continue"
						style={{ marginTop: 64, width: "100%" }}
						data-testid={"crypto-payment-button"}
					/>
				</div>
			)}
		</div>
	);
}
