import { FC } from "react";
import { TradeSwitchProps } from "./model";

const TradeSwitch: FC<TradeSwitchProps> = ({
	handleSwitch,
	switchItem,
	active,
}) => {
	return (
		<div className="flex trade_switch" data-testid="trade-switch">
			{switchItem.map((value, index) => (
				<div
					data-testid={`switch-${index}`}
					className={`${
						active === value && index === 0
							? "bg-active trade_switch__active"
							: active === value && index === 1
							? "bg-orange trade_switch__active"
							: "bg-gray-600 trade_switch__notActive"
					} ${
						index === 0
							? "rounded-tl-md rounded-bl-md"
							: "rounded-tr-md rounded-br-md"
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

export { TradeSwitch };
