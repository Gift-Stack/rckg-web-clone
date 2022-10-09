import React, { FC } from "react";
import { TableFilterState, TableOptionState } from "../enum";
import SearchFilter from "../SearchFilter";
import TableFilter from "../TableFilter";
import TableOption from "../TableOption";
import { MarketTableProps } from "./model";

const MarketTable: FC<MarketTableProps> = ({
	children,
	cssClass,
	title,
	tableFilters,
	tableOptions,
	handleFilter,
	handleOption,
	handleSearch,
}) => {
	const onFilter = (value: string) => {
		handleFilter && handleFilter(value);
	};

	const onOption = (value: string) => {
		handleOption && handleOption(value);
	};

	const onSearch = (value: string) => {
		handleSearch && handleSearch(value);
	};

	return (
		<div data-testid="rg-market-table" className={"market-table"}>
			<div className="items-center text-center sm:text-left justify-center sm:justify-between hiden md:flex-wrap md:flex mb-2">
				<h2
					className={
						"text-md-headline lg:text-l-headline font-bold text-neutral-400"
					}
				>
					{title}
				</h2>
				<SearchFilter
					cssClass={"hidden"}
					placeholder={"Search for Cryptocurrency"}
					handleSearch={(value: string) => onSearch(value)}
				/>
			</div>
			<div className={`${cssClass} flex flex-col card_shadow`}>
				{tableFilters && tableFilters?.length ? (
					<div className={"flex flex-wrap gap-3 lg:gap-8 mb-2 lg:mb-4"}>
						{tableFilters.map((filter) => (
							<TableFilter
								key={Math.random()}
								variant={
									filter.isActive
										? TableFilterState.PRIMARY
										: TableFilterState.SECONDARY
								}
								value={filter.name}
								type={"button"}
								actionClick={() => onFilter(filter.name)}
							/>
						))}
					</div>
				) : (
					<div></div>
				)}
				{tableOptions && tableOptions?.length ? (
					<div
						className={
							"flex flex-wrap gap-1 lg:gap-2 lg:gap-4 mt-2 lg:mt-4 mb-8"
						}
					>
						{tableOptions.map((option) => (
							<TableOption
								key={Math.random()}
								variant={
									option.isActive
										? TableOptionState.PRIMARY
										: TableOptionState.SECONDARY
								}
								value={option.name}
								type={"button"}
								optionClick={() => onOption(option.name)}
							/>
						))}
					</div>
				) : (
					<div></div>
				)}
				{children}
			</div>
		</div>
	);
};

export default MarketTable;
