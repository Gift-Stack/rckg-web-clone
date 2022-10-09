import React, { FC } from "react";
import P2PFAQItem from "./item";
import { FAQProps } from "./model";

const P2PFAQ: FC<FAQProps> = ({ FAQS }) => {
	return (
		<div
			data-testid="rg-P2PFAQ"
			className="block justify-center my-8 md:mx-16 lg:my-16 lg:mx-32"
		>
			<div className="grid text-center text-neutral-400 mb-16">
				<span className="font-bold text-l-headline lg:text-xxl-heading">
					Frequently Asked Questions
				</span>
				<div className="flex justify-center">
					<span className="font-medium text-sm-heading max-w-lg">
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the
					</span>
				</div>
			</div>
			<div
				className="justify-center hidden lg:block"
				style={{ columnCount: 2, columnGap: "1rem" }}
			>
				{FAQS.map((faq, index) => (
					<P2PFAQItem key={index} data={faq} />
				))}
			</div>
			<div
				className="justify-center lg:hidden"
				style={{ columnCount: 1, columnGap: "1rem" }}
			>
				{FAQS.map((faq, index) => (
					<P2PFAQItem key={index} data={faq} />
				))}
			</div>
		</div>
	);
};

export default P2PFAQ;
