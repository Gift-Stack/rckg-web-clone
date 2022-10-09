import Box from "../../box";
import React, { FC } from "react";
import { LabelProps } from "./model";

const Label: FC<LabelProps> = ({ fill, outline, currency, amount }) => {
	return (
		<div
			data-testid="rg-labelUI"
			className={"w-36 flex items-center justify-between"}
		>
			<div className={"flex items-center"}>
				<Box fill={fill} outline={outline} />
				<span className={"pl-2 xl:text-small text-labels"}>{currency}</span>
			</div>
			<p className={"text-neutral-300 xl:text-small text-labels"}>{amount}</p>
		</div>
	);
};

export default Label;
