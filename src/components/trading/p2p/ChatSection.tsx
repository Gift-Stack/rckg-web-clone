import { CancelOutlineBlue } from "../../../assets";
import React, { useState } from "react";
import ChatInput from "./ChatInput";
import ChatItem from "./ChatItem";

export default function ChatSection() {
	const [showAttention, setShowAttention] = useState(true);
	return (
		<div
			data-testid={"rg-chat-section"}
			className="rounded border border-neutral-60 flex-shrink-0 px-4 py-7"
		>
			<div className=" max-h-96 overflow-y-scroll">
				{showAttention && (
					<div className="relative p-2 px-8 mb-6 border border-primary-300 bg-primary-400 bg-opacity-10 rounded-sm text-primary-400">
						<span className="font-bold">ATTENTION!</span> Do not release crypto
						before confirming that money has arrived in your Bank account. DO
						NOT trust anyone that asks you to release crypto before payment.
						<div
							className="absolute top-4 right-4 cursor-pointer"
							onClick={() => setShowAttention(false)}
							data-testid={"rg-show-attention"}
						>
							<CancelOutlineBlue />
						</div>
					</div>
				)}
				<p className="text-center mb-5">2021-09-12 14:56</p>
				<ChatItem
					text={`Hello, I have just made payment to you. The screenshot is below.`}
					isSeller
				/>
				<ChatItem
					text={`Hello, I have just made payment to you. The screenshot is below.`}
				/>
				<ChatItem
					text={`Hello, I have just made payment to you. The screenshot is below.`}
					isSeller
				/>
				<ChatItem
					text={`Hello, I have just made payment to you. The screenshot is below.`}
				/>
				<ChatItem
					text={`Hello, I have just made payment to you. The screenshot is below.`}
					isSeller
				/>
				<ChatItem
					text={`Hello, I have just made payment to you. The screenshot is below.`}
				/>
			</div>
			<ChatInput />
		</div>
	);
}
