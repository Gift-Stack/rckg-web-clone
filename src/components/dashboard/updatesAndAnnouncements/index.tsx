import Card from "../../card";
import React, { FC } from "react";
import { UpdateProps } from "./model";
import { NoTransaction } from "../../../assets";
import UpdatesAndAnnouncementsUI from "./UpdatesAndAnnouncementsUI";

const UpdatesAndAnnouncements: FC<UpdateProps> = ({ updates }) => {
	return (
		<div data-testid="rg-updatesAndAnnouncements" className={"m-2 lg:w-2/5"}>
			<Card
				title={"Updates and Announcements"}
				cssClass={"p-5 rounded bg-white h-full"}
			>
				<>
					{updates && updates.length >= 1 ? (
						updates.map((update, index) => (
							<UpdatesAndAnnouncementsUI
								key={update?.id}
								message={update?.message}
								date={update?.date}
								underline={index !== updates.length - 1}
							/>
						))
					) : (
						<div
							className={
								"w-full h-full flex flex-col items-center justify-center"
							}
						>
							<NoTransaction />
							<div className={"text-neutral-200 text-sm-headline py-2"}>
								No Update or Annoucement yet
							</div>
						</div>
					)}
				</>
			</Card>
		</div>
	);
};

export default UpdatesAndAnnouncements;
