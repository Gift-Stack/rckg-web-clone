import { FileAttachment, ChatSend } from "../../../assets";
import React from "react";

export default function ChatInput() {
	return (
		<div
			data-testid={"rg-chat-input-container"}
			className="flex items-center gap-5 mt-12 rounded"
		>
			<input
				data-testid={"rg-chat-input"}
				placeholder="Write a message ..."
				className="w-full px-2.5 h-8 placeholder-gray-500 outline-none border border-neutral-200 rounded "
			/>
			<div className="cursor-pointer">
				<FileAttachment />
			</div>
			<div className="cursor-pointer">
				<ChatSend />
			</div>
		</div>
	);
}
