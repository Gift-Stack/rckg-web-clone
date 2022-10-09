import {
	AmexCard,
	DiscoverCard,
	MasterCard,
	VisaCard,
	UnknownCard,
} from "./../../assets";
import Button from "./../../components/button";
import { ButtonState } from "./../../components/button/enum";
import {
	_formatCVC,
	_formatCreditCardNumber,
	_formatExpirationDate,
	CardType,
} from "./../../components/credit-card/cc-formatter";
import CCInput from "./../../components/credit-card/CCInput";
import React, { useState, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "./../../redux/actions";
import { makePayment } from "./../../redux/actions/cc-payment.action";
import { RootState } from "./../../redux/store";
import { ccValidation } from "./cc-validation";

const cardIssuerLogos: Record<CardType, ReactElement> = {
	AMEX: <AmexCard />,
	DISCOVER: <DiscoverCard />,
	VISA: <VisaCard />,
	MASTERCARD: <MasterCard />,
	UNKNOWN: <UnknownCard />,
};

interface CreditCardPaymentProps {}
export interface CardInputValidationI {
	cvv: string;
	cardName: string;
	cardNumber: string;
	expiresAt: string;
}
export default function CreditCardPayment({}: CreditCardPaymentProps) {
	const paymentDetails = useSelector(
		(state: RootState) => state.ccPayment.paymentDetails
	);
	const [cardName, setCardName] = useState<string>("");
	const [cardNumber, setCardNumber] = useState<string>("");
	const [cvv, setCvv] = useState<string>("");
	const [expiresAt, setExpiresAt] = useState<string>("");
	const [cardIssuer, setCardIssuer] = useState<CardType>("UNKNOWN");
	const [formattedCardNumber, setFormatterCardNumber] = useState<string>("");
	const [disableButton, setDisableButton] = useState<boolean>(false);
	const [cardInputError, setCardInputError] = useState<CardInputValidationI>({
		cvv: "",
		cardName: "",
		cardNumber: "",
		expiresAt: "",
	});

	const handleNameChange = (name: string) => {
		setCardInputError((prev) => ({ ...prev, cardName: "" }));
		setCardName(name);
	};

	const handleCardNumberChange = (value: string) => {
		setCardInputError((prev) => ({ ...prev, cardNumber: "" }));
		const _formatted = _formatCreditCardNumber(value);
		setFormatterCardNumber(_formatted.formattedValue);
		setCardIssuer(_formatted.cardIssuer);
		setCardNumber(_formatted.formattedValue);
	};

	let cardIssuerLogo: ReactElement = cardIssuerLogos[cardIssuer];

	const handleSetExpiresAt = (value: string) => {
		setCardInputError((prev) => ({ ...prev, expiresAt: "" }));
		setExpiresAt(_formatExpirationDate(value));
	};
	const handleCVVFormatting = (value: string) => {
		setCardInputError((prev) => ({ ...prev, cvv: "" }));
		setCvv(_formatCVC(value, cardIssuer));
	};
	const dispatch = useDispatch();

	useEffect(() => {
		const validation = ccValidation({
			cardNumber: cardNumber.split(" ").join(""),
			cardName,
			cvv: cvv,
			cardType: cardIssuer,
			expiresAt: expiresAt.split("/").join(""),
		});
		if (!validation.isError) {
			setDisableButton(false);
		}
		//eslint-disable-next-line
	}, [cardName, cardNumber, cvv, expiresAt]);

	const handleNext = () => {
		const validation = ccValidation({
			cardNumber: cardNumber.split(" ").join(""),
			cardName,
			cvv: cvv,
			cardType: cardIssuer,
			expiresAt: expiresAt.split("/").join(""),
		});
		if (validation.isError) {
			setDisableButton(true);
			setCardInputError(validation.errors);
			return;
		}
		const cardDetails = {
			cardNumber: Number(cardNumber.split(" ").join("")),
			cardName,
			mm: Number(expiresAt.split("/")[0]),
			yy: Number(expiresAt.split("/")[1]),
			cvv: Number(cvv),
		};

		dispatch(makePayment({ ...cardDetails, amount: paymentDetails.amount }));
	};

	return (
		<div data-testid={"cc-payment-container"} className="px-5 pb-16">
			<p
				data-testid={"cc-payment-subheading"}
				className="text-neutral-400 text-sm-headline mb-4 font-semibold"
			>
				Enter Card Details
			</p>
			<CCInput
				onChange={handleNameChange}
				placeholder={"Ekene Okeke"}
				value={cardName}
				title="Card Name"
				error={cardInputError.cardName}
			/>
			<CCInput
				title="Card Number"
				onChange={(number) => handleCardNumberChange(number)}
				placeholder={"1234 5678 9012 3456"}
				value={formattedCardNumber}
				creditCardIcon={cardIssuerLogo}
				error={cardInputError.cardNumber}
			/>
			<div className="grid grid-cols-2 gap-2.5">
				<CCInput
					title={"Expiry Date"}
					value={expiresAt}
					onChange={handleSetExpiresAt}
					placeholder={"mm/yy"}
					error={cardInputError.expiresAt}
				/>
				<CCInput
					title={"CVV"}
					onChange={handleCVVFormatting}
					placeholder={"123"}
					value={cvv}
					error={cardInputError.cvv}
				/>
			</div>
			<div className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-3 mt-6">
				<Button
					value="Cancel"
					width={"100%"}
					onClick={() => dispatch(hideModal())}
					variant={ButtonState.TERTIARY}
					data-testid={"cc-cancel-button"}
				/>
				<Button
					value="Next"
					width={"100%"}
					onClick={handleNext}
					disabled={disableButton}
					data-testid={"cc-next-button"}
				/>
			</div>
		</div>
	);
}
