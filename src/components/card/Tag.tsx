import React, { FC } from "react";
import { TagState } from "./enum";

export interface TagProps {
	tagClick: (value: string) => void;
	value: string;
	variant?: TagState;
	[key: string]: any;
}

const Tag: FC<TagProps> = ({
	tagClick,
	value,
	variant = TagState.PRIMARY,
	...props
}) => {
	const handleClick = (value: string) => {
		tagClick(value);
	};
	return (
		<button
			data-testid="rg-tag"
			className={`${variant} py-1.5 px-2 m-1`}
			type={"button"}
			{...props}
			onClick={() => handleClick(value)}
		>
			{value}
		</button>
	);
};

export default Tag;
