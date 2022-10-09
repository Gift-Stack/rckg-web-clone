import {
	EthBtc,
	MenuDown,
	MenuUp,
} from "../../../assets";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import {
	formatToCurrency,
	getDateTimeWithoutA,
	getDateTimeFormatUK,
} from "../../../constants";
import { capitalize } from "../../../utils";
import {
	TransactionStatusVariant,
	TransactionStatus,
} from "../../transaction/enum";
import {
	ITransactionHistoryTableData,
	ITransactionHistoryTableConvertData,
	MobileTransactionHistoryTableProps,
} from "./model";
import Pagination from "../Pagination";

enum Style {
	TITLE = "text-labels text-gray-deep mb-1",
	BODY = "text-sm-regular font-medium",
}

const MobileTransactionHistoryTable: FC<MobileTransactionHistoryTableProps> = ({
	data,
	convertData,
	isConvert,
	isDataDeposit,
	allCoins,
	fetchCoinImage,
	pageSize = 10,
	setCurrentPage,
	totalPages,
	showPagination = false,
	showPageSize = false,
}) => {
	const [dataSet, setDataSet] = useState<any>([]);
	const [convertDataSet, setConvertDataSet] = useState<any>([]);

	const [pages, setPages] = useState<number>(0);
	const [pagesConvert, setPagesConvert] = useState<number>(0);
	const [activeIndex, setActiveIndex] = useState<number>(1);
	const [activeIndexConvert, setActiveIndexConvert] = useState<number>(1);
	const [_dataSource, _setDataSource] = useState<any>([]);
	const [_dataSourceConvert, _setDataSourceConvert] = useState<any>([]);
	const [canExpand, setCanExpand] = useState<boolean>(false);

	useEffect(() => {
		setDataSet(data);
		setConvertDataSet(convertData);
	}, [data, convertData]);

	useEffect(() => {
		_setDataSource(
			data.slice(
				(activeIndex - 1) * pageSize,
				activeIndex * pageSize < data.length
					? activeIndex * pageSize
					: (activeIndex - 1) * pageSize +
							(data.length - (activeIndex - 1) * pageSize)
			)
		);
		setPages(Math.ceil(data.length / pageSize));
		setCurrentPage && setCurrentPage(activeIndex);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeIndex, data, pageSize]);

	useEffect(() => {
		_setDataSourceConvert(
			convertData.slice(
				(activeIndexConvert - 1) * pageSize,
				activeIndexConvert * pageSize < convertData.length
					? activeIndexConvert * pageSize
					: (activeIndexConvert - 1) * pageSize +
							(convertData.length - (activeIndexConvert - 1) * pageSize)
			)
		);
		setPagesConvert(Math.ceil(convertData.length / pageSize));
		setCurrentPage && setCurrentPage(activeIndexConvert);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeIndexConvert, convertData, pageSize]);

	const [visibilities, setVisibilities] = React.useState(() =>
	_dataSourceConvert.map((x: any) => true)
	);
	const handleClick = (event: any) => {
		const index = parseInt(event.currentTarget.dataset.index, 10);
		const newVisibilities = [...visibilities];
		newVisibilities[index] = !newVisibilities[index];
		setVisibilities(newVisibilities);
	};
	return (
		<div data-testid="rg-mobile-transaction-history-table">
			{isConvert
				? <>
						{_dataSourceConvert?.map((row: any, index: any) => (
							<div className={"border-b border-neutral-100"} key={row.swapId}>
								<div className={"flex items-center justify-between mt-2 mb-4"}>
									<div className="flex items-center mt-4">
										<div className="ml-1">
											<div
												className={
													"text-sm-regular font-semibold leading-5 text-neutral-400"
												}
											>
												{getDateTimeFormatUK(row.swapTime)}
											</div>
										</div>
									</div>
									<div>
										<div className="flex items-center space-x-1">
											<div
												data-index={index}
												data-testid={`rg-mobile-transaction-history-table-dropdown-${index}`}
												onClick={handleClick}
											>
												{visibilities[index] ? <MenuUp /> : <MenuDown />}
											</div>
										</div>
									</div>
								</div>
								{visibilities[index] ? (
									<div>
										<div
											className={"flex items-center justify-between mt-2 mb-1.5"}
										>
											<p className={Style.TITLE}>Fee ({row.quoteAsset})</p>
											<p className={Style.BODY}>{formatToCurrency(row.fee, 7)}</p>
										</div>
										<div className={"flex items-center justify-between mb-1.5"}>
											<p className={Style.TITLE}>From ({row.quoteAsset})</p>
											<p className={Style.BODY}>
												{formatToCurrency(row.quoteQty, 7)}
											</p>
										</div>
										<div className={"flex items-center justify-between mb-1.5"}>
											<p className={Style.TITLE}>To ({row.baseAsset})</p>
											<p className={Style.BODY}>
												{formatToCurrency(row.baseQty, 7)}
											</p>
										</div>
										<div className={"flex items-center justify-between mb-1.5"}>
											<p className={Style.TITLE}>Status</p>
											<div className={`flex items-center ${Style.BODY}`}>
												<div
													className={`h-2 w-2 rounded-full mr-2 ${
														row.status === 1
															? TransactionStatusVariant.SUCCESSFUL
															: row.status === 2
															? TransactionStatusVariant.FAILED
															: TransactionStatusVariant.PENDING
													}`}
												></div>
												<p>
													{row.status === 1
														? "Successful"
														: row.status === 2
														? "Failed"
														: "Pending"}
												</p>
											</div>
										</div>
									</div>
								) : (
									""
								)}
							</div>
						))}
						{showPagination && (
							<Pagination
								pages={pagesConvert}
								pageSize={pageSize}
								rowsLength={convertData.length}
								_setActiveIndex={(index: number) => setActiveIndexConvert(index)}
								showPageSize={showPageSize}
								expand={canExpand}
								handleExpand={(bool: boolean) => setCanExpand(bool)}
							/>
						)}
					</>
				: isDataDeposit
				? 
					<>
						{_dataSource?.map((row: any, index: any) => (
							<div className={"border-b border-neutral-100"} key={row.id}>
								<div className="flex items-center mt-4">
									<div
										className="flex items-center coins"
										data-testid={`rg-marketTable-coin-pair-${index}`}
									>
										{fetchCoinImage(allCoins, row.asset) ? (
											<Image 
												src={fetchCoinImage(allCoins, row.asset)} 
												quality={"100"} 
												alt={row.asset}
												width={30}
												height={30}
											/>
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
											{row.asset}
										</div>
									</div>
								</div>
								<div className={"flex items-center justify-between mt-2 mb-4"}>
									<div>
										<div>
											<p className={Style.BODY}>{"deposit"}</p>
										</div>
										<div className={"mt-4"}>
											<p className={Style.TITLE}>
												{getDateTimeWithoutA(row.createdOn)}
											</p>
										</div>
									</div>
									<div>
										<div>
											<p className={Style.BODY}>
												{formatToCurrency(row.amount, 6)}
											</p>
										</div>
										<div className={"mt-4"}>
											<div className={`flex items-center ${Style.TITLE}`}>
												<div
													className={`h-2 w-2 rounded-full mr-2 ${
														row.status === 1
															? TransactionStatusVariant[
																	TransactionStatus.SUCCESSFUL
																]
															: 0
															? TransactionStatusVariant[
																	TransactionStatus.PENDING
																]
															: TransactionStatusVariant[TransactionStatus.FAILED]
													}`}
												></div>
												<p>
													{row.status === 1
														? "Successful"
														: row.status === 0
														? "Pending"
														: "Failed"}
												</p>
											</div>
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
					</>
				: 
				<>
					{_dataSource?.map((row: any, index: any) => (
						<div className={"border-b border-neutral-100"} key={row.id}>
							<div className="flex items-center mt-4">
								<div className="ml-1">
									<div
										className={
											"text-sm-regular font-medium leading-5 text-neutral-400"
										}
									>
										{row.currency}
									</div>
								</div>
							</div>
							<div className={"flex items-center justify-between mt-2 mb-4"}>
								<div>
									<div>
										<p className={Style.BODY}>{"withdrawal"}</p>
									</div>
									<div className={"mt-4"}>
										<p className={Style.TITLE}>
											{getDateTimeWithoutA(row.createdOn)}
										</p>
									</div>
								</div>
								<div>
									<div>
										<p className={Style.BODY}>
											{formatToCurrency(row.amount, 6)}
										</p>
									</div>
									<div className={"mt-4"}>
										<div className={`flex items-center ${Style.TITLE}`}>
											<div
												className={`h-2 w-2 rounded-full mr-2 ${
													row.status === "successful"
														? TransactionStatusVariant[
																TransactionStatus.SUCCESSFUL
														  ]
														: "pending"
														? TransactionStatusVariant[
																TransactionStatus.PENDING
														  ]
														: TransactionStatusVariant[TransactionStatus.FAILED]
												}`}
											></div>
											<p>
												{row.status === "successful"
													? "Successful"
													: row.status === "pending"
													? "Pending"
													: "Failed"}
											</p>
										</div>
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
				</>
			}
		</div>
	);
};

export default MobileTransactionHistoryTable;
