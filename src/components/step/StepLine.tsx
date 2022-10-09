import React, { FC } from "react";
import { StepLineState } from "./enum";
import { StepLineProps } from "./model";

const StepLine: FC<StepLineProps> = ({ state = StepLineState.DEFAULT }) => {
	return (
		<div
			className={`flex-auto border-t-2 transition duration-500 ease-in-out ${state}`}
			data-testid="rg-step-line"
		></div>
	);
};

export default StepLine;
