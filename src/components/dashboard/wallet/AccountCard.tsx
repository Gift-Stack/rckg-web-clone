import React, { FC } from "react";
import Card from "./../../../components/card";
import { AccountCardProps } from "./model";

const AccountCard: FC<AccountCardProps> = ({
	title,
	btc,
	button1,
	button2,
	button3,
}) => {
	return (
		<div className={"mb-2 w-full balance__details"}>
			<Card cssClass="p-5 rounded bg-white h-full">
				<div data-testid="rg-subaccount-details" className={"md:flex w-full"}>
					<div className={"md:w-1/2 w-full"}>
						<div className={"flex items-center"}>
							<small className={"text-gray-400 text-labels"}>{title}</small>
						</div>
						<h1
							className={
								"xl:text-l-heading md:text-headline text-md-headline font-bold mt-2.5 text-black"
							}
						>
							{btc}
							<span
								className={
									"text-labels sm:text-sm-headline font-medium text-black"
								}
							>
								{" "}
								BTC
							</span>
						</h1>
					</div>
					<div className={"md:w-1/2 w-full hidden md:flex items-end"}>
						<div className={"w-full space-x-1.5 xl:flex grid justify-end"}>
							{button1}
							{button2}
							{button3}
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default AccountCard;
