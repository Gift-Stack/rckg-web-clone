import { FC } from "react";
import { ActivitySwitchProps } from "./model";

const ActivitySwitch: FC<ActivitySwitchProps> = ({
	handleSwitch,
	switchItem,
	active,
}) => {
	return (
		<div
			className="flex user-activity_switch"
			data-testid="user-activity-switch"
		>
			{switchItem.map((value, index) => (
				<div
					data-testid={`user-activity-switch-${index}`}
					className={`${
						active === value
							? "bg-sky-faint user-activity_switch__active text-x-small md:text-labels xl:text-sm-regular"
							: "bg-transparent user-activity_switch__notActive text-x-small md:text-labels xl:text-sm-regular"
					}`}
					onClick={() => handleSwitch(value)}
					key={index}
				>
					{value}
				</div>
			))}
		</div>
	);
};

export default ActivitySwitch;
