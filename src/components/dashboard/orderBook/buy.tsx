import React, { FC } from "react";
import { BuySellRecords } from "./model";
import Item from "./item";
import { withProvider } from "../../../hoc/withProvider";

const OrderBook: FC<BuySellRecords> = ({ records, show }) => {
	return (
		<>
			{show && (
				<div>
					{records?.map(
						(record: any, index) =>
							record.type === "buy" && <Item key={index} data={record} />
					)}
				</div>
			)}
		</>
	);
};

export default withProvider(OrderBook);
