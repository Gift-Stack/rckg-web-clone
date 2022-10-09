export interface FAQ {
	id?: number;
	question: string;
	answer: string;
}

export interface FAQProps {
	FAQS: FAQ[];
}
export interface FAQItemProps {
	data: FAQ;
}
