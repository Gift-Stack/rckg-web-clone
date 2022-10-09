import React, { FC } from "react";
import { TableOptionState } from "../enum";
import TableOption from "../TableOption";
import { OrderListTableContainerProps } from "./model";
import { DownloadOutline, FunnelOutline, Option } from "../../../assets";

const OrderListTableContainer: FC<OrderListTableContainerProps> = ({
	children,
	cssClass,
	tableOptions,
	handleOption,
	tableActions,
	handleDownload,
	handleAction,
	filter,
}) => {
	const onOption = (value: string) => {
		handleOption && handleOption(value);
	};

	const onAction = (value: string) => {
		handleAction && handleAction(value);
	};

	const handleFilter = (): void => {
		filter && filter();
	};

	return (
		<div
			data-testid="rg-order-list-table-container"
			className={"order-list-table-container"}
		>
			<div className="items-center text-center sm:text-left justify-center sm:justify-between hiden md:flex-wrap md:flex mb-2">
				{tableOptions && tableOptions?.length ? (
					<div className={"flex flex-wrap gap-1 lg:gap-2 lg:gap-4 mb-4"}>
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
					<div data-testid="rg-order-list-table-empty-option"></div>
				)}
				{tableActions && tableActions?.length ? (
					<div
						className={
							"sm:flex sm:flex-wrap gap-1 lg:gap-2 lg:gap-4 mb-4 hidden"
						}
					>
						{tableActions.map((action) => (
							<div
								data-testid="rg-order-list-table-container-action"
								key={Math.random()}
								onClick={() => onAction(action.name)}
							>
								{action.action}
							</div>
						))}
					</div>
				) : (
					<div data-testid="rg-order-list-table-empty-action"></div>
				)}
				<div
					className={
						"sm:hidden flex justify-between text-sm-regular text-sky-deep font-light my-4"
					}
				>
					<button
						data-testid="rg-order-list-table-container-download"
						onClick={handleDownload}
						className={"font-light flex items-center"}
					>
						<DownloadOutline />
						<span className={"pl-1"}>Download</span>
					</button>
					<button
						data-testid="rg-order-list-table-container-filter"
						onClick={handleFilter}
						className={"font-light flex items-center"}
					>
						<FunnelOutline />
						<span className={"pl-1 pr-5"}>Filter</span>
						<Option />
					</button>
				</div>
			</div>
			<div className={`${cssClass} flex flex-col card_shadow`}>{children}</div>
		</div>
	);
};

export default OrderListTableContainer;
