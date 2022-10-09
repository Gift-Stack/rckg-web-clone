import React, { FC, useEffect, useState } from "react";
import { MobileTransactionTableProps } from "./model";
import { ITableData } from "../model";
import MobileTablePagination from "../MobileTablePagination";

const MobileTransactionTable: FC<MobileTransactionTableProps> = ({
	dataSource,
	pageSize = 10,
}) => {
	const [_dataSource, _setDataSource] = useState<ITableData[]>([]);
	const [pages, setPages] = useState<number>(0);
	const [activeIndex, setActiveIndex] = useState<number>(1);

	useEffect(() => {
		_setDataSource(
			dataSource.slice(
				(activeIndex - 1) * pageSize,
				activeIndex * pageSize < dataSource.length
					? activeIndex * pageSize
					: (activeIndex - 1) * pageSize +
							(dataSource.length - (activeIndex - 1) * pageSize)
			)
		);
		setPages(Math.ceil(dataSource.length / pageSize));
	}, [activeIndex, dataSource, pageSize]);
	return (
		<div
			data-testid={"rg-mobile-transaction-table"}
			className={"mobile-transaction-table"}
		>
			<div className={"w-full flex items-center text-gray-deep text-labels"}>
				<div className={"w-2/5"}>Coin</div>
				<div className={"w-2/5"}>Amount</div>
				<div className={"w-1/5"}>Status</div>
			</div>
			{_dataSource && _dataSource.length > 0 ? (
				_dataSource?.map((row) => (
					<div
						key={row.key}
						className={"w-full flex items-center text-gray-deep text-labels"}
					>
						<div className={"w-2/5"}>{row.coin}</div>
						<div className={"w-2/5"}>{row.deposit_amount}</div>
						<div className={"w-1/5"}>{row.status}</div>
					</div>
				))
			) : (
				<></>
			)}
			<MobileTablePagination
				pages={pages}
				_setActiveIndex={(index: number) => setActiveIndex(index)}
			/>
		</div>
	);
};

export default MobileTransactionTable;
