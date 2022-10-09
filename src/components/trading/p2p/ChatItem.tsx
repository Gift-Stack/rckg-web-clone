import React from "react";

interface Props {
	isSeller?: boolean;
	text: string;
}

export default function ChatItem({ isSeller, text }: Props) {
	return (
		<div
			data-testid={"rg-chat-item-container"}
			className={`flex mb-5 rounded w-full ${
				isSeller ? " justify-start" : "justify-end"
			}`}
		>
			<div
				className={`rounded bg-opacity-30 ${
					isSeller ? "bg-neutral-350" : "bg-gray-80"
				}`}
				data-testid={"rg-chat-item-wrapper"}
			>
				<p data-testid={"rg-chat-item-text"} className="px-2.5 py-2 w-64">
					{text}
				</p>
			</div>
		</div>
	);
}
