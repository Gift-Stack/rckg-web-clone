import React, { FC } from "react";
import { TableOptionState } from "../enum";
import TableOption from "../TableOption";
import { TransactionHistoryTableProps } from "./model";

const TransactionHistoryTable: FC<TransactionHistoryTableProps> = ({
	children,
	cssClass,
	title,
	tableOptions,
	handleOption,
}) => {
	const onOption = (value: string) => {
		handleOption && handleOption(value);
	};

	return (
		<div
			data-testid="rg-transaction-history-table"
			className={"transactions-table"}
		>
			<div
				className={`${cssClass} flex flex-col card_shadow`}
				data-testid={"rg-card"}
			>
				<div className="items-center text-center sm:text-left justify-center sm:justify-between hiden md:flex-wrap md:flex mb-2">
					<h2
						className={
							"text-md-headline lg:text-l-headline font-bold text-neutral-400"
						}
					>
						{title}
					</h2>
				</div>
				{tableOptions && tableOptions?.length ? (
					<div className={"flex flex-wrap gap-1 lg:gap-2 mt-2 lg:mt-4"}>
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

export default TransactionHistoryTable;
