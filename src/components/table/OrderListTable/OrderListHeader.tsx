import React, { FC } from "react";

const OrderListTableHeader: FC = () => {
	return (
		<div
			data-testid="rg-order-list-table-header"
			className={
				"text-x-small lg:text-labels flex items-center text-gray-deep mt-5 mb-3 xl:px-8 lg:px-4 px-2"
			}
		>
			<div className={"p8"}>Coin/Type</div>
			<div className={"p14"}>Fiat Amount</div>
			<div className={"p17"}>Price</div>
			<div className={"p13"}>Crypto Amount</div>
			<div className={"p13"}>Counterparty</div>
			<div className={"p16"}>Status</div>
			<div className={"p19"}>Action</div>
		</div>
	);
};

export default OrderListTableHeader;
