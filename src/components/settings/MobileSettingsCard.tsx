import { CheckMarkGreen } from "./../../assets";
import React, { FC } from "react";

interface MobileSettingsCardProps {
	title: string;
	description: string;
	icon: React.ReactElement;
	button: React.ReactElement;
	text?: React.ReactElement;
	borderBottom?: boolean;
	hideUnsetButton?: boolean;
	disabled?: boolean;
}

const MobileSettingsCard: FC<MobileSettingsCardProps> = ({
	title,
	description,
	icon,
	button,
	text,
	borderBottom,
	hideUnsetButton,
	disabled,
}) => {
	return (
		<div>
			<div
				data-testid={"wrapper"}
				className={`flex flex-nowrap mt-8 w-full ${
					disabled ? "cursor-not-allowed opacity-50" : ""
				} ${borderBottom && "border-b border-primary-100  pb-7"}`}
			>
				<div className="w-12">{icon}</div>
				<div className="flex  lg:justify-between items-start w-full flex-col lg:items-center lg:flex-row">
					<div className="flex-1 mb-4 lg:mb-0">
						<p className="text-sm-headline font-bold text-neutral-400">
							{title}
						</p>
						<p className="text-gray-400 max-w-screen-sm">{description}</p>
						{text && <p className="text-gray-500">{text}</p>}
					</div>
					<div className="w-full flex justify-between items-center">
						<div>
							{!hideUnsetButton && (
								<div data-testid={"unset"} className="flex items-center">
									<div className="mr-2">
										<CheckMarkGreen fill={"#ffffff"} />
									</div>
									<span className="text-neutral-400 font-bold">Unset</span>
								</div>
							)}
						</div>
						{button}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MobileSettingsCard;
