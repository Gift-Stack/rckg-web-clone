import { BnbBtc, BtcBtc, DodgeBtc, EthBtc, LtcBtc } from "../../../assets";
import React, { FC, useEffect, useState } from "react";
import { CoinPairEnum } from "../../../types/enum";
import { IMarketTableData } from "./model";
import { ITableData } from "../model";
import { TableSortState } from "../enum";
import Pagination from "../Pagination";

enum Style {
	TITLE = "text-labels text-gray-deep mb-1",
	BODY = "text-sm-regular font-medium",
}

const MobileMarketTable: FC<any> = ({
	data,
	trade,
	activeTableOption,
	columns,
	pageSize = 10,
	setCurrentPage,
	totalPages,
	showPagination = false,
	showPageSize = false,
}) => {
	const [_columns, _setColumns] = useState<any[]>([]);
	const [dataSet, setDataSet] = useState<IMarketTableData[]>([]);
	const [pages, setPages] = useState<number>(0);
	const [activeIndex, setActiveIndex] = useState<number>(1);
	const [_dataSource, _setDataSource] = useState<ITableData[]>([]);
	const [canExpand, setCanExpand] = useState<boolean>(false);

	useEffect(() => {
		setDataSet(data);
	}, [data]);

	useEffect(() => {
		const _columns = columns.map((column: any) => {
			return {
				...column,
				sortState: TableSortState.ASC,
			};
		});
		_setColumns(_columns);
		_setDataSource(
			data.slice(
				(activeIndex - 1) * pageSize,
				activeIndex * pageSize < data.length
					? activeIndex * pageSize
					: (activeIndex - 1) * pageSize +
							(data.length - (activeIndex - 1) * pageSize)
			)
		);
		totalPages
			? setPages(totalPages)
			: setPages(Math.ceil(data.length / pageSize));
		setCurrentPage && setCurrentPage(activeIndex);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeIndex, columns, data, pageSize]);

	return (
		<div data-testid="rg-mobile-market-table" className={"mobile-market-table"}>
			{_dataSource?.map((row, index) => (
				<div className={"border-b border-neutral-100"} key={row.id}>
					<div className="flex items-center mt-4">
						<div
							className="flex items-center coins"
							data-testid={`rg-marketTable-coin-pair-${index}`}
						>
							{row.coinPair === CoinPairEnum.DOGE_BTC ? (
								<DodgeBtc />
							) : CoinPairEnum.LTC_BTC ? (
								<LtcBtc />
							) : CoinPairEnum.BNB_BTC ? (
								<BnbBtc />
							) : CoinPairEnum.BTC_BTC ? (
								<BtcBtc />
							) : (
								<EthBtc />
							)}
						</div>

						<div className="ml-1">
							<div
								className={
									"text-sm-regular font-medium leading-5 text-neutral-400"
								}
							>
								{row.coinPair}
							</div>
						</div>
					</div>
					<div className={"flex items-center justify-between mt-2 mb-4"}>
						<div>
							<div>
								<p className={Style.TITLE}>Price</p>
								<p className={Style.BODY}>${row.price}</p>
							</div>
							<div className={"mt-4"}>
								<p className={Style.TITLE}>Volume</p>
								<p className={Style.BODY}>{row.volume}</p>
							</div>
						</div>
						<div>
							<div>
								<p className={Style.TITLE}>24H Change</p>
								<p className={Style.BODY}>{row.change}</p>
							</div>
							<div className="flex items-center justify-center">
								<button
									data-testid="rg-mobile-market-table-trade-btn"
									onClick={() => row.trade!()}
									className={`bg-neutral-400 rounded text-white font-normal text-x-small sm:text-sm-regular mt-6 py-1 px-6`}
								>
									Trade
								</button>
							</div>
						</div>
					</div>
				</div>
			))}
			{showPagination && (
				<Pagination
					pages={pages}
					pageSize={pageSize}
					rowsLength={data.length}
					_setActiveIndex={(index: number) => setActiveIndex(index)}
					showPageSize={showPageSize}
					expand={canExpand}
					handleExpand={(bool: boolean) => setCanExpand(bool)}
				/>
			)}
		</div>
	);
};

export default MobileMarketTable;
