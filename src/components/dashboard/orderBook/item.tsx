import React, { FC } from "react";
import { ItemProps } from "./model";
import { formatToCurrency } from "../../../constants";
import { withProvider } from "../../../hoc/withProvider";
import { useTradeContext } from "context/trade.context";

const OrderBookItem: FC<ItemProps> = ({ data }) => {
	const { setPrice } = useTradeContext();
	const handleSetPrice = () => {
		setPrice(data.price);
	};

	return (
		<div
			onClick={handleSetPrice}
			data-testid="rg-OrderBookItem"
			className={
				"flex flex-row text-labels font-medium border-t border-b border-dotted border-transparent hover:border-black text-neutral-400 cursor-pointer"
			}
		>
			<p
				data-testid="rg-OrderBookInnerItem"
				className={`w-1/3 px-1 ${
					data.type === "buy" ? "text-deepGreen" : "text-red-500"
				}`}
			>
				{Number(data.price)}
			</p>
			<p className={"w-1/3 px-1 text-right"}>{data.amount}</p>
			<p className={"w-1/3 px-1 text-right"}>{data.total}</p>
		</div>
	);
};

export default withProvider(OrderBookItem);
