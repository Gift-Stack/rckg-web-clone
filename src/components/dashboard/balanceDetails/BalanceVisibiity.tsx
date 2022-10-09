import React, { FC } from "react";
import { BalanceVisibilityProps } from "./model";

const BalanceVisibility: FC<BalanceVisibilityProps> = ({
	value,
	icon,
	onClick,
	...props
}) => {
	return (
		<button
			data-testid="rg-balance-visibility"
			className={
				"bg-transparent text-x-small text-neutral-300 ml-2 md:border border-neutral-100 px-2 flex items-center"
			}
			{...props}
			onClick={onClick}
		>
			{icon}
			{value}
		</button>
	);
};

export default BalanceVisibility;
