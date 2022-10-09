import React, { FC, ReactElement, useState } from "react";
import { StepProps } from "./model";
import StepDot from "./StepDot";
import StepLine from "./StepLine";

const Step: FC<StepProps> = ({
	stepLength,
	stepDotDefaultState,
	stepDotActiveState,
	stepLineDefaultState,
	stepLineActiveState,
	setStepLengthPercentage,
	index,
}) => {
	// const [index, setIndex] = useState<number>(3);

	const setCurrentIndex = (index: number): void => {
		// setIndex(index);
		setStepLengthPercentage((index / (stepLength - 1)) * 100);
	};

	const setStep = (): ReactElement[] => {
		const steps: ReactElement[] = [];
		for (let i = 0; i < stepLength; i++) {
			if (i !== stepLength - 1) {
				if (i === 0) {
					steps.push(
						<React.Fragment key={i}>
							<StepDot
								index={i}
								currentIndex={(index: number) => setCurrentIndex(index)}
								state={index >= i ? stepDotActiveState : stepDotDefaultState}
							/>
							<StepLine
								state={index > i ? stepLineActiveState : stepLineDefaultState}
							/>
						</React.Fragment>
					);
				} else {
					steps.push(
						<React.Fragment key={i}>
							<StepDot
								index={i}
								currentIndex={(index: number) => setCurrentIndex(index)}
								state={index >= i ? stepDotActiveState : stepDotDefaultState}
							/>
							<StepLine
								state={index > i ? stepLineActiveState : stepLineDefaultState}
							/>
						</React.Fragment>
					);
				}
			} else {
				steps.push(
					<React.Fragment key={i}>
						<StepDot
							index={i}
							currentIndex={(index: number) => setCurrentIndex(index)}
							state={index >= i ? stepDotActiveState : stepDotDefaultState}
						/>
					</React.Fragment>
				);
			}
		}
		return steps;
	};
	return (
		<div className="py-5" data-testid="rg-step-container">
			<div className="">
				<div className="flex items-center" data-testid="rg-step">
					{stepLength > 1 ? setStep() : ""}
				</div>
			</div>
		</div>
	);
};

export default Step;
