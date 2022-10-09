import React, { FC, useEffect, useState } from "react";
import Pagination from "../Pagination";
import TableSelect from "../TableSelect";
import { IOrder, OrderListTableProps } from "./model";
import Order from "./Order";
import OrderListHeader from "./OrderListHeader";

const OrderListTable: FC<OrderListTableProps> = ({
	allOrders,
	pageSize = 6,
	handleCopyAddress,
	handleParty,
	handleAction,
	setCoin,
	setOrderType,
	setStatus,
}) => {
	const [_dataSource, _setDataSource] = useState<IOrder[]>([]);
	const [pages, setPages] = useState<number>(0);
	const [activeIndex, setActiveIndex] = useState<number>(1);
	const [canExpand, setCanExpand] = useState<boolean>(false);
	useEffect(() => {
		_setDataSource(
			allOrders.slice(
				(activeIndex - 1) * pageSize,
				activeIndex * pageSize < allOrders.length
					? activeIndex * pageSize
					: (activeIndex - 1) * pageSize +
							(allOrders.length - (activeIndex - 1) * pageSize)
			)
		);
		setPages(Math.ceil(allOrders.length / pageSize));
	}, [activeIndex, allOrders, pageSize]);
	const handleSelectChange = (type: string, value: string) => {
		type === "coin" && setCoin(value);
		type === "order_type" && setOrderType(value);
		type === "status" && setStatus(value);
	};
	return (
		<div data-testid="rg-order-list-table-component">
			<div className={"flex gap-x-4 xl:px-8 lg:px-4 px-2"}>
				<TableSelect
					options={["All Coins", "NGN"]}
					label={"Coins"}
					placeholder={"Select Coin"}
					onChange={(value) => handleSelectChange("coin", value)}
				/>
				<TableSelect
					options={["Buy/Sell", "Buy", "Sell"]}
					label={"Order Type"}
					placeholder={"Select Order Type"}
					onChange={(value) => handleSelectChange("order_type", value)}
				/>
				<TableSelect
					options={["All Status", "Completed"]}
					label={"Status"}
					placeholder={"Select Status"}
					onChange={(value) => handleSelectChange("status", value)}
				/>
			</div>
			<OrderListHeader />
			{_dataSource && _dataSource.length ? (
				_dataSource.map((order) => (
					<Order
						handleCopy={(value) => handleCopyAddress(value)}
						handleParty={(value) => handleParty(value)}
						handleAction={(type, value) => handleAction(type, value)}
						key={order.id}
						order={order}
					/>
				))
			) : (
				<></>
			)}
			<div className={"pt-8 pb-4 pr-10 border-t border-neutral-150"}>
				<Pagination
					pages={pages}
					pageSize={pageSize}
					rowsLength={allOrders.length}
					_setActiveIndex={(index: number) => setActiveIndex(index)}
					showPageSize={false}
					expand={canExpand}
					handleExpand={(bool: boolean) => setCanExpand(bool)}
				/>
			</div>
		</div>
	);
};

export default OrderListTable;
