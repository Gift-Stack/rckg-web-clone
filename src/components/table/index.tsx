import React, { FC, useEffect, useState } from "react";
import { ITableColumn, TableProps } from "./model";
import { DataState, TableSortState } from "./enum";
import { ITableData } from "./model";
import { TableSort } from "../../assets";
import Pagination from "./Pagination/index";
import { isElement } from "../../utils";

const Table: FC<TableProps> = ({
	columns,
	dataSource,
	pageSize = 10,
	showPagination = false,
	showPageSize = false,
	totalPages,
	setCurrentPage,
	activeTableOption,
}) => {
	const [_columns, _setColumns] = useState<ITableColumn[]>([]);
	const [_dataSource, _setDataSource] = useState<ITableData[]>([]);
	const [pages, setPages] = useState<number>(0);
	const [activeIndex, setActiveIndex] = useState<number>(1);
	const [canExpand, setCanExpand] = useState<boolean>(false);

	useEffect(() => {
		const _columns = columns.map((column) => {
			return {
				...column,
				sortState: TableSortState.ASC,
			};
		});
		_setColumns(_columns);
		_setDataSource(
			dataSource.slice(
				(activeIndex - 1) * pageSize,
				activeIndex * pageSize < dataSource.length
					? activeIndex * pageSize
					: (activeIndex - 1) * pageSize +
							(dataSource.length - (activeIndex - 1) * pageSize)
			)
		);
		totalPages
			? setPages(totalPages)
			: setPages(Math.ceil(dataSource.length / pageSize));
		setCurrentPage && setCurrentPage(activeIndex);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeIndex, columns, dataSource, pageSize]);

	const handleSort = (column: ITableColumn): void => {
		if (column.sortState === TableSortState.DEC) {
			_setDataSource(
				_dataSource.sort((a, b) =>
					a[column.dataIndex].toString() > b[column.dataIndex].toString()
						? 1
						: -1
				)
			);
			const _cs = _columns.map((c) => {
				return {
					...c,
					sortState:
						c.dataIndex === column.dataIndex ? TableSortState.ASC : c.sortState,
				};
			});
			_setColumns(_cs);
		} else {
			_setDataSource(
				_dataSource.sort((a, b) =>
					a[column.dataIndex].toString() < b[column.dataIndex].toString()
						? 1
						: -1
				)
			);
			const _cs = _columns.map((c) => {
				return {
					...c,
					sortState:
						c.dataIndex === column.dataIndex ? TableSortState.DEC : c.sortState,
				};
			});
			_setColumns(_cs);
		}
	};

	return (
		<div data-testid="rg-table-container" className={"flex flex-col"}>
			<div className={"py-2 -my-2 overflow-x-auto"}>
				<div
					className={
						"inline-block min-w-full overflow-hidden align-middle shadow sm:rounded-lg"
					}
				>
					<table data-testid="rg-table" className="min-w-full">
						<thead data-testid="rg-table-head">
							<tr data-testid="rg-table-head-tr">
								{_columns && _columns.length > 0 ? (
									_columns.map((column) => (
										<th
											data-testid="rg-table-head-th"
											key={column.key}
											className={
												"px-2 lg:px-6 py-1.5 lg:py-3 font-normal text-gray-deep leading-4 tracking-wider text-left text-labels"
											}
										>
											<div
												data-testid={"rg-table-sort"}
												onClick={() => column.sort && handleSort(column)}
												className={"flex items-center"}
											>
												{column.title}
												{column.title && column.sort && (
													<span className={"ml-2"}>
														<TableSort />
													</span>
												)}
											</div>
										</th>
									))
								) : (
									<></>
								)}
							</tr>
						</thead>

						<tbody data-testid="rg-table-body" className={"bg-white"}>
							{_dataSource && _dataSource.length > 0 ? (
								_dataSource.map((data) => (
									<tr data-testid="rg-table-body-tr" key={data.key}>
										{_columns && _columns.length > 0 ? (
											_columns.map((column, index) => {
												return isElement(data[column.dataIndex]) ? (
													<td
														key={index}
														className={
															"px-2 lg:px-6 py-2 lg:py-4 whitespace-no-wrap"
														}
													>
														{data[column.dataIndex]}
													</td>
												) : (
													<td
														key={index}
														className={
															"px-2 lg:px-6 py-2 lg:py-4 whitespace-no-wrap"
														}
													>
														<div className={DataState.DEFAULT}>
															{data[column.dataIndex]}
														</div>
													</td>
												);
											})
										) : (
											<></>
										)}
									</tr>
								))
							) : (
								<></>
							)}
						</tbody>
					</table>
				</div>
			</div>
			{showPagination && (
				<Pagination
					pages={pages}
					pageSize={pageSize}
					rowsLength={dataSource.length}
					_setActiveIndex={(index: number) => setActiveIndex(index)}
					showPageSize={showPageSize}
					expand={canExpand}
					handleExpand={(bool: boolean) => setCanExpand(bool)}
				/>
			)}
		</div>
	);
};

export default Table;
