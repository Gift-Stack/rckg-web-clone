import { getDateTime } from "../../../constants";
import React, { FC } from "react";
import { LoggedInDevicesUIProps } from "./model";

const LoggedInDevicesUI: FC<LoggedInDevicesUIProps> = ({
	device,
	date,
	address,
	underline,
}) => {
	return (
		<div
			data-testid="rg-loggedInDevicesUI"
			className={`${"py-3"} ${underline ? "border-b  border-neutral-100" : ""}`}
		>
			<div className={"flex justify-between"}>
				<div
					className={"text-neutral-400 text-labels sm:text-small font-medium"}
				>
					{device}
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

export default LoggedInDevicesUI;
