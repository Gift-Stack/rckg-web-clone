import React, { FC, useEffect, useState } from "react";
import MobileTablePagination from "../MobileTablePagination";
import MobileOrder from "./MobileOrder";
import { IOrder, MobileOrderListTableProps } from "./model";

const MobileOrderListTable: FC<MobileOrderListTableProps> = ({
	allOrders,
	pageSize = 6,
	handleCopyAddress,
	handleParty,
	handleAction,
}) => {
	const [_dataSource, _setDataSource] = useState<IOrder[]>([]);
	const [pages, setPages] = useState<number>(0);
	const [activeIndex, setActiveIndex] = useState<number>(1);
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
	return (
		<div data-testid="rg-order-list-component">
			{_dataSource && _dataSource.length ? (
				_dataSource.map((order) => (
					<MobileOrder
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
			<div>
				<MobileTablePagination
					pages={pages}
					_setActiveIndex={(index: number) => setActiveIndex(index)}
				/>
			</div>
		</div>
	);
};

export default MobileOrderListTable;
