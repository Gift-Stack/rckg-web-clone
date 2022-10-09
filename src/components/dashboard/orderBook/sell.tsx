import React, { FC } from "react";
import { BuySellRecords } from "./model";
import Item from "./item";

const OrderBook: FC<BuySellRecords> = ({ records, show }) => {
	return (
		<>
			{show &&
				records?.map(
					(record: any, index) =>
						record.type === "sell" && <Item key={index} data={record} />
				)}
		</>
	);
};

export default OrderBook;
