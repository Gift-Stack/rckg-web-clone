import React from "react";

const TradeInput = ({
	label,
	availablePrice,
	availablePriceCurrency,
	convertedPrice,
	convertedPriceCurrency,
	placeholder,
	name,
	type,
	...props
}: any) => {
	return (
		<div data-testid="trade-input" {...props}>
			<div className={"text-labels flex justify-between w-full px-1 pb-1"}>
				<small className={"text-gray-700"}>{label}</small>
			</div>

			<div className="relative flex w-full flex-wrap items-stretch mb-3">
				<input
					type={type}
					{...props}
					name={name}
					placeholder={placeholder}
					className="px-3 py-2 placeholder-gray-700 placeholder-text-labels text-neutral-400 relative bg-gray-800 rounded text-labels border-0 shadow outline-none focus:outline-none w-full pr-4 trade_input"
					data-testid="trade-input-input"
				/>
			</div>
		</div>
	);
};

export default TradeInput;
