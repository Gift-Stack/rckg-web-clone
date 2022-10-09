import { FC } from "react";

export type switchItem = {
	value: string;
	text: string;
};

export interface SwitchProps {
	handleSwitch: Function;
	switchItem: switchItem[];
	active: string;
}

const Switch: FC<SwitchProps> = ({ handleSwitch, switchItem, active }) => {
	return (
		<div className="flex rounded border w-max switch" data-testid="switch">
			{switchItem.map(({ value, text }, index) => {
				return (
					<div
						data-testid={`switch-${index}`}
						className={`${
							active === value
								? "bg-primary-200 switch__active"
								: "switch__notActive"
						}`}
						onClick={() => handleSwitch(value)}
						key={index}
					>
						{text}
					</div>
				);
			})}
		</div>
	);
};

export { Switch };
