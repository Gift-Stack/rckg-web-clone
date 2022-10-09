import React, { FC, ReactElement } from "react";

export interface TapProps {
	value: string;
	tapClick: (value: string) => void;
	icon?: ReactElement;
}

const Tap: FC<TapProps> = ({ value, tapClick, icon, ...props }) => {
	const handleClick = (value: string) => {
		tapClick(value);
	};
	return (
		<button
			data-testid="rg-tap"
			className={`bg-transparent rounded-sm flex justify-center items-center text-primary-400 font-normal sm:text-sm-regular my-1 py-1 m-1`}
			{...props}
			onClick={() => handleClick(value)}
			type={"button"}
		>
			<span className={"pr-1 font-bold text-labels sm:text-small"}>
				{value}
			</span>
			{icon && icon}
		</button>
	);
};

export default Tap;
