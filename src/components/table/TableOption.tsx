import React, { FC } from "react";
import { TableOptionState } from "./enum";
import { TableOptionProps } from "./model";

const TableOption: FC<TableOptionProps> = ({
	optionClick,
	value,
	variant = TableOptionState.PRIMARY,
	...props
}) => {
	const handleClick = (value: string) => {
		optionClick(value);
	};
	return (
		<button
			data-testid="rg-table-option"
			className={`${variant} py-1 lg:py-1.5 px-3 lg:px-4 m-1`}
			type={"button"}
			{...props}
			onClick={() => handleClick(value)}
		>
			{value}
		</button>
	);
};

export default TableOption;
