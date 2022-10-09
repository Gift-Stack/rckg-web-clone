import React, { FC } from "react";
import { ProgressTitleProps } from "./model";

const ProgressTitle: FC<ProgressTitleProps> = ({
	title,
	activeIndex,
	length,
}) => {
	return (
		<div
			data-testid="rg-progress-title"
			className={"flex mb-2 items-center justify-between"}
		>
			<div>
				<span
					className={
						"text-sm-headline xl:text-headline font-semibold inline-block py-1 text-neutral-400"
					}
				>
					{title}
				</span>
			</div>
			<div className={"text-right"}>
				<span
					className={
						"text-labels sm:text-sm-regular inline-block text-neutral-200"
					}
				>
					{activeIndex + 1} of {length}
				</span>
			</div>
		</div>
	);
};

export default ProgressTitle;
