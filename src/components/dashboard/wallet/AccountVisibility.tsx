import React, { FC } from "react";
import { AccountVisibilityProps } from "./model";

const AccountVisibility: FC<AccountVisibilityProps> = ({
	value,
	icon,
	onClick,
	...props
}) => {
	return (
		<button
			data-testid="rg-account-visibility"
			className={
				"bg-transparent text-x-small text-white ml-2  px-2 flex items-center"
			}
			{...props}
			onClick={onClick}
		>
			{icon}
			{value}
		</button>
	);
};

export default AccountVisibility;
