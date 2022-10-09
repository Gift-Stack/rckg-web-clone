import { TransactionCopy } from "../../../assets";
import { getDateTimeWithSeconds } from "../../../constants";
import { FC } from "react";
import { OrderStatus } from "./enum";
import { OrderTypeProps } from "./model";

const OrderType: FC<OrderTypeProps> = ({
	type,
	date,
	address,
	copyAddress,
}) => {
	return (
		<div
			data-testid="rg-order-type"
			className={
				"w-full bg-gray-faint text-gray-deep py-2 xl:px-8 lg:px-4 px-2 flex justify-between text-labels lg:text-sm-regular xl:text-sm-headline"
			}
		>
			<div className={"flex items-center"}>
				<div
					className={`pr-3 font-medium ${
						type === OrderStatus.BUY ? "text-deepGreen" : "text-error-400"
					}`}
				>
					{type === OrderStatus.BUY ? "Buy" : "Sell"}
				</div>
				<div className={"border-r h-3"}></div>
				<div className={"pl-3"}>{getDateTimeWithSeconds(date)}</div>
			</div>
			<div className={"flex"}>
				<div className={"pr-3"}>{address}</div>
				<div
					data-testid="rg-order-type-address-copy"
					onClick={() => copyAddress(address)}
				>
					<TransactionCopy />{" "}
				</div>
			</div>
		</div>
	);
};

export default OrderType;
