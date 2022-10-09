import { StepDotState, StepLineState } from "./enum";

export interface StepProps {
	index: number;
	stepLength: number;
	stepDotDefaultState: StepDotState;
	stepDotActiveState: StepDotState;
	stepLineDefaultState: StepLineState;
	stepLineActiveState: StepLineState;
	setStepLengthPercentage: (percentage: number) => void;
}

export interface StepDotProps {
	state?: StepDotState;
	index: number;
	currentIndex: (index: number) => void;
}

export interface StepLineProps {
	state?: StepLineState;
}
