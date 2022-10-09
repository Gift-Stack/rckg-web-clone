import Card from "../../card";
import { Tags } from "../../card/model";
import React, { FC, useEffect, useState } from "react";
import ActivityUI from "./ActivityUI";
import LoggedInDevicesUI from "./LoggedInDevices";
import { LoginTrackerProps } from "./model";
import { useRouter } from "next/router";

const LoginTracker: FC<LoginTrackerProps> = ({
	activities,
	devices,
	cardTags,
}) => {
	const [tags, setTags] = useState<Tags[]>([]);
	const [view, setView] = useState<string>("Activity");
	const router = useRouter();

	useEffect(() => {
		setTags(cardTags);
	}, [cardTags]);

	const filterTags = (value: string) => {
		const tags_ = tags.map((tag) => {
			return {
				name: tag.name,
				isActive: tag.name === value ? true : false,
			};
		});
		setView(value);
		setTags(tags_);
	};

	const handleFeedback = (value: string) => {
		if (value) {
			router.push("/profile/login-activities").then();
		}
	};

	return (
		<div data-testid="rg-login-tracker" className={"m-2 lg:w-1/2"}>
			<Card
				action={"View all"}
				tags={tags}
				title="Login Tracker"
				cssClass="p-5 rounded bg-white h-full"
				handleTag={(value) => filterTags(value)}
				handleTap={(value) => handleFeedback(value)}
			>
				<>
					{view === "Activity" ? (
						<>
							{activities &&
								activities.length >= 1 &&
								activities.map((activity, index) => (
									<ActivityUI
										key={activity?.id}
										activity={activity?.activity}
										date={activity?.date}
										address={activity?.address}
										underline={index !== activities?.length - 1}
									/>
								))}
						</>
					) : (
						<>
							{devices &&
								devices.length >= 1 &&
								devices.map((device, index) => (
									<LoggedInDevicesUI
										key={device.id}
										device={device.device}
										date={device.date}
										address={device.address}
										underline={index !== activities.length - 1}
									/>
								))}
						</>
					)}
				</>
			</Card>
		</div>
	);
};

export default LoginTracker;
