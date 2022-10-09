import { FC } from "react";
import { OrderProps } from "./model";
import OrderDetails from "./OrderDetails";
import OrderType from "./OrderType";

const Order: FC<OrderProps> = ({
	order,
	handleCopy,
	handleParty,
	handleAction,
}) => {
	return (
		<div data-testid="rg-order-component">
			<OrderType
				type={order.type}
				date={order.date}
				address={order.address}
				copyAddress={(value) => handleCopy(value)}
			/>
			<OrderDetails
				order={order}
				party={(value) => handleParty(value)}
				action={(type, value) => handleAction(type, value)}
			/>
		</div>
	);
};

export default Order;
