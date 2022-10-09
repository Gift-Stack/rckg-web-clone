import {
	EthBtc,
	MenuDown,
	MenuUp,
	MenuOption,
} from "../../../assets";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { ITableData } from "../model";
import { ISpotAccountTableData, MobileSpotAccountTableProps } from "./model";
import Pagination from "../Pagination";

enum Style {
	TITLE = "text-labels text-gray-deep mb-1",
	BODY = "text-sm-regular font-medium",
}

const MobileSpotAccountTable: FC<MobileSpotAccountTableProps> = ({
	data,
	buy,
	deposit,
	withdraw,
	trade,
	transfer,
	convert,
	allCoins,
	fetchCoinName,
	fetchCoinImage,

	pageSize = 10,
	setCurrentPage,
	totalPages,
	showPagination = false,
	showPageSize = false,
}) => {
	const [dataSet, setDataSet] = useState<ISpotAccountTableData[]>([]);
	const [pages, setPages] = useState<number>(0);
	const [activeIndex, setActiveIndex] = useState<number>(1);
	const [_dataSource, _setDataSource] = useState<ISpotAccountTableData[]>([]);
	const [canExpand, setCanExpand] = useState<boolean>(false);

	useEffect(() => {
		setDataSet(data);
	}, [data]);

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
		totalPages
			? setPages(totalPages)
			: setPages(Math.ceil(data.length / pageSize));
		setCurrentPage && setCurrentPage(activeIndex);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeIndex, data, pageSize]);

	const [visibilities, setVisibilities] = React.useState(() =>
		dataSet.map((x) => true)
	);
	const handleClick = (event: any) => {
		const index = parseInt(event.currentTarget.dataset.index, 10);
		const newVisibilities = [...visibilities];
		newVisibilities[index] = !newVisibilities[index];
		setVisibilities(newVisibilities);
	};
	return (
		<div data-testid="rg-mobile-spotAccount-table" className={"bg-white px-4"}>
			{_dataSource?.map((row, index) => (
				<div className={"border-b border-neutral-100"} key={row.asset}>
					<div className={"flex items-center justify-between mt-2 mb-4"}>
						<div className="flex items-center mt-4">
							<div className="flex items-center coins">
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
										"text-sm-regular font-semibold leading-5 text-neutral-400"
									}
								>
									{row.asset}
								</div>
								<div className={Style.TITLE}>{fetchCoinName(allCoins, row.asset)}</div>
							</div>
						</div>
						<div>
							<div className="flex items-center space-x-1">
								<p className={Style.BODY}>{row.free}</p>
								<div
									data-index={index}
									data-testid={`rg-mobile-spotAccount-table-dropdown-${index}`}
									onClick={handleClick}
								>
									{visibilities[index] ? <MenuUp /> : <MenuDown />}
								</div>
								<div className="user-group relative h-full dashboard__header__link">
									<div className="flex items-center h-full">
										<MenuOption />
									</div>
									<div className="hidden user-group-hover:block absolute right-0 top-full w-32 bg-white">
										<button
											data-testid="rg-mobile-spotAccount-table-btn"
											title="Coming Soon!"
											// onClick={() => buy(row)}
											className="flex text-left py-3 px-3 border-b border-neutral-100 text-disabled hover:text-blue-dark text-small"
										>
											Buy
										</button>
										<button
											data-testid="rg-mobile-spotAccount-table-btn"
											onClick={() => deposit(row)}
											className="flex text-left py-3 px-3 border-b border-neutral-100 text-primary-400 hover:text-blue-dark text-small"
										>
											Deposit
										</button>
										<button
											data-testid="rg-mobile-spotAccount-table-btn"
											onClick={() => withdraw(row)}
											className="flex text-left py-3 px-3 border-b border-neutral-100 text-primary-400 hover:text-blue-dark text-small"
										>
											Withdraw
										</button>
										<button
											data-testid="rg-mobile-spotAccount-table-btn"
											onClick={() => trade(row)}
											className="flex text-left py-3 px-3 border-b border-neutral-100 text-primary-400 hover:text-blue-dark text-small"
										>
											Trade
										</button>
										<button
											data-testid="rg-mobile-spotAccount-table-btn"
											onClick={() => transfer(row)}
											className="flex text-left py-3 px-3 border-b border-neutral-100 text-primary-400 hover:text-blue-dark text-small"
										>
											Transfer
										</button>
										<button
											data-testid="rg-mobile-spotAccount-table-btn"
											onClick={() => convert(row)}
											className="flex text-left py-3 px-3 border-b border-neutral-100 text-primary-400 hover:text-blue-dark text-small"
										>
											Convert
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					{visibilities[index] ? (
						<div>
							<div
								className={"flex items-center justify-between mt-2 mb-1.5"}
							>
								<p className={Style.TITLE}>In order</p>
								<p className={Style.BODY}>{parseFloat(row.locked)}</p>
							</div>
							<div className={"flex items-center justify-between mb-1.5"}>
								<p className={Style.TITLE}>Available</p>
								<p className={Style.BODY}>
									{parseFloat(row.free)}
								</p>
							</div>
							<div className={"flex items-center justify-between mb-1.5"}>
								<p className={Style.TITLE}>USDT Value</p>
								<p className={Style.BODY}>
									{parseFloat(row.usdtValue)}
								</p>
							</div>
						</div>
					) : (
						""
					)}
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

export default MobileSpotAccountTable;
