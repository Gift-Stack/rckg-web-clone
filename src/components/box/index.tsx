import React, { FC } from "react";
import { BoxFillState, BoxOutlineState } from "./enum";

interface BoxProps {
	fill?: BoxFillState;
	outline?: BoxOutlineState;
	height?: string;
	width?: string;
}

const Box: FC<BoxProps> = ({
	fill = BoxFillState.NONE,
	outline = BoxOutlineState.TERTIARY,
	height = "h-2",
	width = "w-2",
	...props
}) => {
	return (
		<div
			data-testid="rg-box"
			className={`${fill} ${outline} ${height} ${width}`}
			{...props}
		></div>
	);
};

export default Box;
