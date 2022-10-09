import React, { FC } from "react";
import { TransactionTabState } from "./enum";
import { TransactionTabProps } from "./model";

const TransactionTab: FC<TransactionTabProps> = ({
	tabClick,
	value,
	variant = TransactionTabState.PRIMARY,
	...props
}) => {
	const handleClick = (value: string) => {
		tabClick(value);
	};
	return (
		<button
			data-testid={"rg-transaction-tab"}
			className={`${variant} py-1.5 px-2 m-1`}
			type={"button"}
			{...props}
			onClick={() => handleClick(value)}
		>
			{value}
		</button>
	);
};

export default TransactionTab;
