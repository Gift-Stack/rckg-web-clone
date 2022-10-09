import React, { useState } from "react";
import { CaretDown } from "./../../assets";

interface TradeTypeSelectInputProps {
	onChange: (value: string) => void;
	options: string[];
	title: "From" | "To" | string;
	placeholder?: string;
	value: string;
	inputError?: string;
}
export default function TradeTypeSelectInput({
	title,
	onChange,
	placeholder,
	value,
	inputError,
	options,
}: TradeTypeSelectInputProps) {
	const [showOptions, setShowOptions] = useState(false);

	return (
		<div
			data-testid={"crypto-select-input"}
			className="crypto-input-select crypto-input-wrapper relative"
		>
			<h3
				data-testid={"crypto-select-input-title"}
				className="text-neutral-400 font-semibold mb-3 "
			>
				{title}
			</h3>
			<div
				onClick={() => setShowOptions(!showOptions)}
				className="h-12  cursor-pointer px-4 bg-gray-200 rounded flex items-center flex-nowrap"
			>
				<div
					className="font w-full outline-none bg-transparent flex-1"
					placeholder={placeholder}
					data-testid="amount-input-field"
				>
					{value}
				</div>
				<div className="flex items-center flex-nowrap">
					<CaretDown />
				</div>
			</div>
			{showOptions && (
				<div className="shadow-gray-100 rounded h-12 w-full absolute -bottom-12 bg-white border-gray-200 border flex px-4 items-center">
					{options.map(
						(item: string) =>
							item !== value && (
								<p
									key={item}
									onClick={() => {
										setShowOptions(false);
										onChange(item);
									}}
									className="text-sm-regular w-full cursor-pointer text-neutral-400 font-semibold"
								>
									{item}
								</p>
							)
					)}
				</div>
			)}
			{inputError && (
				<p className="text-error-main mt-2 text-labels">{inputError}</p>
			)}
		</div>
	);
}
