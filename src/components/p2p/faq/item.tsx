import React, { FC } from "react";
import { FAQItemProps } from "./model";

const P2PFAQItem: FC<FAQItemProps> = ({ data }) => {
	return (
		<div
			data-testid="rg-P2PFAQItem"
			className="bg-lightBlueBG p-4 mb-4 rounded-lg"
			style={{ breakInside: "avoid" }}
		>
			<div
				data-testid="rg-P2PFAQItem-question"
				className="font-semibold text-sm-heading mb-5 max-w-sm"
			>
				{data.question}
			</div>
			<div
				data-testid="rg-P2PFAQItem-answer"
				className="font-normal text-sm-heading"
			>
				{data.answer}
			</div>
		</div>
	);
};

export default P2PFAQItem;
