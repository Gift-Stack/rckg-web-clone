import { getDateTime } from "../../../constants";
import React, { FC } from "react";
import { ActivityUIProps } from "./model";

const ActivityUI: FC<ActivityUIProps> = ({
	activity,
	date,
	address,
	underline,
}) => {
	return (
		<div
			data-testid="rg-activityUI"
			className={`${"py-3"} ${underline ? "border-b  border-neutral-100" : ""}`}
		>
			<div className={"flex justify-between"}>
				<div
					className={"text-neutral-400 text-labels sm:text-small font-medium"}
				>
					{activity}
				</div>
				<div className={"text-neutral-300 text-x-small sm:text-labels"}>
					{address}
				</div>
			</div>
			<small className={"text-neutral-200 text-x-small"}>
				{getDateTime(date)}
			</small>
		</div>
	);
};

export default ActivityUI;
