import { FC } from "react";

export type switchItem = {
	value: string;
	text: string;
};

export interface TabSwitchProps {
	handleSwitch: Function;
	switchItem: switchItem[];
	active: string;
	style?: object;
}

const TabSwitch: FC<TabSwitchProps> = ({
	handleSwitch,
	switchItem,
	active,
	style,
	...props
}) => {
	return (
		<div
			className="flex flex-wrap md:flex-nowrap justify-between md:justify-start  w-full"
			data-testid="switch"
			{...props}
			style={style}
		>
			{switchItem.map(({ value, text }, index) => {
				return (
					<div
						data-testid={`switch-${index}`}
						className={`${
							active === value
								? "text-primary-400 font-semibold "
								: "text-sky-100 font-medium"
						} text-labels md:text-sm-regular mr-5 md:mr-14 cursor-pointer whitespace-nowrap`}
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

export default TabSwitch;
