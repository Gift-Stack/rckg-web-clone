import React from "react";

interface Props {
	item: string;
	value: string | React.ReactElement;
	enableBold?: boolean;
	isMobile?: boolean;
}
export default function ItemValueCard({
	item,
	value,
	enableBold,
	isMobile,
}: Props) {
	return (
		<div
			data-testid="rg-item-value-card"
			className={
				isMobile ? "w-full flex justify-between items-center flex-wrap" : ""
			}
		>
			<p
				data-testid={"rg-item-value-card-item"}
				className="text-labels text-gray-deep"
			>
				{item}
			</p>
			<p
				data-testid={"rg-item-value-card-value"}
				className={`text-neutral-400 ${
					enableBold ? "font-semibold" : "font-medium"
				}`}
			>
				{value}
			</p>
		</div>
	);
}
