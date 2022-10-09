import Button from "../button";
import { ButtonState } from "../button/enum";
import { FC } from "react";

interface StatusProps {
	heading: string;
	message: string;
	buttonText: string;
	handleClick: Function;
}

const ReviewStatus: FC<StatusProps> = ({
	heading,
	message = "Your document has been submitted successfully and" +
		" is currently under review by our team, if your details are correct, " +
		"your account should be verified within 2-7 working days.",
	buttonText = "Home",
	handleClick,
}) => {
	return (
		<div className={"bg-white py-10 px-2  text-center lg:px-72"}>
			<h3 className={"text-l-headline"}>{heading}</h3>
			<p className={"mt-3.5 mb-12 text-small"}>{message}</p>

			<Button
				variant={ButtonState.PRIMARY}
				value={buttonText}
				style={{ width: "100%" }}
				onClick={handleClick}
			/>
		</div>
	);
};

export default ReviewStatus;
