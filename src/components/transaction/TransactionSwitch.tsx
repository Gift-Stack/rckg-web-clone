import { FC } from "react";
import { TransactionSwitchProps } from "./model";

const TransactionSwitch: FC<TransactionSwitchProps> = ({
	handleSwitch,
	switchItem,
	active,
}) => {
	return (
		<div className="flex transaction_switch" data-testid="transaction-switch">
			{switchItem.map((value, index) => (
				<div
					data-testid={`transaction-switch-${index}`}
					className={`${
						active === value
							? "bg-sky-faint transaction_switch__active text-x-small md:text-sm-regular"
							: "bg-transparent transaction_switch__notActive text-x-small md:text-sm-regular"
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

export default TransactionSwitch;
