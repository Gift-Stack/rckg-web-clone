import { getDate } from "../../../constants";
import React, { FC } from "react";
import { UpdatesAndAnnouncementsUIProps } from "./model";

const UpdatesAndAnnouncementsUI: FC<UpdatesAndAnnouncementsUIProps> = ({
	message,
	date,
	underline,
}) => {
	return (
		<div
			data-testid="rg-updatesAndAnnouncementsUI"
			className={`${"py-3"} ${underline ? "border-b  border-neutral-100" : ""}`}
		>
			<div className={"text-neutral-400 text-labels sm:text-small"}>
				{message}
			</div>
			<small className={"text-neutral-200 text-x-small"}>{getDate(date)}</small>
		</div>
	);
};

export default UpdatesAndAnnouncementsUI;
