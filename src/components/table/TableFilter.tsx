import React, { FC } from "react";
import { TableFilterState } from "./enum";
import { TableFilterProps } from "./model";

const TableFilter: FC<TableFilterProps> = ({
	actionClick,
	value,
	variant = TableFilterState.PRIMARY,
	...props
}) => {
	const handleClick = (value: string) => {
		actionClick(value);
	};
	return (
		<button
			data-testid="rg-table-filter"
			className={`${variant} py-0.5 px-2.5 m-1`}
			type={"button"}
			{...props}
			onClick={() => handleClick(value)}
		>
			{value}
		</button>
	);
};

export default TableFilter;
