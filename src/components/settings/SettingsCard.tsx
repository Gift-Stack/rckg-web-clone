import React, { FC } from "react";

interface SettingsCardProps {
	disabled?: boolean;
	title: string;
	description: string;
	icon: React.ReactElement;
	button: React.ReactElement;
	text?: React.ReactElement;
	fullBorderBottom?: boolean;
	partBorderBottom?: boolean;
	borderTop?: boolean;
	children?: React.ReactChildren;
}

const SettingsCard: FC<SettingsCardProps> = ({
	disabled,
	title,
	description,
	icon,
	button,
	text,
	fullBorderBottom,
	partBorderBottom,
	borderTop,
}) => {
	return (
		<div
			data-testid={"wrapper"}
			className={`${
				disabled ? "cursor-not-allowed opacity-50" : ""
			} flex flex-nowrap mt-8 w-full ${
				fullBorderBottom && "border-b border-primary-100  pb-7"
			} ${borderTop && "border-t border-primary-100"} `}
		>
			<div className="w-12">{icon}</div>
			<div
				className={`flex  lg:justify-between items-start w-full flex-col lg:items-center lg:flex-row ${
					partBorderBottom && "border-b border-primary-100 pb-7"
				}`}
			>
				<div className="flex-1 mb-4 lg:mb-0">
					<p className="text-sm-headline font-bold text-neutral-400">{title}</p>
					<p className="text-gray-400 max-w-screen-sm">{description}</p>
					{text && <div className="text-gray-500">{text}</div>}
				</div>

				{button}
			</div>
		</div>
	);
};

export default SettingsCard;
