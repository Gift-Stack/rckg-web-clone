import Link from "next/link";
import React, { FC } from "react";
import { TransactionTableProps } from "./model";

const TransactionTable: FC<TransactionTableProps> = ({
	children,
	cssClass,
	title,
	allHistory,
}) => {
	return (
		<div
			data-testid={"rg-transaction-table"}
			className={"transaction-table mt-10"}
		>
			<div className="items-center text-left justify-center sm:justify-between hiden md:flex-wrap md:flex mb-2">
				<h2
					className={
						"text-sm-headline lg:text-md-headline font-medium xl:font-bold text-neutral-400 xl:pb-4"
					}
				>
					{title}
				</h2>
				{allHistory && (
					<Link href="/deposits/history">
						<a>
							<h4
								className={
									"text-sm-regular font-medium text-neutral-400 xl:pb-4"
								}
							>
								{allHistory}
							</h4>
						</a>
					</Link>
				)}
			</div>
			<div className={`${cssClass} flex flex-col card_shadow`}>{children}</div>
		</div>
	);
};

export default TransactionTable;
