import Card from "../../card";
import { Tags } from "../../card/model";
import React, { FC, useState, useEffect } from "react";
import { TransactionProps } from "./model";
import TransactionHistoryUI from "./TransactionHistoryUI";
import { NoTransaction } from "../../../assets";
import Router from "next/router";

const TransactionHistory: FC<TransactionProps> = ({
	depositTransactions,
	withdrawalTransactions,
	cardTags,
}) => {
	const [tags, setTags] = useState<Tags[]>([]);
	const [showDeposit, setshowDeposit] = useState(true);

	useEffect(() => {
		setTags(cardTags);
	}, [cardTags]);
	const handleFeedback = (value: string) => {
		return Router.push("/transactions");
	};
	const filterTags = (value: string) => {
		const tags_ = tags.map((tag) => {
			return {
				name: tag.name,
				isActive: tag.name === value ? true : false,
			};
		});
		if (value === "Crypto Deposits") {
			setshowDeposit(true);
		} else {
			setshowDeposit(false);
		}
		setTags(tags_);
	};
	return (
		<div data-testid="rg-transactions" className={"m-2 lg:w-1/2"}>
			<Card
				action={"View all"}
				tags={tags}
				title={"Transaction History"}
				cssClass={"p-5 rounded bg-white h-full"}
				handleTap={(value) => handleFeedback(value)}
				handleTag={(value) => filterTags(value)}
			>
				<>
					{showDeposit ? (
						depositTransactions && depositTransactions.length >= 1 ? (
							depositTransactions.map((transaction, index) => (
								<TransactionHistoryUI
									key={transaction?.id}
									narration={transaction?.narration}
									transactionType={transaction?.transactionType}
									accountType={transaction?.accountType}
									date={transaction?.date}
									amount={transaction?.amount}
									currency={transaction?.currency}
									user={transaction?.user}
									underline={index !== depositTransactions.length - 1}
								/>
							))
						) : (
							<div
								className={
									"w-full h-full flex flex-col items-center justify-center"
								}
							>
								<NoTransaction />
								<div className={"text-neutral-200 text-sm-headline py-2"}>
									No transaction records yet
								</div>
							</div>
						)
					) : withdrawalTransactions && withdrawalTransactions.length >= 1 ? (
						withdrawalTransactions.map((transaction, index) => (
							<TransactionHistoryUI
								key={transaction?.id}
								narration={transaction?.narration}
								transactionType={transaction?.transactionType}
								accountType={transaction?.accountType}
								date={transaction?.date}
								amount={transaction?.amount}
								currency={transaction?.currency}
								user={transaction?.user}
								underline={index !== withdrawalTransactions.length - 1}
							/>
						))
					) : (
						<div
							className={
								"w-full h-full flex flex-col items-center justify-center"
							}
						>
							<NoTransaction />
							<div className={"text-neutral-200 text-sm-headline py-2"}>
								No transaction records yet
							</div>
						</div>
					)}
				</>
			</Card>
		</div>
	);
};

export default TransactionHistory;
