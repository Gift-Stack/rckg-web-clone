import React, { FC } from "react";
import { ActionState } from "./enum";

export interface ActionProps {
	actionClick: (value: string) => void;
	value: string;
	variant?: ActionState;
	[key: string]: any;
}

const Action: FC<ActionProps> = ({
	actionClick,
	value,
	variant = ActionState.PRIMARY,
	...props
}) => {
	const handleClick = (value: any) => {
		actionClick(value);
	};
	return (
		<button
			data-testid="rg-action"
			className={`${variant} py-2 px-4 m-1`}
			type={"button"}
			{...props}
			onClick={() => handleClick(value)}
		>
			{value}
		</button>
	);
};

export default Action;
