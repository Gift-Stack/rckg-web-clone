import {
	formatToCurrency,
	getDate,
	currencyFormatter,
} from "../../../constants";
import React, { FC } from "react";
import { TransactionHistoryUIProps } from "./model";
import { In, Out } from "../../../assets";
import { AccountType, TransactionType } from "./enum";

const TransactionHistoryUI: FC<TransactionHistoryUIProps> = ({
	narration,
	transactionType,
	accountType,
	date,
	amount,
	currency,
	user,
	underline,
}) => {
	return (
		<div
			data-testid="rg-transactionHistoryUI"
			className={`${"py-3"} ${underline ? "border-b  border-neutral-100" : ""}`}
		>
			<div className={"flex justify-between"}>
				<div className={"items-center flex"}>
					{transactionType === TransactionType.DEBIT ? <Out /> : <In />}
					<div className={"pl-2 sm:pl-3"}>
						<div className={"grid sm:flex sm:flex-wrap"}>
							<div
								className={
									"text-neutral-400 text-labels sm:text-small font-medium sm:pr-1"
								}
							>
								{narration}
							</div>
							{user && (
								<div
									className={
										"text-labels sm:text-small text-neutral-300 break-all"
									}
								>
									{" "}
									{user?.firstName && user?.lastName
										? `${user?.firstName} ${user?.firstName}`
										: user?.walletId
										? user?.walletId
										: ""}
								</div>
							)}
						</div>
						<small className={"text-neutral-200 text-x-small"}>
							{getDate(date)}
						</small>
					</div>
				</div>
				<div
					className={`${"text-x-small sm:text-labels font-medium"} ${
						transactionType === TransactionType.DEBIT
							? "text-error-main"
							: "text-credit"
					}`}
				>
					{accountType === AccountType.BTC_WALLET
						? `${amount}${currency}`
						: `${currencyFormatter(currency)}${formatToCurrency(amount, 2)}`}
				</div>
			</div>
		</div>
	);
};

export default TransactionHistoryUI;
