import React, { FC } from "react";
import { StepDotState } from "./enum";
import { StepDotProps } from "./model";

const StepDot: FC<StepDotProps> = ({
	state = StepDotState.DEFAULT,
	index,
	currentIndex,
}) => {
	const setCurrentIndex = (): void => {
		currentIndex && currentIndex(index ? index : 0);
	};
	return (
		<div
			onClick={setCurrentIndex}
			className={"flex relative"}
			data-testid="rg-step-dot"
		>
			<div
				className={`rounded-full transition duration-500 ease-in-out h-3 w-3 ${state}`}
			></div>
		</div>
	);
};

export default StepDot;
